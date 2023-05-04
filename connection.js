// Importera nödvändiga moduler
const mysql = require('mysql');

// Skapa en anslutning till databasen med anslutningsinformationen
const db = mysql.createConnection({
  host: 'localhost',
  user: 'Admin',
  password: '1234567',
  database: 'node_projekt',
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