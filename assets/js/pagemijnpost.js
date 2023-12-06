document.addEventListener("DOMContentLoaded", start)
let session = FYSCloud.Session.get("Gebruiker");

function start() {
    document.getElementById('addPostButton').addEventListener('click', showCreatePost)
    document.getElementById("postTitel").addEventListener("input", function () {
        showSearchItems("postTitel")
    })
    document.getElementById("postLocatieStad").addEventListener("input", function () {
        showSearchItems("postLocatieStad")
    })
    getPostFromDB();

}



let postSchermVisible, annuleerKnopActive, maakAanKnopActive, maakAanKnopVisible, wijzigKnopActive, wijzigKnopVisible;
let zoekVensterZichtbaar
let postTitelActive, postLocatieStadActive, activiteitcorrect, stadcorrect, landcorrect, datumvancorrect, datumtotcorrect
let activeInputId

function showCreatePost() {
    document.getElementById('postLocatieLand').classList.remove('redborder')
    document.getElementById('postTitel').classList.remove('redborder')
    document.getElementById('postLocatieStad').classList.remove('redborder')
    document.getElementById('periodeTot').classList.remove('redborder')
    document.getElementById('periodeVan').classList.remove('redborder')
    setPostCreateValuesToNull()
    if (!postSchermVisible) {
        //set post create scherm visible
        const element = document.getElementById('postScherm')
        element.classList.toggle('hidden')
        postSchermVisible = true;
        //als knoppen nog geen eventlistener hebben geef ze dat
        if (!annuleerKnopActive) {
            document.getElementById('buttonAnnuleer').addEventListener('click', hidePostScherm)
            annuleerKnopActive = true;
            document.getElementById('buttonMaakAan').addEventListener('click', submitPost)
            maakAanKnopActive = true;
        }

    }
    //zet maak aan knop op visible
    if (!maakAanKnopVisible) {
        document.getElementById('buttonMaakAan').classList.toggle('hidden')
        maakAanKnopVisible = true;
    }
}


function showEditPost(post) {
    if (!postSchermVisible) {
        const element = document.getElementById('postScherm')
        element.classList.toggle('hidden')
        postSchermVisible = true;
        if (!annuleerKnopActive) {
            document.getElementById('buttonAnnuleer').addEventListener('click', hidePostScherm)
            annuleerKnopActive = true;
        }

    }
    if (!wijzigKnopActive) {
        document.getElementById('buttonWijzig').addEventListener('click', function () {
            editChanges(post)})
        wijzigKnopActive = true;
    }



    if (!wijzigKnopVisible) {
        document.getElementById('buttonWijzig').classList.toggle('hidden')
        wijzigKnopVisible = true;
    }
    if (maakAanKnopVisible) {
        document.getElementById('buttonMaakAan').classList.toggle('hidden')
    }
}

function hidePostScherm() {
    //hide post scherm
    const element = document.getElementById('postScherm')
    element.classList.toggle('hidden')
    document.getElementById('buttonAnnuleer').removeEventListener('click', hidePostScherm)
    annuleerKnopActive = false
    postSchermVisible = false;
    if (maakAanKnopActive) {
        document.getElementById('buttonMaakAan').removeEventListener('click', submitPost)
        maakAanKnopActive = false
    }
}


function deletePost(post) {
    document.getElementById('deleteKnop' + post.postid).removeEventListener('click', function () {
        deletePost(post)
    })
    document.getElementById('editKnop' + post.postid).removeEventListener('click', function () {
        editPost(post)
    })
    deletePostFromDB(post)
    document.getElementById('mijnpost' + post.postid).remove()
}


