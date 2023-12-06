document.addEventListener("DOMContentLoaded", start);
let openId = FYSCloud.Session.get("OpenId")
let emailIngelogd = FYSCloud.Session.get("Gebruiker")
let naamIngelogd, bericht;
let post, verstuurButtonActive

function start() {
    getPostFromDB()
    document.getElementById('versturen').addEventListener('click', berichtToDB);
    document.getElementById('Bericht').value = '';
    // document.getElementById('popup').addEventListener("click", closePopup)
    document.getElementById('terug').addEventListener("click", gaterug)
    document.getElementById('boek').addEventListener("click", boekSite)
    document.getElementById('raporteer').addEventListener("click", raporteer)
    document.getElementById('Bericht').addEventListener('input', enableVersturen)
    getIngelogdName()
}

function getIngelogdName(){
    FYSCloud.API.queryDatabase(
        `
            SELECT voornaam, achternaam
            FROM gebruiker
            WHERE email = ?;
        `, [emailIngelogd]).then(data => {
        naamIngelogd = data[0].voornaam + " " + data[0].achternaam
    }).catch(reason => {
        console.log(reason)
    })
}

function enableVersturen(){
    let berichtValue = document.getElementById('Bericht').valueOf().value
    let versturenButton =  document.getElementById('versturen')
    if (berichtValue !== "" && !verstuurButtonActive){
        versturenButton.classList.toggle('disableButton')
        verstuurButtonActive = true;
    }else if (berichtValue === "" && verstuurButtonActive){
        versturenButton.classList.toggle('disableButton')
        verstuurButtonActive = false;
    }
}

function raporteer(){
    window.location = "../Contact/contactIngelogd.html"
}

function boekSite(){
    FYSCloud.API.queryDatabase(
        `
            SELECT stad, land, continent, startdatum, einddatum
            FROM post
                INNER JOIN locatie
                    ON post.idLocatie = locatie.idLocatie
            WHERE idPost = ?;
        `, [post.postid]).then(data => {
        gaNaarCeD(data[0])
    }).catch(reason => {
        console.log(reason)
    })
}


function gaNaarCeD(data){
    let datumvan = new Date(data.startdatum)
    let datumtot = new Date(data.einddatum)

    let dagvan;
    if(datumvan.getDate().toString().length === 1){
        dagvan =  "0" + datumvan.getDate()
    }else{dagvan = datumvan.getDate()}

    let dagtot;
    if(datumtot.getDate().toString().length === 1){
        dagtot =  "0"+ datumtot.getDate()
    }else{dagtot = datumtot.getDate()}

    let maandvan;
    if(datumvan.getMonth().toString().length === 1){
        maandvan =  "0" + (datumvan.getMonth() + 1)
    }else{maandvan = datumvan.getMonth() + 1}

    let maandtot;
    if(datumtot.getMonth().toString().length === 1){
        maandtot =  "0" + (datumvan.getMonth() + 1)
    }else{maandtot = datumtot.getMonth() + 1}



    let datumString = "?departDate=%5B" + datumvan.getFullYear().toString().substring(2) + (maandvan) + dagvan + ","
        + datumtot.getFullYear().toString().substring(2) + (maandtot) + dagtot + "%5D"

    if (data.continent === null){
        let locatieString = "/" + (data.land).replaceAll(" ", '-') + "/" + data.stad


        window.open( "https://www.corendon.nl" + locatieString + datumString,'_blank')
    }else {

        let locatieString = "/" + data.land + "/" + data.continent + "/" + data.stad

        window.open( "https://www.corendon.nl" + locatieString + datumString,'_blank')
    }
}

function gaterug(){
    window.history.back();
}

