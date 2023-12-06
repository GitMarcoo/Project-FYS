document.addEventListener('DOMContentLoaded')



document.getElementById("verzend")

// eerste Bevestiging sluiten //
function closePopup2(){
    document.getElementById("popup2").style.zIndex = -1;
}

// tweede Bevestiging sluiten //
function closePopup(){
    document.getElementById("popupJa").style.zIndex = -1;
    document.getElementById("popupNee").style.zIndex = -1;
}

function verzendBevestiging() {

    /***
     * Maakt 4 variabele en koppelt die aan de bijbehorende inputbalk
     */

    let onderwerp = document.getElementById("subject").value
    let bericht = document.getElementById("msg").value

    /**
     * Kijkt of er iets in de input is getypt. Indien er iets is getypt veranderd de border van de input in groen
     */

    if (onderwerp.length > 0) {
        document.getElementById("subject").style.borderColor = "green";
    }
    if (bericht.length > 0) {
        document.getElementById("msg").style.borderColor = "green";
    }

    /**
     * Kijkt of er geen input is getyot. Indien er niks in getypt veranderd de border van de input naar een rode border
     */

    if (onderwerp.length === 0) {
        document.getElementById("subject").style.border = "red 2px solid";
    }
    if (bericht.length === 0) {
        document.getElementById("msg").style.border = "red 2px solid";
    }

    /**
     * Kijkt of alles is ingevuld.
     */
    if ( onderwerp.length, bericht.length === 0) {
        // Geeft een melding //
        alert("Alle velden moeten ingevuld worden")
    } else {
        // Laat de bevestiging zien //
        document.getElementById("popup2").style.zIndex = 3;
    }

}


function verzendBericht() {

    /***
     * Maakt 4 variabele en koppelt die aan de bijbehorende inputbalk
     */

    let naam = '1'
    let email = FYSCloud.Session.get("Gebruiker")
    let onderwerp = document.getElementById("subject").value
    let bericht = document.getElementById("msg").value
    let openId = FYSCloud.Session.get("OpenId")

    if (openId !== undefined){
        onderwerp += '  PostId: ' + openId
    }
    console.log(naam, email, onderwerp, bericht)

    // Moet nog error geven als length 0 is //

    /**
     * Query dat de input van de 4 balken naar de database verstuurd
     */
    FYSCloud.API.queryDatabase(
        "INSERT INTO `melding`(`email`, `onderwerp`, `bericht`, `verzendTijd`) VALUES (?,?,?,NOW())",
        [email, onderwerp, bericht])

    document.getElementById("subject").value = "";
    document.getElementById("msg").value = "";

    // Bevestiging wordt gegeven //
    document.getElementById("popupJa").style.zIndex = 3;
    closePopup2()
    setTimeout(closePopup, 2000)
}

// Bevesting voor het niet verzenden van het bericht //
function verzendBerichtNiet(){
    document.getElementById("popupNee").style.zIndex = 3;
    closePopup2()
    setTimeout(closePopup, 2000)

}