function editPost(post) {
    document.getElementById('postTitel').valueOf().value = post.activiteit
    document.getElementById('postLocatieStad').valueOf().value = post.stad
    document.getElementById('postLocatieLand').valueOf().value = post.land
    document.getElementById('postBijschrift').valueOf().value = post.beschrijving
    document.getElementById("editIMG").src = "../../../" + post.fotoURL
    let month
    if (post.datumvan.getMonth() < 10) {
        month = "0" + (post.datumvan.getMonth() + 1)
    } else {
        month = post.datumvan.getMonth() + 1
    }
    let day
    if (post.datumvan.getDate() < 10) {
        day = "0" + post.datumvan.getDate()
    } else {
        day = post.datumvan.getDate()
    }

    let periodeVan = post.datumvan.getFullYear() + "-" + month + "-" + day

    document.getElementById('periodeVan').value = periodeVan

    if (post.datumtot.getMonth() < 10) {
        month = "0" + (post.datumtot.getMonth() + 1)
    } else {
        month = post.datumtot.getMonth() + 1
    }

    if (post.datumtot.getDate() < 10) {
        day = "0" + post.datumtot.getDate()
    } else {
        day = post.datumtot.getDate()
    }

    let periodeTot = post.datumtot.getFullYear() + "-" + month + "-" + day

    document.getElementById('periodeTot').value = periodeTot
    FYSCloud.Session.set("postId", post.postid)
    showEditPost(post)
}

/**
 * haal de waardes uit het formulier en maak er een object post van.
 */
function submitPost() {
    let postActiviteitvalue = document.getElementById('postTitel').valueOf().value
    let postStadvalue = document.getElementById('postLocatieStad').valueOf().value
    let postLandvalue = document.getElementById('postLocatieLand').valueOf().value
    let postBijschriftvalue = document.getElementById('postBijschrift').valueOf().value
    let postDatumVanvalue = document.getElementById('periodeVan').valueOf().value
    let postDatumTotvalue = document.getElementById('periodeTot').valueOf().value

    let post = new Post(postActiviteitvalue, postStadvalue, postLandvalue, postBijschriftvalue, postDatumVanvalue, postDatumTotvalue, null,)

    checkvalues(post, function (){
        if (activiteitcorrect && stadcorrect && landcorrect && datumtotcorrect && datumvancorrect){
            /**Database werkt met een id van de locatie deze moet eerst opgehaald worden
            * */
            getLocatieIdFromDB(post, function () {insertPostDB(post)})
            setPostCreateValuesToNull()
        }
    })


}


function checkvalues(post, callback ){
    checkActiviteit(post.activiteit)
    checkStad(post.stad)
    checkLand(post.land)
    checkDatumTot(post.datumtot)
    checkDatumVan(post.datumvan)

    callback()
}

function checkActiviteit(value){
    FYSCloud.API.queryDatabase(
        `SELECT
             CASE
                 WHEN EXISTS  (SELECT naam FROM activiteit WHERE naam = ?)
                     THEN 1
                 ELSE 0
                 END AS waarde`,[value]
    ).then(data => {
        activiteitcorrect = data[0].waarde === 1
        if (!activiteitcorrect){
            document.getElementById('postTitel').classList.add('redborder')
        }else{
            document.getElementById('postTitel').classList.remove('redborder')
        }
    }).catch(function (reason) {
        console.log(reason);
    });
}

function checkStad(value){
    FYSCloud.API.queryDatabase(
        `SELECT
             CASE
                 WHEN EXISTS  (SELECT stad FROM locatie WHERE stad = ?)
                     THEN 1
                 ELSE 0
                 END AS waarde`,[value]
    ).then(data => {
        stadcorrect = data[0].waarde === 1
        if (!stadcorrect){
            document.getElementById('postLocatieStad').classList.add('redborder')
        }else{
            document.getElementById('postLocatieStad').classList.remove('redborder')
        }
    }).catch(function (reason) {
        console.log(reason);
    });
}

function checkLand(value){
    console.log(value)
    FYSCloud.API.queryDatabase(
        `SELECT
             CASE
                 WHEN EXISTS  (SELECT land FROM locatie WHERE land = ?)
                     THEN 1
                 ELSE 0
                 END AS waarde`,[value]
    ).then(data => {
        landcorrect = data[0].waarde === 1
        if (!stadcorrect){
            document.getElementById('postLocatieLand').classList.add('redborder')
        }else{
            document.getElementById('postLocatieLand').classList.remove('redborder')
        }
    }).catch(function (reason) {
        console.log(reason);
    });
}

