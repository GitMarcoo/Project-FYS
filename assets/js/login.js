
document.addEventListener('DOMContentLoaded', start)


/**
 * Deze functie voegt een event listener toe aan het DOMContentLoaded-event,
 * wat betekent dat de functie start zal worden uitgevoerd zodra het HTML-document volledig is geladen.
 * Binnen de functie start wordt de sessie van de gebruiker gewist en wordt er een event listener toegevoegd aan de knop met de ID 'login',
 * die de functie getInfo zal uitvoeren wanneer de knop wordt geklikt.
 */
function start() {
    FYSCloud.Session.clear()
    document.getElementById('login').addEventListener('click', getInfo)
    document.getElementById('menu').addEventListener('click',showMenu)



}


function showMenu(){
    document.getElementById('navLinks').classList.toggle('displaynone')
    navLinks.style.right = "0px";
}
function closeMenu(){
    document.getElementById('navLinks').classList.toggle('displaynone')
    navLinks.style.right = "-200px";
}

/**
 * De functie getInfo verkrijgt de waardes van het invoerveld voor de gebruikersnaam en het wachtwoord door middel van het value-attribuut en slaat deze op in de globale variabelen userEmail en password.
 * Daarna wordt de functie getDatabse uitgevoerd.
 */

let userEmail
let password

function getInfo() {
    userEmail = document.getElementById('user-username').valueOf().value
    password = document.getElementById('user-password').valueOf().value
    getDatabse()
}

/**
 * Er wordt een for-loop uitgevoerd over de array data, en voor elk element in de array wordt gecontroleerd of de e-mail en het wachtwoord in de database overeenkomen met de ingevoerde gegevens.
 * Als dit het geval is, wordt de gebruikersnaam opgeslagen in de sessie en wordt er gecontroleerd of de gebruiker is geblokkeerd of een administrator is. Als de gebruiker is geblokkeerd,
 * wordt er een alert weergegeven en wordt het event voorkomen.
 * Als de gebruiker een administrator is, wordt de gebruiker doorgestuurd naar de pagina voor administrators.
 * Als de gebruiker geen administrator is, wordt de gebruiker doorgestuurd naar de pagina voor ingelogde gebruikers en wordt de gebruikersnaam opgeslagen in de sessie.
 */

function getDatabse() {
    FYSCloud.API.queryDatabase(" SELECT * FROM `gebruiker` ").then(data => {

        let d
        for (d of data) {
            if (d.email === userEmail && d.wachtwoord === password) {
                FYSCloud.Session.set("Gebruiker", d.email)
                if (d.geblokkeerd === 1) {
                    alert('Uw account is geblokkeerd')
                    evt.preventDefault();
                } else {
                    if (d.isAdministrator === 1) {
                        window.location.assign('../Admin/homepageAdmin.html')
                        evt.preventDefault();
                    } else {
                        window.location.assign('Ingelogd/frontpageIngelogdGebruiker.html')
                        let session = FYSCloud.Session.set("Gebruiker", d.email)
                        evt.preventDefault();
                    }
                }
            }
        }
        /**
         * Als de ingevoerde gegevens niet overeenkomen met een gebruiker in de database,
         * wordt er een alert weergegeven met de melding "foute gegevens" en wordt het event voorkomen.
         */
        if (userEmail !== d.email || password !== d.wachtwoord) {
            alert('foute gegevens')
            evt.preventDefault();
        }
    })
}


