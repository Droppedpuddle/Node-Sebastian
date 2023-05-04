// Importera de nödvändiga paketen och modulerna
const express = require('express');
const session = require('express-session');2
const sassMiddleware = require('node-sass-middleware');
const app = express();
const db = require('./connection');
const upload = require('./uploads');
const bodyParser = require('body-parser');
const path = require('path');
const Joi = require('joi');

// Skapa en valideringsschema för användare
const schema = Joi.object({
    username: Joi.string().min(6).required(),
    password: Joi.string()
      .pattern(new RegExp('^(?=.*[0-9])'))
      .min(6)
      .required()
      .invalid(Joi.ref('username')),
});

// Funktion som kontrollera om det finns en session och om användaren är inloggad
function requireLogin(req, res, next) {
    if (req.session && req.session.loggedIn) {
      return next();
    } else {
      res.redirect('/login');
    }
}

// Starta servern och lyssna på port 3000
app.listen(process.env.PORT || 3000, function(){
    console.log('server, port 3000');
}); 

// Sätt upp EJS-mallar för renderingsmotor och sökvägar till mallar
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.locals.nav = path.join(__dirname, 'views', 'partials', 'nav.ejs')
app.locals.icon = path.join(__dirname, 'views', 'partials', 'icon.ejs')

// Använd body-parser för att analysera inkommande anmodningar och express.static för att leverera statiska filer
app.use(bodyParser.urlencoded({ extended: false }))
app.use(express.static(__dirname + '/public'));

app.use(sassMiddleware({
    src: __dirname + '/public/stylesheets/scss', // Källmapp för SCSS-filer
    dest: __dirname + '/public/stylesheets', // Destinationsmapp för kompilerade CSS-filer
    debug: true,
    outputStyle: 'compressed',
    prefix: '/stylesheets'
}));



// Använd session middleware för att spåra inloggning
app.use(session({
    secret: 'xxxtentacion',
    resave: false,
    saveUninitialized: false
}))

// Hämta huvudsidan och skicka med sessionens inloggningsstatus och användarnamn (om inloggad)
app.get('/', function(req,res){
    loggedIn = req.session.loggedIn;
    username = req.session.userID;
    res.render('index', {loggedIn, username});
});

// Hämta alla poster
app.get('/posts', function(req,res){
    loggedIn = req.session.loggedIn;
    const sqlSelectAll = "SELECT * FROM node_info ORDER BY id DESC";
    const searchQuery = req.query.search;

    // Sökfunktion i databasen
    if (searchQuery) {
        const sqlSelectSearch = `SELECT * FROM node_info WHERE rubrik LIKE '%${searchQuery}%' OR text LIKE '%${searchQuery}%' OR author LIKE '%${searchQuery}%' OR datum LIKE '%${searchQuery}%' ORDER BY id DESC`;
        db.query(sqlSelectSearch, (err, result)=> {
            if (err) {
                throw err;
            } else {
                const posts = result;
                res.render('posts', { posts: posts, loggedIn});
            }
        });
    } else {
        db.query(sqlSelectAll, (err, result)=> {
            if (err) {
                throw err;
            } else {
                const posts = result.slice(0, 10);
                res.render('posts', { posts: posts});
            }
        });
    }
});

// Skapa en ny post genom att hämta input från html-form i post.ejs
app.post('/post', requireLogin, upload.single('bild'), function(req,res){
    const rubrik = req.body.rubrik;
    const text = req.body.text;
    const bild = req.file.filename;
    const author = req.session.userID;

    //Ladda upp post-infon i tabellen node_info i databasen
    const sqlInstert = "INSERT INTO node_info (rubrik, text, bild, author) VALUES (?, ?, ?, ?);"
    db.query(sqlInstert, [rubrik, text, bild, author], (err, result)=> {
        if(err) {
            throw err;
        } else {
            res.render ('post');
        }
    });
});