function checkDatumVan(value){
    if (value === ""){
        datumvancorrect = false;
        document.getElementById('periodeVan').classList.add('redborder')
    }else {
        datumvancorrect = true;
        document.getElementById('periodeVan').classList.remove('redborder')
    }
}

function checkDatumTot(value){
    if (value === ""){
        datumtotcorrect = false
        document.getElementById('periodeTot').classList.add('redborder')
    }else {
        datumtotcorrect = true
        document.getElementById('periodeTot').classList.remove('redborder')
    }
}


function createArticle(post) {
    let article = document.createElement('article')

    article.className = 'postCategorie'
    article.id = 'mijnpost' + post.postid

    article.append(createFigurePostImage(post))
    article.append(createDivPosttext(post))
    article.append(createDivEditDeleteSection(post))

    let sectionPostList = document.getElementById('postList')

    sectionPostList.append(article)
    document.getElementById('deleteKnop' + post.postid).addEventListener("click", function () {
        deletePost(post)
    })
    document.getElementById('editKnop' + post.postid).addEventListener('click', function () {
        editPost(post)
    })
}

function editChanges(post) {
    document.getElementById('buttonMaakAan').removeEventListener('click', function () {
        editChanges(post)
    })
    post.activiteit = document.getElementById('postTitel').valueOf().value
    post.stad = document.getElementById('postLocatieStad').valueOf().value
    post.land = document.getElementById('postLocatieLand').valueOf().value
    post.beschrijving = document.getElementById('postBijschrift').valueOf().value
    post.datumvan = document.getElementById('periodeVan').valueOf().value
    post.datumtot = document.getElementById('periodeTot').valueOf().value


    getLocatieIdFromDB(post, function () {updatePostToDB(post)})


    checkvalues(post, function (){
        if (activiteitcorrect && stadcorrect && landcorrect && datumtotcorrect && datumvancorrect){
            /**Database werkt met een id van de locatie deze moet eerst opgehaald worden
             * */
            getLocatieIdFromDB(post, function () {updatePostToDB(post)})
        }
    })




}


function Post(activiteit, stad, land, beschrijving, datumvan, datumtot, postid, locatieid, fotoURL) {
    this.activiteit = activiteit
    this.stad = stad
    this.land = land
    this.locatieid = locatieid
    this.beschrijving = beschrijving
    this.datumvan = datumvan
    this.datumtot = datumtot
    this.postid = postid
    this.gebruiker = null
    this.fotoURL = fotoURL
}

function createFigurePostImage(post) {
    let figure = document.createElement('figure')
    let img = document.createElement('img')

    figure.className = 'PostImage'

    img.src = "../../../"+ post.fotoURL
    img.alt = 'PostImage'
    img.loading = 'lazy'

    figure.append(img)

    return figure
}

function createDivPosttext(post) {
    let div = document.createElement('div')
    let h1 = document.createElement('h1')
    let p = document.createElement('p')

    div.className = 'Posttext'
    h1.className = 'PostActiviteit'
    h1.id = 'Posttext' + post.postid //mag weg met database

    let texth1 = document.createTextNode(post.activiteit)

    h1.appendChild(texth1)
    div.append(h1)

    p.className = 'postPeriode'
    p.id = 'postPeriode' + post.postid
    let textp = document.createTextNode(post.datumvan.toLocaleDateString() + " tot " + post.datumtot.toLocaleDateString())
    p.appendChild(textp)
    div.append(p)


    div.append(createDivPostBijschrift(post))
    div.append(createDivPostLocatie(post))

    return div
}


function createDivPostBijschrift(post) {
    let div = document.createElement('div')
    let h1 = document.createElement('h1')
    let p = document.createElement('p')
    let textTitel = document.createTextNode('Bijschrift:')

    div.className = 'Bijschrift'
    h1.appendChild(textTitel)
    let textBeschrijving = document.createTextNode(post.beschrijving)
    p.appendChild(textBeschrijving)
    p.id = 'Bijschrift' + post.postid
    div.append(h1)
    div.append(p)

    return div
}

function createDivPostLocatie(post) {
    let div = document.createElement('div')
    let img = document.createElement('img')
    let p = document.createElement('p')
    let text = document.createTextNode(post.stad + ', ' + post.land)

    div.className = 'locatie'
    img.src = '../../../assets/img/locatieIcon.png'
    img.alt = 'locatieIcon'

    p.id = 'location' + post.postid
    p.appendChild(text)
    div.append(img)
    div.append(p)

    return div

}

