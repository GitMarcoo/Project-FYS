document.addEventListener("DOMContentLoaded", start)
let session = FYSCloud.Session.get("Gebruiker");

let activeInputId, activeSearchValue

function start() {
    showNameHeader()
    document.getElementById("navGebruiker").addEventListener("click", showGebruiker)
    document.getElementById("navPosts").addEventListener("click", showPosts)

    document.getElementById("medewerker").addEventListener("click", showMedewerker)
    document.getElementById('register').addEventListener('click',getInfo)
    document.getElementById('navMelding').addEventListener('click',getMeldingen)

}

let zoekVensterZichtbaar, zoekBalkZichtbaar, searchItem, registerZichtbaar, meldingenZichtbaar, gebruikerZichtbaar

let email
let voornaam
let achternaam
let wachtwoord
let wachtwoordherhaal

function getMeldingen(){
    if (zoekBalkZichtbaar){
        toggleElement('zoekBalk')
        zoekBalkZichtbaar = false
        document.getElementById("zoekBalkInput").removeEventListener("input", showSearchItems)
    }
    if (registerZichtbaar){
        toggleElement('registerMedewerker')
        registerZichtbaar = false
    }

    if (meldingenZichtbaar){
        document.getElementById('meldingen').innerHTML = ''
        meldingenZichtbaar = false
    }

    if(gebruikerZichtbaar){
        toggleElement('gebruikerShow')
    gebruikerZichtbaar = false}

    meldingenZichtbaar = true
    getMeldingenFromDB()

}

function getMeldingenFromDB() {
    FYSCloud.API.queryDatabase(
        `
            SELECT *
            FROM melding
        `)
        .then(data => {
            loadMeldingen(data)
        })
        .catch(function (reason) {
            console.log(reason)
        })
}

function loadMeldingen(meldingen){
    for (let melding of meldingen){
        createMeldingElement(melding)
    }
}

function createMeldingElement(melding){
    let article = document.createElement('article')
    article.className = 'melding'

    let h1email = document.createElement('h1')
    let h1emailtext = document.createTextNode(melding.email)
    h1email.appendChild(h1emailtext)

    let h1onderwerp = document.createElement('h1')
    let h1onderwerptext = document.createTextNode(melding.onderwerp)
    h1onderwerp.appendChild(h1onderwerptext)

    let p = document.createElement('p')
    let ptext = document.createTextNode(melding.bericht)
    p.appendChild(ptext)

    article.append(h1email)
    article.append(h1onderwerp)
    article.append(p)

    let inputdelete = document.createElement('input')
    inputdelete.type = 'image'
    inputdelete.src = '../assets/img/cross.png'
    inputdelete.id = "deleteKnop" + melding.idMelding

    article.append(inputdelete)

    inputdelete.addEventListener('click',function (){deleteMelding(melding)})
    document.getElementById('meldingen').append(article)
}


function deleteMelding(melding){
        FYSCloud.API.queryDatabase(
            `
            DELETE
            FROM Melding
            WHERE idMelding = ?
        `, [melding.idMelding]
        ).then(response => {
            getMeldingen()
            console.log(response)
        })
            .catch(reason => {
                console.log(reason)
            })
    }



function showNameHeader(){
    FYSCloud.API.queryDatabase(
        `
            SELECT voornaam, achternaam
            FROM gebruiker
            WHERE email = ?
        `, [session]
    )
        .then(data => {
            document.getElementById('ingelogdNaam').innerText = data[0].voornaam + " " + data[0].achternaam
        })
        .catch(function (reason) {
            console.log(reason)
        })
}



function showMedewerker(){
    if (zoekBalkZichtbaar){
        toggleElement('zoekBalk')
        zoekBalkZichtbaar = false
        document.getElementById("zoekBalkInput").removeEventListener("input", showSearchItems)
    }
    if (!registerZichtbaar){
        toggleElement('registerMedewerker')
        registerZichtbaar = true
    }

    if (meldingenZichtbaar){
        document.getElementById('meldingen').innerHTML = ''
        meldingenZichtbaar = false
    }

    document.getElementById('navNaam').innerText = 'Medewerker'


}

