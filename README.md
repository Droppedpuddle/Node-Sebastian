# WLOG - Bloggsida för webbutvecklare
En hemsida för webbutvecklares frågor och synpunkter

## Instruktioner för att köra projektet
- Importera databaskonfigurationsfilen (node_projekt.sql) till din server från (db_config) mappen i rotkatalogen
- Skapa en (.env) fil i din rotkatalog
- (.env)-filen skall innehålla följande variabler:
    - DB_HOSTNAME   (Värdnamnet)
    - DB_NAME   (Databasnamnet) 
    - DB_USERNAME   (Användarnamn)
    - DB_PASSWORD   (Användarens lösenord)
- Ladda ner Live Sass Compiler som extension på Visual Studio Code om du vill redigera SCSS-koden

## Logg

### 23 februari
- Vad jag har gjort: Skissat designen på hemsidan och skrivit lite kortfattat om innehållet och dess funktioner
- Vad jag ska göra nästa gång: Börja med grunden till hemsidan i Node
- Vad jag generellt behöver göra: Se till att den är kopplad till databas och fungerar

### 2 mar

Gick på öppet hus i Chalmers under lektionstid

### 9 mars
- Vad jag har gjort: Lagt till "Inlägg" och "Skapa inlägg" som länkar i en navbar och skrivit en header för kategorier
- Vad jag ska göra nästa gång: Göra att forum kan hämta posts och visa rubrik, text och bild
- Vad jag generellt behöver göra: Lägga ner mycket arbete på de funktioner och saker som ska finnas på hemsidan

### 16 mars
- Vad jag har gjort: Ordnat flera kategorier, dvs. HTML, CSS, Node.js, Jekyll. Har även fixat form i forumet där man kan ställa en fråga och välja lämplig kategori
- Vad jag ska göra nästa gång: Gör att sidan kan hämta posts ur databas och displaya dem på "senaste inlägg".
- Vad jag generellt behöver göra: Lägga ner mycket arbete på de funktioner och saker som ska finnas på hemsidan

### 23 mars
- Vad jag har gjort: Skapat en for-loop i 'posts.ejs' som hämtar inläggen från sparade i databasen. Detta görs genom GET-ruttfunktionen i server.js där den gör SELECT på allt från tabellen 'node_info'
- Vad jag ska göra nästa gång: Lägga till saker på startsidan, exempelvis sökfunktion, populära inlägg, om hemsidan...
- Vad jag generellt behöver göra: Lägga ner mycket arbete på de funktioner och saker som ska finnas på hemsidan

### 30 mars
- Vad jag har gjort: Skapat en "Om sida", och ordnat 'multer' så att bilder som publiceras visas korrekt i posts.ejs
- Vad jag ska göra nästa gång: Lägga in saker på startsidan
- Vad jag generellt behöver göra: Lägga ner lite mer arbete på de funktioner som ska finnas på hemsidan men också fokusera på stylen av den

### 4 maj (Har under en månad missat att dokumentera vad jag arbetat med på lektionerna)
- Vad jag har gjort: 
    - Skapat en inloggnings- och registreringsfunktion som tillåter dig att publicera inlägg efter registrering.
    - Skyddat router som innan gick att få tillgång till utan att vara inloggad
    - Registrering som kräver användaren att följa valideringschemat för lösenord- och användarnamnsformat med hjälp av modulen Joi
    - Färdig med alla sidorna som ska finnas på hemsidan 
    - Fixat en SASS-fil fylld med styling som kompileras till CSS av Live Sass Compiler (extension i visual studio code)
    - Ordnat media query för att anpassa responsivitet beroende på hur skärmen anpassas från enhet till enhet
    - Diverse funktioner som saknades i Forum, Inlägg och Skapa inlägg. Exempelvis sökfunktion för inläggen, kategorifiltrering för forum-inläggen och länk till inloggningssidan på startsidan
- Vad jag ska göra nästa gång: Komma på något att lägga till på startsidan.
- Vad jag generellt behöver göra: Finslipa stylingen av webbsidan

### 18 maj (Sista ändringen)
- Vad jag har gjort: Gjort att de tre senaste blogginläggen syns på startsidan tillsammans med länkar som dirigerar användaren till registrering eller publicering av inlägg beroende på om användaren är inloggad eller ej. Har även stylat färdigt hemsidan med nya färger och finputsningar i utseendet på hemsidan.