function createDivEditDeleteSection(post) {
    let div = document.createElement('div')
    let inputDelete = document.createElement('input')

    div.className = 'flexColumn editDeleteSection'
    inputDelete.type = 'image'
    inputDelete.src = '../../../assets/img/cross.png'
    inputDelete.id = 'deleteKnop' + post.postid

    div.append(inputDelete)

    let inputEdit = document.createElement('input')
    inputEdit.type = 'image'
    inputEdit.src = '../../../assets/img/edit.png'
    inputEdit.id = 'editKnop' + post.postid

    div.append(inputEdit)

    return div
}

function setPostCreateValuesToNull() {
    let postTitelvalue = document.getElementById('postTitel').valueOf()
    let postStadvalue = document.getElementById('postLocatieStad').valueOf()
    let postLandvalue = document.getElementById('postLocatieLand').valueOf()
    let postBijschriftvalue = document.getElementById('postBijschrift').valueOf()
    let postDatumVanvalue = document.getElementById('periodeVan').valueOf()
    let postDatumTotvalue = document.getElementById('periodeTot').valueOf()
    //send to db
    postTitelvalue.value = null
    postStadvalue.value = null
    postLandvalue.value = null
    postBijschriftvalue.value = null
    postBijschriftvalue.value = null
    postDatumTotvalue.value = null
    postDatumVanvalue.value = null
}


function getGebruiker() {
    FYSCloud.API.queryDatabase(
        "SELECT * FROM gebruiker WHERE email = 'gebruiker@gmail.com' "
    ).then(data => {
        let gebruiker = convertGebruikerJSON(data)
        return gebruiker
    }).catch(function (reason) {
        console.log(reason);
    });
}

function convertGebruikerJSON(gebruikerJSON) {
    return new Gebruiker(gebruikerJSON[0].email, gebruikerJSON.voornaam, gebruikerJSON.achternaam,
        gebruikerJSON['geboortedatum'])
}

function Gebruiker(email, voornaam, achternaam, geboortedatum) {
    this.email = email
    this.voornaam = voornaam
    this.achternaam = achternaam
    this.geboortedatum = geboortedatum
}

function insertPostDB(post) {
    FYSCloud.API.queryDatabase(
        `INSERT INTO post (activiteit, beschrijving, idLocatie, startdatum, einddatum, postEigenaar, createdTime)
         VALUES (?, ?, ?, ?, ?, ?, NOW());`,
        [post.activiteit, post.beschrijving, post.locatieid, post.datumvan, post.datumtot, session]
    ).then(response => {
        console.log(response)
        location.reload()
    }).catch(function (reason) {
            console.error(reason);
            alert("De ingevoerde waardes waren onjuist! \n Verplichte velden: \n\t- Activiteit \n\t- Stad Land" +
                "\n\t- periode van\n\t- periode tot")
        })
}

function getPostFromDB() {
    let posts
    FYSCloud.API.queryDatabase(
        `SELECT *
         FROM post
                  INNER JOIN locatie
                             ON post.idLocatie = locatie.idLocatie
                  INNER JOIN activiteit
                             ON post.activiteit = activiteit.naam
         WHERE postEigenaar = ?;`,[session]
    )
        .then(data => {
            loadPosts(data)
        }).catch(function (reason) {
        console.log(reason)
    })

}

function convertPostJSON(postJSON) {
    return new Post(postJSON.activiteit, postJSON.stad, postJSON.land, postJSON.beschrijving,
        new Date(postJSON.startdatum),
        new Date(postJSON.einddatum), postJSON.idPost, postJSON.idLocatie,
        postJSON.fotoURL)
}

function getLocatieIdFromDB(post, callback) {
    FYSCloud.API.queryDatabase(
        `
            SELECT idLocatie
            FROM locatie
            WHERE stad = ?
              AND land = ?
        `, [post.stad, post.land]
    )
        .then(data => {
            post.locatieid = data[0].idLocatie
            callback();
        })
        .catch(function (reason) {
            console.log(reason)
            alert("De locatie bestaat niet!")
        })
}


