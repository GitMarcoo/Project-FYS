document.addEventListener('DOMContentLoaded',start)
let session;


/**
 * Voegt een event listener toe aan het DOM-element met de id 'register'.
 * Wanneer het element wordt aangeklikt, wordt de functie getInfo aangeroepen.
 */
function start(){
    session = FYSCloud.Session.clear();
    document.getElementById('register').addEventListener('click',getInfo)
    // document.getElementById('menu').addEventListener('click',showMenu)

}

function showMenu(){
    document.getElementById('navLinks').classList.toggle('displaynone')
    navLinks.style.right = "0px";
}
function closeMenu(){
    document.getElementById('navLinks').classList.toggle('displaynone')
    navLinks.style.right = "-200px";
}

let email
let voornaam
let achternaam
let wachtwoord
let wachtwoordherhaal


/**
 * Haalt de waarden op van verschillende formulierinvoer-elementen en slaat deze op in variabelen.
 * Roep de functie validateEmailWachtwoord aan en maak een nieuw Inlog-object aan met de opgehaalde waarden. Roep de functie insertIntoDatabase aan.
 */
function getInfo(){
    email = document.getElementById('email').valueOf().value
    voornaam = document.getElementById('naam').valueOf().value
    achternaam = document.getElementById('achternaam').valueOf().value
    wachtwoord = document.getElementById('wachtwoord').valueOf().value
    wachtwoordherhaal = document.getElementById('herhaal-wachtwoord').valueOf().value
    validateEmailWachtwoord()
    let inlog = new Inlog(email,voornaam,achternaam,wachtwoord)
    insertIntoDatabse()

}

/**

 Maakt een nieuw Inlog-object aan met de opgegeven waarden.
 @param {string} email - Het emailadres van de gebruiker.
 @param {string} voornaam - De voornaam van de gebruiker.
 @param {string} achternaam - De achternaam van de gebruiker.
 @param {string} wachtwoord - Het wachtwoord van de gebruiker.
 */
function Inlog(){
    this.email = email
    this.voornaam = voornaam
    this.achternaam = achternaam
    this.wachtwoord = wachtwoord
}

function validateEmailWachtwoord() {
    if (wachtwoord !== " " && wachtwoordherhaal !== wachtwoord ) {
        alert('Wachtwoord klopt niet!')
    }
    let mailFormat = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    if (email.match(mailFormat)) {
    } else {
        alert("You have entered an invalid email address!");
        document.forms.text.focus();
    }
}

/**

 Voert een SQL-query uit om een nieuwe gebruiker toe te voegen aan de database.
 Als de query succesvol uitgevoerd wordt, wordt de functie insertIntoInteresselijst aangeroepen.
 Bij een fout wordt een melding getoond en de fout weergegeven in de console.
 */
function insertIntoDatabse(){
    FYSCloud.API.queryDatabase(
        " INSERT INTO gebruiker (email,voornaam,achternaam,wachtwoord,createdTime) VALUES (?,?,?,?,NOW());",
        ([email,voornaam,achternaam,wachtwoord])
    ).then(data => {
        insertIntoInteresselijst()
    }).catch(function (reason) {
        alert('al in gebruik')
        console.error(reason)
    })
}

/**

 Voert een SQL-query uit om de email in het tabel van interesselijst toe te voegen .
 Wanneer dit succesvol gaat wordt er een nieuwe session aangemaakt met als de value het ingevoorde email.
 Dan wordt er doorvervezen naar een de profielpaginawijzigen pagina.
 */
function insertIntoInteresselijst(){
    FYSCloud.API.queryDatabase(
        " INSERT INTO interesselijst (email) VALUES (?);",
        ([email])
    ).then(data =>{
        session = FYSCloud.Session.set('Gebruiker', email)
        window.location.assign('Ingelogd/Profiel/Wijzigen/profielpaginaWijzigen.html')
    })

}





