/**
 * Deze functie voegt een event listener toe aan het DOMContentLoaded-event, wat betekent dat de functie start zal worden uitgevoerd zodra het HTML-document volledig is geladen.
 * Er wordt ook een event listener toegevoegd aan het venster die de functie WindowCloseHandler uitvoert wanneer het venster wordt gesloten.
 */

document.addEventListener('DOMContentLoaded', start)
var session = FYSCloud.Session.get('Gebruiker');


/**
 * Binnen de functie start wordt er een event listener toegevoegd aan de knop met de ID 'loguit',
 * die de sessie van de gebruiker wist en de gebruiker doorgestuurd naar de startpagina ('index.html') wanneer de knop wordt geklikt.
 * Daarna wordt de functie nameChange uitgevoerd.
 */
function start() {

    window.onclose = WindowCloseHandler;
    function WindowCloseHandler() {
        location.href = session.clear();
    }

    document.getElementById('loguit').addEventListener('click', function () {
        FYSCloud.Session.clear(session);
        window.location.assign('../../../index.html')
    })
    nameChange()
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
 * De functie nameChange voert een query uit op de database om de gebruikersgegevens op te halen van de gebruiker met het opgegeven e-mailadres (dat is opgeslagen in de sessie).
 * Als de query succesvol is uitgevoerd, wordt de functie then uitgevoerd met de parameter data, wat een array is met de gebruikersgegevens uit de tabel.
 * De gebruikersgegevens worden vervolgens weergegeven op de pagina door middel van het innerText-attribuut van de elementen met de respectievelijke IDs.
 */
function nameChange() {

    FYSCloud.API.queryDatabase(
        "SELECT * FROM `gebruiker` INNER JOIN `interesselijst` ON gebruiker.email = interesselijst.email WHERE gebruiker.email = ? ;", [session])
        .then(data => {
            document.getElementById('voornaam').innerText = data[0].voornaam
            document.getElementById('achternaam').innerText = data[0].achternaam
            document.getElementById('leeftijd').innerText = data[0].leeftijd
            document.getElementById('overzichtName').innerText = data[0].voornaam + " " + data[0].achternaam

            document.getElementById('interesse_1').innerText = data[0].interesse1
            document.getElementById('interesse_2').innerText = data[0].interesse2
            document.getElementById('interesse_3').innerText = data[0].interesse3

            /**
             * Als er een fout optreedt tijdens het uitvoeren van de query, wordt de functie catch uitgevoerd met de parameter reason, wat de foutmelding bevat.
             * De foutmelding wordt vervolgens naar de console gelogd.
             */
        }).catch(function (reason) {
        console.log(reason)
    })
}