function showGebruiker(){
    if (!zoekBalkZichtbaar){
        toggleElement('zoekBalk')
        zoekBalkZichtbaar = true
        document.getElementById("zoekBalkInput").addEventListener("input", showSearchItems)
    } if (registerZichtbaar){
        toggleElement('registerMedewerker')
        registerZichtbaar = false
    }

    if (meldingenZichtbaar){
        document.getElementById('meldingen').innerHTML = ''
        meldingenZichtbaar = false
    }

    document.getElementById('navNaam').innerText = 'Gebruiker'
    searchItem = 'gebruiker'

}

function showPosts(){
    if (!zoekBalkZichtbaar){
        toggleElement('zoekBalk')
        zoekBalkZichtbaar = true
        document.getElementById("zoekBalkInput").addEventListener("input", showSearchItems)
    }if (registerZichtbaar){
        toggleElement('registerMedewerker')
        registerZichtbaar = false
    }

    if (meldingenZichtbaar){
        document.getElementById('meldingen').innerHTML = ''
        meldingenZichtbaar = false
    }
    document.getElementById('navNaam').innerText = 'Post'
    searchItem = 'posts'

}


function showSearchItems() {
    activeInputId = "zoekBalkInput"
    const element = document.getElementById(activeInputId)
    let zoekValue = element.valueOf().value
    if (zoekValue !== "") {
        console.log(searchItem)
        if (searchItem === 'gebruiker'){
            searchGebruikersFromDB(zoekValue)
        }else if (searchItem === 'posts'){
            searchPostsFromDB(zoekValue)
        }
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

function selectResult(idNumber) {
    console.log(idNumber)
    let selectedid = "searchResult" + idNumber
    let selectedValue = document.getElementById(selectedid).innerText
    if (searchItem === 'gebruiker'){
        getGebruikerFromDB(selectedValue)
    } else  if (searchItem === 'posts'){
        selectedValue = selectedValue.split(" ")[0]
        getPostFromDB(selectedValue)
    }
    console.log('selectResult')


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
            selectResult(4)})

    }

}

function toggleElement(id) {
    const element = document.getElementById(id)
    element.classList.toggle("hidden")
}



function searchGebruikersFromDB(searchValue) {
    let databaseSearch = searchValue + "%"  //% achter laat waarde zoeken op het begin
    FYSCloud.API.queryDatabase(
        `
            SELECT email
            FROM gebruiker
            WHERE email LIKE ?
        `, [databaseSearch]
    )
        .then(data => {
            showSearchResults(data)
        })
        .catch(function (reason) {
            console.log(reason)
        })
}

function searchPostsFromDB(searchValue) {
    let databaseSearch = searchValue + "%"  //% achter laat waarde zoeken op het begin
    FYSCloud.API.queryDatabase(
        `
            SELECT idPost, activiteit
            FROM post
            WHERE idPost LIKE ?
        `, [databaseSearch]
    )
        .then(data => {
            console.log(data)
            showSearchResults(data)
        })
        .catch(function (reason) {
            console.log(reason)
        })
}

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
            if (results[i].email !== undefined) {
                document.getElementById(searchElementid).innerText = results[i].email
            } else if (results[i].idPost !== undefined){
                document.getElementById(searchElementid).innerText = results[i].idPost + ' ' + results[i].activiteit
            }
        }
    }
}



function getGebruikerFromDB(searchValue) {
    FYSCloud.API.queryDatabase(
        `
            SELECT *
            FROM gebruiker
            WHERE email = ?
        `, [searchValue]
    )
        .then(data => {
            createGebruikerHTML(data[0])
        })
        .catch(function (reason) {
            console.log(reason)
        })
}

function getPostFromDB(searchValue) {
    FYSCloud.API.queryDatabase(
        `
            SELECT *
            FROM post
            WHERE idPost = ?
        `, [searchValue]
    )
        .then(data => {
            createPostHTML(data[0])
        })
        .catch(function (reason) {
            console.log(reason)
        })
}

