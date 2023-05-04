// Importera moduler för filuppladdning
const multer = require('multer');
const path = require('path');

// Skapa disk storage för uppladdade filer
const storage = multer.diskStorage({
    // Sätt destinationen för uppladdade filer till public/uploads
   destination: function(req, file, cb){
       cb(null, 'public/uploads');
   },
   // Namnge uppladdade filer med dagens datum och filtyp
   filename: function(req, file, cb){
       console.log(file);
       cb(null, Date.now() + path.extname(file.originalname));
   }
});

// Skapa multer instans med konfiguration för uppladdade filer
const upload = multer({
   storage: storage,
   limit: {filesize: 1000000}, // Max storlek för uppladdade filer
   fileFilter: function(req, file, cb){
       checkFileType(file, cb)
   }
});

// Funktion för att filtrera filer och kolla filtyp
function checkFileType(file, cb){
   // Tillåtna filtyper
   const filetypes = /jpeg|jpg|png|gif/;
   // Hämta filtyp
   const extname =filetypes.test(path.extname(file.originalname).toLocaleLowerCase());
   // Hämta mimetype
   const mimetype = filetypes.test(file.mimetype);

   // Om både filtyp och mimetype matchar tillåtna filtyper, returnera true
   if(mimetype && extname) {
       return cb(null, true);
   } else {
       // Annars skicka felmeddelande
       cb('Error: Images Only!');
   }
}

// Exportera multer för att kunna användas i andra filer
module.exports = upload;