function loadPosts(postList) {
    for (let p of postList) {
        let postHelp = convertPostJSON(p)
        createArticle(postHelp)
    }
}


function updatePostToDB(post) {
    let postid = FYSCloud.Session.get("postId")
    FYSCloud.API.queryDatabase(
        `
            UPDATE post
            SET activiteit = ?,
                beschrijving = ?,
                idLocatie = ?,
                createdTime = NOW()
            WHERE idPost = ?
        `,
        [post.activiteit, post.beschrijving, post.locatieid, postid]
    )

        .then(response => {
            console.log(response)
            location.reload()
            hidePostScherm()
        }).catch(function (reason) {
        console.log(reason)
    })
}


function getPostIDfromGebruiker() {
    FYSCloud.API.queryDatabase(
        `
            SELECT idPost
            FROM post
            WHERE postEigenaar = 'gebruiker@gmail.com'
        `
    )
        .then(data => {
            reloadPage(ata)
        }).catch(function (reason) {
        console.log(reason)
    })
}


function deletePostFromDB(post) {
    FYSCloud.API.queryDatabase(
        `
            DELETE
            FROM post
            WHERE idPost = ?
        `, [post.postid]
    ).then(response => {
        console.log(response)
    })
        .catch(reason => {
            console.log(reason)
        })
}


function showSearchItems(inputId) {
    if (inputId === "postTitel" && !postTitelActive) {
        postTitelActive = true;
        postLocatieStadActive = false
        document.getElementById('zoekVenster').className = "hidden"
        document.getElementById('zoekVenster').classList.add("zoekVensterActiviteit")
    } else if (inputId === 'postLocatieStad' && !postLocatieStadActive) {
        postLocatieStadActive = true
        postTitelActive = false
        document.getElementById('zoekVenster').className = "hidden"
        document.getElementById('zoekVenster').classList.add("zoekVensterStad")
    }
    activeInputId = inputId
    const element = document.getElementById(inputId)
    let zoekValue = element.valueOf().value
    if (zoekValue !== "") {
        if (inputId === "postTitel") {
            getActiviteitFromDB(zoekValue)
        }
        if (inputId === "postLocatieStad") {
            getStadFromDB(zoekValue)
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

function toggleElement(id) {
    const element = document.getElementById(id)
    element.classList.toggle("hidden")
}

function getActiviteitFromDB(searchValue) {
    let databaseSearch = searchValue + "%"  //% achter laat waarde zoeken op het begin
    FYSCloud.API.queryDatabase(
        `
            SELECT naam
            FROM activiteit
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

function getFotoURLFromDB(searchValue) {
    FYSCloud.API.queryDatabase(
        `
            SELECT fotoURL
            FROM activiteit
            WHERE naam = ?
        `, [searchValue]
    )
        .then(data => {
            document.getElementById('editIMG').src = "../../../"+ data[0].fotoURL
        })
        .catch(function (reason) {
            console.log(reason)
        })
}

function getStadFromDB(searchValue) {
    let databaseSearch = searchValue + "%"  //% achter laat waarde zoeken op het begin
    FYSCloud.API.queryDatabase(
        `
            SELECT stad, land
            FROM locatie
            WHERE stad LIKE ?
        `, [databaseSearch]
    )
        .then(data => {
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
            if (results[i].naam !== undefined) {
                document.getElementById(searchElementid).innerText = results[i].naam
            } else {
                document.getElementById(searchElementid).innerText = results[i].stad + ", " + results[i].land
            }
        }
    }
}

function selectResult(idNumber) {
    let selectedid = "searchResult" + idNumber
    let selectedValue = document.getElementById(selectedid).innerText
    if (activeInputId === "postTitel") {
        document.getElementById(activeInputId).valueOf().value = selectedValue
        getFotoURLFromDB(selectedValue)
    } else {
        document.getElementById(activeInputId).valueOf().value = selectedValue.split(',')[0]
        document.getElementById("postLocatieLand").valueOf().value = selectedValue.split(',')[1].replace(" ", "")
    }
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

