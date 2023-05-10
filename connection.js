// Importera nödvändiga moduler
const mysql = require('mysql');
const dotenv = require('dotenv');

dotenv.config();

// Skapa en anslutning till databasen med anslutningsinformationen
const db = mysql.createConnection({
  host: 'localhost',
  user: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

// Anslut till databasen och visa felmeddelande om anslutningen lyckades eller misslyckades
db.connect(function(err){
  if(err) {
      console.log(err);
  } else {
      console.log('connected to mySQL');
  }
});

// Exportera anslutningsobjektet
module.exports = db;