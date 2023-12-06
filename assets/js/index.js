document.addEventListener('DOMContentLoaded', start)


let random;

function start() {

    /***
     *
     * @returns {number} - geeft een random getal terug
     */
    function randomgetal() {
        do {
            var getal = Math.floor(Math.random() * 10);
            console.log(getal);
        } while (random === getal)
        return getal;
    }

    FYSCloud.API.queryDatabase(
        /***
         * query die alle attributen van posts pakt en de bijbehorende attributen van activiteit
         */
        "SELECT * FROM `post` INNER JOIN activiteit ON post.activiteit = activiteit.naam WHERE 1")
        // "SELECT * FROM `post` WHERE 1 ")
        // "SELECT `fotoURL` FROM `activiteit` WHERE 1 ")
        .then(function (data) {

            /***
             * Maakt een random getal aan en haalt een random post vanuit de database.
             * De afbeelding en de tekst van de eerste slide wordt vervangen door de attributen van de random post uit de database
             * @type {number}
             */
            random = randomgetal()
            document.getElementById("overlayBoven1").innerHTML = "" + data[random].activiteit + "";
            document.getElementById("eersteFoto").style.background = "url('" + data[random].fotoURL + "')";
            document.getElementById("eersteFoto").style.backgroundSize = "cover";
            document.getElementById("overlayBeneden1").innerHTML = "" + data[random].beschrijving + "";

            /***
             * Maakt een random getal aan en haalt een random post vanuit de database.
             * De afbeelding en de tekst van de tweede slide wordt vervangen door de attributen van de random post uit de database
             * @type {number}
             */
            random = randomgetal()
            document.getElementById("overlayBoven2").innerHTML = "" + data[random].activiteit + "";
            document.getElementById("tweedeFoto").style.background = "url('" + data[random].fotoURL + "')";
            document.getElementById("tweedeFoto").style.backgroundSize = "cover";
            document.getElementById("overlayBeneden2").innerHTML = "" + data[random].beschrijving + "";

            /***
             * Maakt een random getal aan en haalt een random post vanuit de database.
             * De afbeelding en de tekst van de derde slide wordt vervangen door de attributen van de random post uit de database
             * @type {number}
             */
            random = randomgetal()
            document.getElementById("overlayBoven3").innerHTML = "" + data[random].activiteit + "";
            document.getElementById("derdeFoto").style.background = "url('" + data[random].fotoURL + "')";
            document.getElementById("derdeFoto").style.backgroundSize = "cover";
            document.getElementById("overlayBeneden3").innerHTML = "" + data[random].beschrijving + "";
            console.log(data)


        }).catch(function(reason) {
        console.log(reason);
    });

    showSlides();

}

/**
 * Werking diavoorstelling
 */
var slideIndex = 0;
showSlides();

function showSlides() {
    var i;
    var slides = document.getElementsByClassName("carouselfoto");
    for (i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";
    }
    slideIndex++;
    if (slideIndex > slides.length) {slideIndex = 1}
    slides[slideIndex-1].style.display = "block";
    setTimeout(showSlides, 2000); // Change image every 2 seconds
}

document.getElementById("navLinks");

function showMenu(){
    navLinks.style.right = "0px";
}
function closeMenu(){
    navLinks.style.right = "-200px";
}


