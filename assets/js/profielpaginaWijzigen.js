/**
 * Deze functie voegt een event listener toe aan het DOMContentLoaded-event, wat betekent dat de functie start zal worden uitgevoerd zodra het HTML-document volledig is geladen.
 * Er wordt ook een event listener toegevoegd aan het venster die de functie WindowCloseHandler uitvoert wanneer het venster wordt gesloten.
 * Binnen de functie WindowCloseHandler wordt de sessie van de gebruiker gewist en wordt de gebruiker doorgestuurd naar de startpagina ('index.html').
 */

document.addEventListener('DOMContentLoaded', start)
var session = FYSCloud.Session.get('Gebruiker');
let Interesse1Active, Interesse2Active, Interesse3Active, activeInputId, zoekVensterZichtbaar



/**
 * 'loguit', die de sessie van de gebruiker wist en de gebruiker doorgestuurd naar de startpagina ('index.html') wanneer de knop wordt geklikt.
 * Daarna worden de functies getDatabse en getDatabseInteresselijst uitgevoerd om de gegevens van de gebruiker op te halen uit de database.
 * Er wordt ook een event listener toegevoegd aan de knop met de ID 'opslaanProfiel', die de functie opslaan uitvoert wanneer de knop wordt geklikt.
 */
function start() {

    window.onclose = WindowCloseHandler;

    function WindowCloseHandler() {
        location.href = session.clear();
    }

    document.getElementById('loguit').addEventListener('click', function () {
        FYSCloud.Session.clear(session);
        window.location.assign('../../../../index.html')
    })

    getDatabse();
    getDatabseInteresselijst();
    document.getElementById('opslaanProfiel').addEventListener("click", opslaan);

    document.getElementById("interesse1").addEventListener("input", function () {
        showSearchItems("interesse1")
    })

    document.getElementById("interesse2").addEventListener("input", function () {
        showSearchItems("interesse2")
    })

    document.getElementById("interesse3").addEventListener("input", function () {
        showSearchItems("interesse3")
    })

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

let name
let lastName
let age

let interesse1
let interesse2
let interesse3

/**
 * De functie opslaan verkrijgt de waardes van de invoervelden voor de naam, achternaam, leeftijd en interesses van de gebruiker en slaat deze op in de respectievelijke variabelen.
 * Daarna worden nieuwe objecten van de klassen Inlog en Interesse aangemaakt met de opgehaalde gegevens als parameters.
 * Ten slotte wordt de functie updateDatabase uitgevoerd met de objecten inlog en interesse en de sessie van de gebruiker als parameters.
 * @param session
 */
function opslaan(session) {
    name = document.getElementById('user-name').valueOf().value
    lastName = document.getElementById('user-achternaam').valueOf().value
    age = document.getElementById('user-age').valueOf().value


    interesse1 = document.getElementById('interesse1').valueOf().value
    interesse2 = document.getElementById('interesse2').valueOf().value
    interesse3 = document.getElementById('interesse3').valueOf().value

    let inlog = new Inlog(age, name, lastName)
    let interesse = new Interesse(interesse1, interesse2, interesse3)
    updateDatabase(inlog, interesse, session)


}

/**
 * De functie convertInlogJSON converteert een object van de klasse Inlog in een JSON-object. De functie convertInteresseJSON converteert een object van de klasse Interesse in een JSON-object.
 * @param inlogJSON
 * @returns {Inlog}
 */
function convertInlogJSON(inlogJSON) {
    return new Inlog(inlogJSON.leeftijd, inlogJSON.voornaam, inlogJSON.achternaam)
}

function convertInteresseJSON(interesseJSON) {
    return new Interesse(interesseJSON.interesse1, interesseJSON.interesse2, interesseJSON.interesse3)

}

/**
 * De functie setvaluesInlog verkrijgt de waardes van het opgegeven Inlog-object en zet deze in de invoervelden op de pagina.
 * De functie setvaluesInteresse verkrijgt de waardes van het opgegeven Interesse-object en zet deze in de invoervelden op de pagina.
 * @param inlog
 */
function setvaluesInlog(inlog) {
    let inlogValues = convertInlogJSON(inlog[0])
    document.getElementById('user-name').valueOf().value = inlogValues.voornaam
    document.getElementById('user-achternaam').valueOf().value = inlogValues.achternaam
    document.getElementById('user-age').valueOf().value = inlogValues.leeftijd
    document.getElementById('user-adress').valueOf().value

    document.querySelector('#name').innerText = inlogValues.voornaam + ' ' + inlogValues.achternaam

}

/**
 * Voegt de waardes van het opgegeven Interesse-object toe aan de invoervelden op de pagina.
 * Doormiddel van het ID in het HTML
 * @param {Interesse} interesse - Het Interesse-object waarvan de waardes moeten worden opgehaald.
 * */

function setvaluesInteresse(interesse) {

    let interesseValues = convertInteresseJSON(interesse[0])
    document.getElementById('interesse1').valueOf().value = interesseValues.interesse1
    document.getElementById('interesse2').valueOf().value = interesseValues.interesse2
    document.getElementById('interesse3').valueOf().value = interesseValues.interesse3


}

/**
 * Haalt de gegevens van de gebruiker op uit de database en voegt deze toe aan de invoervelden op de pagina.
 * Daarna activeert deze de functie setvaluesInlog
 */

function getDatabse() {
    FYSCloud.API.queryDatabase("SELECT * FROM gebruiker WHERE email = ? ;", [session])
        .then(data => {
            document.getElementById('overzichtName').innerText = data[0].voornaam + " " + data[0].achternaam
            setvaluesInlog(data)
            console.log(data)
        }).catch(function (reason) {
        console.log(reason)
    })
}

/**
 * Haalt de interesses van de gebruiker op uit de database en voegt deze toe aan de invoervelden op de pagina.
 * Daarna activeert deze de functie setvaluesInteresse
 */
function getDatabseInteresselijst() {
    FYSCloud.API.queryDatabase("SELECT * FROM interesselijst WHERE email = ? ;", [session])
        .then(data => {
            setvaluesInteresse(data)
        }).catch(function (reason) {
        console.log(reason)
    })

}


/**

 Slaat de gewijzigde gegevens van de gebruiker op in de database.
 @param {Inlog} inlog - Het Inlog-object met de gewijzigde gegevens van de gebruiker.
 @param {Interesse} interesse - Het Interesse-object met de gewijzigde interesses van de gebruiker.
 */
function updateDatabase(inlog, interesse) {
// Voert een SQL-query uit om de gewijzigde gegevens van de gebruiker op te slaan in de tabel 'gebruiker'
    FYSCloud.API.queryDatabase("UPDATE gebruiker SET voornaam= ? , leeftijd = ?, achternaam = ? WHERE email = ? ;",
        [inlog.voornaam, inlog.leeftijd, inlog.achternaam, session])
        .then(function (reloadPage) {
// Verwijst naar de profielpagina nadat de gegevens zijn opgeslagen
            window.location.assign('../profielpagina.html')
        }).catch(function (reason) {
        console.error(reason)
    })
// Voert een SQL-query uit om de gewijzigde interesses van de gebruiker op te slaan in de tabel 'interesselijst'
    FYSCloud.API.queryDatabase("UPDATE interesselijst SET interesse1= ?, interesse2=?, interesse3=? WHERE email = ? ;",
        [interesse.interesse1, interesse.interesse2, interesse.interesse3, session])
        .then(function (reloadPage) {
            window.location.assign('../profielpagina.html')
        }).catch(function (reason) {
        console.error(reason)
    })
}

/**
 Maakt een nieuw Inlog-object aan.
 @param {number} leeftijd - De leeftijd van de gebruiker.
 @param {string} naam - De voornaam van de gebruiker.
 @param {string} achternaam - De achternaam van de gebruiker.
 */
function Inlog(leeftijd, naam, achternaam) {
    this.leeftijd = leeftijd
    this.voornaam = naam
    this.achternaam = achternaam
}

/**
 Maakt een nieuw Interesse-object aan.
 @param {string} interesse1 - De eerste interesse van de gebruiker.
 @param {string} interesse2 - De tweede interesse van de gebruiker.
 @param {string} interesse3 - De derde interesse van de gebruiker.
 */
function Interesse(interesse1, interesse2, interesse3) {
    this.interesse1 = interesse1
    this.interesse2 = interesse2
    this.interesse3 = interesse3
}

/**
 toggleElement verbergt of toont het element met het opgegeven id.
 @param {string} id - Het id van het element dat getoond of verborgen moet worden.
 */
function toggleElement(id) {
    const element = document.getElementById(id)
    element.classList.toggle("hidden")
}

/**
 showSearchItems toont of verbergt het zoekvenster afhankelijk van de huidige waarde van het opgegeven inputveld.
 Daarnaast wordt de juiste class aan het zoekvenster toegekend, zodat het venster op de juiste positie getoond wordt.
 Ook wordt de functie getInteresseFromDB aangeroepen met de waarde van het opgegeven inputveld als parameter.
 @param {string} inputId - Het id van het inputveld waarvan de waarde bepaalt of het zoekvenster getoond of verborgen wordt.
 */
function showSearchItems(inputId) {
    if (inputId === "interesse1" && !Interesse1Active) {
        Interesse1Active = true
        Interesse2Active = false
        Interesse3Active = false

        document.getElementById('zoekVenster').className = "hidden"
        document.getElementById('zoekVenster').classList.add("zoekVensterInteresse1")
    } else if (inputId === 'interesse2' && !Interesse2Active) {
        Interesse1Active = false
        Interesse2Active = true
        Interesse3Active = false
        document.getElementById('zoekVenster').className = "hidden"
        document.getElementById('zoekVenster').classList.add("zoekVensterInteresse2")
    } else if (inputId === 'interesse3' && !Interesse3Active) {
        Interesse1Active = false
        Interesse2Active = false
        Interesse3Active = true
        document.getElementById('zoekVenster').className = "hidden"
        document.getElementById('zoekVenster').classList.add("zoekVensterInteresse3")
    }
    activeInputId = inputId
    const element = document.getElementById(inputId)
    let zoekValue = element.valueOf().value
    if (zoekValue !== "") {
        getInteresseFromDB(zoekValue)
    }

    if (!zoekVensterZichtbaar && zoekValue.length > 0) {
        //show
        toggleElement('zoekVenster')
        zoekVensterZichtbaar = true
        document.getElementById('searchResult1').addEventListener('click', function () {
            selectResult(1)
        })
        document.getElementById('searchResult2').addEventListener('click', function () {
            selectResult(2)
        })
        document.getElementById('searchResult3').addEventListener('click', function () {
            selectResult(3)
        })
        document.getElementById('searchResult4').addEventListener('click', function () {
            selectResult(4)
        })
    } else if (zoekVensterZichtbaar && zoekValue.length === 0) {
        toggleElement('zoekVenster')
        zoekVensterZichtbaar = false
        document.getElementById('searchResult1').removeEventListener('click', function () {
            selectResult(1)
        })
        document.getElementById('searchResult2').removeEventListener('click', function () {
            selectResult(2)
        })
        document.getElementById('searchResult3').removeEventListener('click', function () {
            selectResult(3)
        })
        document.getElementById('searchResult4').removeEventListener('click', function () {
            selectResult(4)
        })
    }
}

/**
 Deze functie zorgt ervoor dat wanneer een gebruiker op een van de zoekresultaten klikt, het geselecteerde zoekresultaat in het juiste invoerveld wordt geplaatst.
 Tevens wordt het zoekvenster verborgen.
 @param {number} idNumber - Het ID-nummer van het geselecteerde zoekresultaat.
 */
function selectResult(idNumber) {
    let selectedid = "searchResult" + idNumber
    let selectedValue = document.getElementById(selectedid).innerText
    document.getElementById(activeInputId).valueOf().value = selectedValue

    if (zoekVensterZichtbaar) {
        toggleElement('zoekVenster')
        zoekVensterZichtbaar = false
        document.getElementById('searchResult1').removeEventListener('click', function () {
            selectResult(1)
        })
        document.getElementById('searchResult2').removeEventListener('click', function () {
            selectResult(2)
        })
        document.getElementById('searchResult3').removeEventListener('click', function () {
            selectResult(3)
        })
        document.getElementById('searchResult4').removeEventListener('click', function () {
            selectResult(4)
        })
    }
}

/**
 Retrieves a list of interests from the database that match the provided search value.
 @param {string} searchValue - The value to search for in the database.
 @returns {Promise} - A promise that resolves with the search results from the database.
 */
function getInteresseFromDB(searchValue) {
    let databaseSearch = searchValue + "%"  //% achter laat waarde zoeken op het begin
    FYSCloud.API.queryDatabase(
        `
            SELECT naam
            FROM interesse
            WHERE naam LIKE ?
        `, [databaseSearch]
    )
        .then(data => {
            showSearchResults(data)
        })
        .catch(function (reason) {
            console.log(reason)
        })
}
/**
 Toont de resultaten van een zoekopdracht in de zoekresultaten-sectie van de pagina.
 @param {Object[]} results - De resultaten van de zoekopdracht.
 */
function showSearchResults(results) {
    let idsearch;
    for (let i = 0; i < 4; i++) {
        idsearch = "result" + (i + 1)
        if (((i + 1) - results.length) <= 0) {

            if (document.getElementById(idsearch).classList.contains("hidden")) {
                toggleElement(idsearch)
            }
        } else {
            if (!document.getElementById(idsearch).classList.contains("hidden")) {
                toggleElement(idsearch)
            }
        }

        let searchElementid = "searchResult" + (i + 1)
        if (results[i] === undefined) {
            document.getElementById(searchElementid).innerText = ""
        } else {
            if (results[i].naam !== undefined) {
                document.getElementById(searchElementid).innerText = results[i].naam
            }
        }
    }
}