function createGebruikerHTML(gebruiker){
    //document.getElementById('laadScherm').innerHTML = ''
    if(!gebruikerZichtbaar){
    toggleElement('gebruikerShow')
    gebruikerZichtbaar = true}


    document.getElementById('gebruikerNaam').innerText = gebruiker.voornaam + " " + gebruiker.achternaam
    if (gebruiker.geblokkeerd !== 1){
        document.getElementById('gebruikerStatus').innerText = "Status: actief"
    } else {
        document.getElementById('gebruikerStatus').innerText = "Status: geblokkeerd"
    }

    document.getElementById('blokkeer').addEventListener("click", function () {
        blokkeerGebruiker(gebruiker)
    })
    document.getElementById('deblokkeer').addEventListener('click', function () {
        deblokkeerGebruiker(gebruiker)
    })

}

function blokkeerGebruiker(gebruiker){
        FYSCloud.API.queryDatabase(
            `
            UPDATE gebruiker
            SET geblokkeerd = ?
            WHERE email = ?
        `, [1,gebruiker.email]
        )
            .then(response => {
                console.log(response)
                document.getElementById('gebruikerStatus').innerText = "Status: geblokkeerd"
            }).catch(function (reason) {
            console.log(reason)
        })
}

function deblokkeerGebruiker(gebruiker){
    FYSCloud.API.queryDatabase(
        `
            UPDATE gebruiker
            SET geblokkeerd = ?
            WHERE email = ?
        `, [0,gebruiker.email]
    )
        .then(response => {
            console.log(response)
            document.getElementById('gebruikerStatus').innerText = "Status: actief"
        }).catch(function (reason) {
        console.log(reason)
    })
}

function createPostHTML(post){
    //document.getElementById('laadScherm').innerHTML = ''
    if(!gebruikerZichtbaar){
        toggleElement('gebruikerShow')
    gebruikerZichtbaar = true}

    console.log()
    document.getElementById('gebruikerNaam').innerText = post.postEigenaar + ' ' + post.activiteit
    if (post.isGeblokkeerd !== 1){
        document.getElementById('gebruikerStatus').innerText = "Status: actief"
    } else {
        document.getElementById('gebruikerStatus').innerText = "Status: geblokkeerd"
    }

    document.getElementById('blokkeer').addEventListener("click", function () {
        blokkeerGebruiker(post)
    })
    document.getElementById('deblokkeer').addEventListener('click', function () {
        deblokkeerGebruiker(post)
    })

}

function getInfo(){
    email = document.getElementById('email').valueOf().value
    voornaam = document.getElementById('naam').valueOf().value
    achternaam = document.getElementById('achternaam').valueOf().value
    wachtwoord = document.getElementById('wachtwoord').valueOf().value
    wachtwoordherhaal = document.getElementById('herhaal-wachtwoord').valueOf().value
    validateEmailWachtwoord()
    let inlog = new Inlog(email,voornaam,achternaam,wachtwoord)
    insertIntoDatabse()
    // checkDubbelePrimaryKey()

}

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

function insertIntoDatabse(){
    FYSCloud.API.queryDatabase(
        " INSERT INTO gebruiker (email,voornaam,achternaam,wachtwoord,isAdministrator,createdTime) VALUES (?,?,?,?,?,NOW());",
        ([email,voornaam,achternaam,wachtwoord,1])
    ).then(response => {
        console.log(response)
        clearRegister()
    }).catch(function (reason) {
        alert('al in gebruik')
        console.error(reason)
    })
}

function clearRegister(){
    document.getElementById('naam').valueOf().value = ''
    document.getElementById('achternaam').valueOf().value = ''
    document.getElementById('email').valueOf().value = ''
    document.getElementById('wachtwoord').valueOf().value = ''
    document.getElementById('herhaal-wachtwoord').valueOf().value = ''

}