function loadPosts(postDB){
    post = convertPostJSON(postDB)
    document.getElementById("titel").innerText = post.activiteit
    document.getElementById("postIMG").src = "../../../" + post.fotoURL
    document.getElementById("datum").innerText = post.datumvan.toLocaleDateString() + " tot " + post.datumtot.toLocaleDateString()
    document.getElementById("locatie").innerText  = post.stad + ', ' + post.land
    document.getElementById("beschrijving").innerText =  post.beschrijving
    document.getElementById("postEigenaar").innerText = post.gebruiker
}

// dit geeft het verzonden bericht weer (op de console) en leegt de textarea na het klikken van versturen
function getBericht() {
    const bericht = document.getElementById('Bericht');
    bericht.value = '';
  const beschrijving = document.getElementById('beschrijving').value;
    const datum = document.getElementById('datum').value;
    const versturen = document.getElementById('versturen').value;
}



// functie om het bericht naar de database te sturen
function berichtToDB () {
    bericht = document.getElementById('Bericht').valueOf().value;
    FYSCloud.API.queryDatabase(
        `INSERT INTO bericht (emailOntvanger, bijschrift, emailVerzender)
         VALUES (?, ?,?);`, [post.email, bericht, emailIngelogd]
    ).then(response => {
        console.log(response)
        getBerichtID()
    }).catch(function (reason) {
        console.error(reason);
    })
}

function getBerichtID(){
    FYSCloud.API.queryDatabase(
        `SELECT idBericht
          FROM bericht
            WHERE emailVerzender = ?
            ORDER BY idBericht DESC 
        `,[emailIngelogd]).then(data => {
        addBerichtToBerichtLijstDB(data[0].idBericht)
        }).catch(function (reason) {
            console.log(reason)
        })
}

function addBerichtToBerichtLijstDB(idBericht){
    FYSCloud.API.queryDatabase(
        `INSERT INTO berichtlijst (idPost, idBericht)
         VALUES (?, ?);`, [post.postid, idBericht]
    ).then(response => {
        console.log(response)
        document.getElementById('Bericht').valueOf().value = ""
        document.getElementById('versturen').classList.toggle('disableButton')
         stuurEmail()
    }).catch(function (reason) {
        console.error(reason);
    })
}

function stuurEmail(){
    FYSCloud.API.sendEmail({
        from: {
            name: naamIngelogd,
            address: emailIngelogd
        },
        to: [
            {
                name: post.gebruiker,
                address: post.email
            }
        ],
        subject: "Reachtie op jouw post: " + post.activiteit,
        html: "Reactie: " + bericht
    }).then(function(data) {
        console.log(data);
    }).catch(function(reason) {
        console.log(reason);
    });
}



function getPostFromDB() {
    FYSCloud.API.queryDatabase(
        `SELECT *
         FROM post
                  INNER JOIN locatie
                             ON post.idLocatie = locatie.idLocatie
                  INNER JOIN activiteit
                             ON post.activiteit = activiteit.naam
                  INNER JOIN gebruiker
                             ON post.postEigenaar = gebruiker.email
         WHERE idPost = ?;`,[openId]
    )
        .then(data => {
            loadPosts(data[0])
        }).catch(function (reason) {
        console.log(reason)
    })

}

function convertPostJSON(postJSON) {
    return new Post(postJSON.activiteit, postJSON.stad, postJSON.land, postJSON.beschrijving,
        new Date(postJSON.startdatum),
        new Date(postJSON.einddatum), postJSON.idPost, postJSON.idLocatie,
        postJSON.fotoURL, postJSON.voornaam + " " + postJSON.achternaam, postJSON.postEigenaar)
}

function Post(activiteit, stad, land, beschrijving, datumvan, datumtot, postid, locatieid, fotoURL, gebruiker, email) {
    this.activiteit = activiteit
    this.stad = stad
    this.land = land
    this.locatieid = locatieid
    this.beschrijving = beschrijving
    this.datumvan = datumvan
    this.datumtot = datumtot
    this.postid = postid
    this.gebruiker = gebruiker
    this.fotoURL = fotoURL
    this.email = email
}