// Hämta post-sidan och rendera den med en variabel för inloggningstatusen (loggedIn)
app.get('/post', requireLogin, function(req,res){
    loggedIn = req.session.loggedIn;
    res.render('post',{loggedIn})
});

// Hämta forum-sidan och hämta alla frågor från databasen
app.get('/forum', function(req,res){
    loggedIn = req.session.loggedIn;
    const sqlSelectAll = "SELECT * FROM node_forum ORDER BY id DESC";
    db.query(sqlSelectAll, (err, result)=> {
        if (err) {
            throw err;
        } else {
            const forumQuestions = result;
            res.render('forum', {forumQuestions: forumQuestions, loggedIn});;
        }
    });
});

// Lägg till en ny fråga till forumet
app.post('/forum', function(req, res) {
    const category = req.body.topic;
    const question = req.body.question;
    const sqlInsert = "INSERT INTO node_forum (category, question) VALUES (?, ?);";
    db.query(sqlInsert, [category, question], (err, result) => {
        if (err) {
            throw err;
        } else {
            res.redirect('/forum');
        }
    });
});

// Hämta about-sidan
app.get('/about', function(req,res){
    loggedIn = req.session.loggedIn;
    res.render('about',{loggedIn})
});

// Hämta login-sidan
app.get('/login', function(req, res) {
    loggedIn = req.session.loggedIn;
    res.render('login',{loggedIn});
});

// Hantera inloggningsförsök
app.post('/login', function(req, res) {
    const username = req.body.username;
    const password = req.body.password;
    const sqlSelect = "SELECT * FROM users WHERE username = ? AND password = ?";
    db.query(sqlSelect, [username, password], (err, result) => {
        if (err) {
            throw err;
        } else {
            if (result.length > 0) {
                // Spara användarinfon och ändra variabeln för inloggad till "true"
                req.session.userID = username;
                req.session.loggedIn = true;
                // Omdirigera till startsidan
                res.redirect('/');
            } else {
                // Annars, ladda om inloggningssidan
                res.redirect('/login');
            }
        }
    });
});

// Hämta registrerings-sidan och rendera den med eventuella felmeddelanden
app.get('/register', function(req, res) {
    loggedIn = req.session.loggedIn;
    error = req.session.error;
    req.session.error = null;
    res.render('register',{loggedIn, error});
});

// Hantera registreringsförsök genom att kolla om användarnamnet redan finns i databasen och om den är godkänd enligt valideringsschemat
app.post('/register', function(req,res){
    const username = req.body.username;
    const password = req.body.password;

    // Variabel för felaktigt format från användaren
    const { error } = schema.validate(req.body);
    const sqlSelect = "SELECT * FROM users WHERE username = ?";
    const sqlInsert = "INSERT INTO users (username, password) VALUES (?, ?)";
    if (error){
        // Om felaktigt format, rendera om sidan
        req.session.error = error;
        res.redirect('/register');
    }  else {
        db.query(sqlSelect, [username], function(err, result){
                if(err){
                    throw err;
                } else {
                    if(result.length > 0){
                        // Visa felmeddelande om användarnamn matchar en i databasen
                        req.session.error = "Användarnamnet finns redan, var god försök igen";
                        res.redirect('/register');
                    } else {
                        db.query(sqlInsert, [username, password], function(err, result){
                            if(err){
                                throw err;
                            } else {
                                // Om registrering lyckas, omdirigera till inloggningssidan
                                req.session.userID = username
                                res.redirect('/login');
                            }
                        });
                    }
                }
            });
    }
    
});

// Hantera GET-request till sökvägen "/logout"
app.get('/logout', function(req,res){
    // Förstöra sessionen när användaren loggar ut
    req.session.destroy((err)=>{
        if (err) {
            // Skriv ut fel om förstörelsen misslyckas
            console.log(err);
        }   else{
            // Omdirigera användaren till inloggningssidan om förstörelse lyckas
            console.log(req.session)
            res.redirect('/login')
        }
    })
})
// Hantera filuppladdning
app.use('/uploads', express.static('public/uploads'));
