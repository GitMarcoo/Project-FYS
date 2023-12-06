
let activeCategorie = 'Recent'
let session = FYSCloud.Session.get("Gebruiker");
let userList = []
let stringArray = []
let userInterest
document.addEventListener("DOMContentLoaded", start)


function start() {
    document.getElementById("recentButton").addEventListener("click", changeRecentButton)
    document.getElementById("sportiefButton").addEventListener("click", changeSportiefButton)
    document.getElementById("relaxedButton").addEventListener("click", changeRelaxedButton)
    document.getElementById("stadButton").addEventListener("click", changeStadButton)
    document.getElementById("natuurButton").addEventListener("click", changeNatuurButton)
    document.getElementById("zoekBalkInput").addEventListener("input", showSearchItems)
    document.getElementById('filter1').addEventListener('click', function () {
        removeFitler(1)
    })
    document.getElementById('filter2').addEventListener('click', function () {
        removeFitler(2)
    })
    document.getElementById('filter3').addEventListener('click', function () {
        removeFitler(3)
    })
    document.getElementById('filter4').addEventListener('click', function () {
        removeFitler(4)
    })
    //document.getElementById("laatstBekekenMoveLeft").addEventListener("click", moveLeft)
    getUserInterest(function () {
        getPostFromDB()
    })


}


let searchArray;
let removeFitler1EventActive, removeFitler2EventActive, removeFitler3EventActive, removeFitler4EventActive
let postLoaded;
let maxAantalFitlers = 4;
let zoekVensterZichtbaar = false;
let chooseLanguageActive = false;
let activeFilters = 0;


let button = ['recentButton', 'sportiefButton', 'relaxedButton', 'stadButton', 'natuurButton']


/**
 * verander de filter categorie en opmaak
 * @param event
 */
function changeRecentButton(event) {
    activeCategorie = 'Recent'
    event.preventDefault()
    let element = document.getElementById('recentButton')
    element.className = 'catogorieButtonActive'
    element = document.getElementById('sportiefButton')
    element.className = 'catogorieButton'
    element = document.getElementById('relaxedButton')
    element.className = 'catogorieButton'
    element.className = 'catogorieButton'
    element = document.getElementById('stadButton')
    element.className = 'catogorieButton'
    element = document.getElementById('natuurButton')
    element.className = 'catogorieButton'

    // document.getElementById("catogoriePosts").innerHTML = '';
    getPostFromDB();

}

/**
 * verander de filter categorie en opmaak
 * @param event
 */
function changeSportiefButton(event) {
    activeCategorie = 'Sportief'
    event.preventDefault()
    let element = document.getElementById('sportiefButton')
    element.className = 'catogorieButtonActive'

    element = document.getElementById('recentButton')
    element.className = 'catogorieButton'
    element = document.getElementById('relaxedButton')
    element.className = 'catogorieButton'
    element.className = 'catogorieButton'
    element = document.getElementById('stadButton')
    element.className = 'catogorieButton'
    element = document.getElementById('natuurButton')
    element.className = 'catogorieButton'

    // document.getElementById("catogoriePosts").innerHTML = '';
    getPostFromDB();

}

/**
 * verander de filter categorie en opmaak
 * @param event
 */
function changeRelaxedButton(event) {
    activeCategorie = 'Relaxed'
    event.preventDefault()
    let element = document.getElementById('relaxedButton')
    element.className = 'catogorieButtonActive'

    element = document.getElementById('recentButton')
    element.className = 'catogorieButton'
    element = document.getElementById('sportiefButton')
    element.className = 'catogorieButton'
    element.className = 'catogorieButton'
    element = document.getElementById('stadButton')
    element.className = 'catogorieButton'
    element = document.getElementById('natuurButton')
    element.className = 'catogorieButton'

    // document.getElementById("catogoriePosts").innerHTML = '';
    getPostFromDB();
}
/**
 * verander de filter categorie en opmaak
 * @param event
 */
function changeStadButton(event) {
    activeCategorie = 'Stad'
    event.preventDefault()
    let element = document.getElementById('stadButton')
    element.className = 'catogorieButtonActive'

    element = document.getElementById('recentButton')
    element.className = 'catogorieButton'
    element = document.getElementById('relaxedButton')
    element.className = 'catogorieButton'
    element.className = 'catogorieButton'
    element = document.getElementById('sportiefButton')
    element.className = 'catogorieButton'
    element = document.getElementById('natuurButton')
    element.className = 'catogorieButton'

    // document.getElementById("catogoriePosts").innerHTML = '';
    getPostFromDB();
}
/**
 * verander de filter categorie en opmaak
 * @param event
 */
function changeNatuurButton(event) {
    activeCategorie = 'Natuur'
    event.preventDefault()
    let element = document.getElementById('natuurButton')
    element.className = 'catogorieButtonActive'

    element = document.getElementById('recentButton')
    element.className = 'catogorieButton'
    element = document.getElementById('relaxedButton')
    element.className = 'catogorieButton'
    element.className = 'catogorieButton'
    element = document.getElementById('stadButton')
    element.className = 'catogorieButton'
    element = document.getElementById('sportiefButton')
    element.className = 'catogorieButton'

    // document.getElementById("catogoriePosts").innerHTML = '';
    getPostFromDB();
}

/**
 * laat zoekwaardes uit db zien
 * @param event
 */
function showSearchItems(event) {
    const element = document.getElementById('zoekBalkInput')
    let zoekValue = element.valueOf().value
    searchArray = []
    getActiviteitFromDB(zoekValue)
    getStadFromDB(zoekValue)
    getLandFromDB(zoekValue)


    if (!zoekVensterZichtbaar && zoekValue.length > 0) {
        //show
        toggleElement('zoekVenster')
        zoekVensterZichtbaar = true
        document.getElementById('searchResult1').addEventListener('click', function () {
            activateFilter(1)
        })
        document.getElementById('searchResult2').addEventListener('click', function () {
            activateFilter(2)
        })
        document.getElementById('searchResult3').addEventListener('click', function () {
            activateFilter(3)
        })
        document.getElementById('searchResult4').addEventListener('click', function () {
            activateFilter(4)
        })
    } else if (zoekVensterZichtbaar && zoekValue.length == 0) {
        toggleElement('zoekVenster')
        zoekVensterZichtbaar = false
        document.getElementById('searchResult1').removeEventListener('click', function () {
            activateFilter(1)
        })
        document.getElementById('searchResult2').removeEventListener('click', function () {
            activateFilter(2)
        })
        document.getElementById('searchResult3').removeEventListener('click', function () {
            activateFilter(3)
        })
        document.getElementById('searchResult4').removeEventListener('click', function () {
            activateFilter(4)
        })
    }
    //document.getElementById("zoekBalk").addEventListener("blur", toggleElement('zoekVenster'))
}

/**
 * zorgt ervoor dat een element hidden wordt
 * @param id
 */
function toggleElement(id) {
    const element = document.getElementById(id)
    element.classList.toggle("hidden")
}

/**
 * maakt een filter uit de zoekbalk aangeklikt actief
 * @param id
 */
function activateFilter(id) {
    //get text from searchResults
    let elementid = 'searchResult' + id
    const element = document.getElementById(elementid)
    const elementValue = element.innerText.valueOf()

    let filter
    if (!(elementValue === '')) {
        stringArray.push(elementValue)
        switch (activeFilters) {
            case 0:
                if (!removeFitler1EventActive) {
                    filter = document.getElementById('filter1Text')
                    filter.innerText = elementValue
                    //document.getElementById('removeFilter1').addEventListener('click',function (){removeFitler(1)})
                    removeFitler1EventActive = true
                    toggleElement('filter1')
                }
                break;

            case 1:
                if (!removeFitler2EventActive) {
                    filter = document.getElementById('filter2Text')
                    filter.innerText = elementValue
                    toggleElement('filter2')
                    //document.getElementById('removeFilter2').addEventListener('click',function (){removeFitler(2)})
                    removeFitler2EventActive = true
                }
                break;

            case 2:

                if (!removeFitler3EventActive) {
                    filter = document.getElementById('filter3Text')
                    filter.innerText = elementValue
                    toggleElement('filter3')
                    //document.getElementById('removeFilter3').addEventListener('click',function (){removeFitler(3)})
                    removeFitler3EventActive = true
                }
                break;

            case 3:

                if (!removeFitler4EventActive) {
                    filter = document.getElementById('filter4Text')
                    filter.innerText = elementValue
                    toggleElement('filter4')
                    //document.getElementById('removeFilter4').addEventListener('click',function (){removeFitler(4)})
                    removeFitler4EventActive = true
                }
                break;
            default:
                alert("max aantal filters bereikt!")
                break;

        }

        document.getElementById('zoekBalkInput').valueOf().value = ""
        showSearchItems()
        document.getElementById('zoekBalkInput').focus()
        if (!(activeFilters > maxAantalFitlers)) {
            activeFilters++
        }

        getPostFromDB()

    }
}

/**
 * verwijderd een filter die actief is
 * @param id
 */
function removeFitler(id) {
    switch (activeFilters) {
        case 1:
            orderFilterAfterRemoveImproved(id)
            document.getElementById('filter1').removeEventListener('click', function () {
                removeFitler(1)
            })
            removeFitler1EventActive = false
            toggleElement('filter1')
            break;
        case 2:
            orderFilterAfterRemoveImproved(id)
            document.getElementById('filter2').removeEventListener('click', function () {
                removeFitler(2)
            })
            removeFitler2EventActive = false
            toggleElement('filter2')
            break;
        case 3:
            orderFilterAfterRemoveImproved(id)
            document.getElementById('filter3').removeEventListener('click', function () {
                removeFitler(3)
            })
            removeFitler3EventActive = false
            toggleElement('filter3')
            break;
        case 4:
            orderFilterAfterRemoveImproved(id)
            document.getElementById('filter4').removeEventListener('click', function () {
                removeFitler(4)
            })
            removeFitler4EventActive = false
            toggleElement('filter4')
            break;
    }
    activeFilters--
}

/**
 * wanneer een filter verwijderd wordt moeten het aantal filters dat aanstaat veranderen en de positie van
 * waar het filter staat moet veranderen dit wordt hiermee gedaan
 * @param NumberOfRemovedFitler
 */
function orderFilterAfterRemoveImproved(NumberOfRemovedFitler) {
    stringArray.splice(0, stringArray.length)
    let filterID;
    for (let i = 0; i < maxAantalFitlers; i++) {
        if (i + 1 <= activeFilters) {
            filterID = 'filter' + (i + 1) + 'Text'
            stringArray[i] = document.getElementById(filterID).innerText.valueOf()
        } else {
            stringArray[i] = null
        }
    }

    stringArray[NumberOfRemovedFitler - 1] = null

    let filterNumber = 1;
    //4 is actieve aantal filters
    for (let i = 0; i < maxAantalFitlers; i++) {
        if (stringArray[i] == null) {
            //next

        } else {
            filterID = 'filter' + (filterNumber) + 'Text'
            document.getElementById(filterID).innerText = stringArray[i]
            filterNumber++
        }
    }
    stringArray = stringArray.filter(val => val !== null);
    getPostFromDB();
}


/**
 * haalt de activiteit op van db
 * @param searchValue is zoekwaarde
 */
function getActiviteitFromDB(searchValue) {
    let databaseSearch = searchValue + "%"  //% achter laat waarde zoeken op het begin
    FYSCloud.API.queryDatabase(
        `
            SELECT DISTINCT naam
            FROM activiteit
            WHERE naam LIKE ?`, [databaseSearch]
    )
        .then(data => {
            showSearchResults(data)
        })
        .catch(function (reason) {
            console.log(reason)
        })
}
/**
 * haalt de stad op van db
 * @param searchValue is zoekwaarde
 */
function getStadFromDB(searchValue) {
    let databaseSearch = searchValue + "%"  //% achter laat waarde zoeken op het begin
    FYSCloud.API.queryDatabase(
        `
            SELECT DISTINCT stad
            FROM locatie
            WHERE stad LIKE ?`, [databaseSearch]
    )
        .then(data => {
            showSearchResults(data)
        })
        .catch(function (reason) {
            console.log(reason)
        })
}
/**
 * haalt de land op van db
 * @param searchValue is zoekwaarde
 */
function getLandFromDB(searchValue) {
    let databaseSearch = searchValue + "%"  //% achter laat waarde zoeken op het begin
    FYSCloud.API.queryDatabase(
        `
            SELECT DISTINCT land
            FROM locatie
            WHERE land LIKE ?`, [databaseSearch]
    )
        .then(data => {
            showSearchResults(data)
        })
        .catch(function (reason) {
            console.log(reason)
        })
}

/**
 * Op basis van de waarde uit de DB wordt de resultaten ingeladen in het zoekvenster. Ook wordt de eventlistener aangemaakt
 * en als het nodig is wordt het zoekresultaat van hidden afgehaald. De text wordt ingeladen op basis van welke waarde
 * de DB teruggeeft. Uit de DB komt een object met meerdere items en
 * @param results
 */
function showSearchResults(results) {
    for (let r of results) {
        searchArray.push(r)
    }
    let idsearch
    for (let i = 0; i < 4; i++) {
        idsearch = "result" + (i + 1)
        if (((i + 1) - searchArray.length) <= 0) {

            if (document.getElementById(idsearch).classList.contains("hidden")) {
                toggleElement(idsearch)
            }
        } else {
            if (!document.getElementById(idsearch).classList.contains("hidden")) {
                toggleElement(idsearch)
            }
        }

        let searchElementid = "searchResult" + (i + 1)
        if (searchArray[i] === undefined) {
            document.getElementById(searchElementid).innerText = ""
        } else {
            if (searchArray[i].naam !== undefined) {
                document.getElementById(searchElementid).innerText = searchArray[i].naam
            } else if (searchArray[i].stad !== undefined) {
                document.getElementById(searchElementid).innerText = searchArray[i].stad
            } else if (searchArray[i].land !== undefined) {
                document.getElementById(searchElementid).innerText = searchArray[i].land
            }
        }
    }
}

/**
 * Als een resultaat uit de het zoekvenster wordt aangklikt wordt het met het onderstaande uitgevoerd om de
 * het scherm weer te vergen en de event listenerers weg te halen.
 * @param idNumber
 */

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
            selectResult(4)
        })
    }
}

/**
 * Met deze functie wordt de post van gebruikers die matchen met interesses van de ingelogde gebruiker gesorteerd op
 * een sterkte match (dus met veel overeenkomende interesse) tot een zwakke match (geen overeenkomde interesses)
 * uit de DB gehaald gesorteerd op tijd als de categorie recent is,
 * sportief als de categorie sportief is, relaxed als de categorie relaxed is, stad als de categorie stad is en
 * natuur als de categorie natuur is. Uiteindelijk wordt ook gegeken hoeveel filters er aan staan en deze worden
 * toegepast op het zoeken
 * @param user is de gebruiker als email adres waar naar gezocht wordt in de DB.
 */
function getPostFromDB() {
    if (activeCategorie === 'Recent') {
        if (stringArray.length === 0) {
            FYSCloud.API.queryDatabase(
                `
                    SELECT *
                    FROM post
                             JOIN (SELECT email,
                                          SUM(CASE
                                                  WHEN interesse1 IN (?, ?, ?) THEN 1
                                                  ELSE 0
                                              END
                                              ) + SUM(CASE
                                                          WHEN interesse2 IN (?, ?, ?) THEN 1
                                                          ELSE 0
                                              END
                                              ) + SUM(CASE
                                                          WHEN interesse3 IN (?, ?, ?) THEN 1
                                                          ELSE 0
                                              END) AS num_matches
                                   FROM interesselijst
                                   WHERE email!= ?
                                   GROUP BY email
                                   ORDER BY num_matches DESC) t ON t.email = post.postEigenaar
                             INNER JOIN locatie
                                        ON post.idLocatie = locatie.idLocatie
                             INNER JOIN activiteit
                                        ON post.activiteit = activiteit.naam
                             INNER JOIN interesselijst
                                        ON post.postEigenaar = interesselijst.email
                             INNER JOIN gebruiker
                                        ON post.postEigenaar = gebruiker.email
                    WHERE CURDATE() <= einddatum
                    ORDER BY num_matches DESC, post.startdatum ASC
                `, [userInterest.interesse1, userInterest.interesse2, userInterest.interesse3,
                    userInterest.interesse1, userInterest.interesse2, userInterest.interesse3,
                    userInterest.interesse1, userInterest.interesse2, userInterest.interesse3, session])
                .then(data => {
                    loadPosts(data)
                }).catch(function (reason) {
                console.log(reason)
            })
        } else if (stringArray.length === 1) {
            FYSCloud.API.queryDatabase(
                `
                    SELECT *
                    FROM post
                             JOIN (SELECT email,
                                          SUM(CASE
                                                  WHEN interesse1 IN (?, ?, ?) THEN 1
                                                  ELSE 0
                                              END
                                              ) + SUM(CASE
                                                          WHEN interesse2 IN (?, ?, ?) THEN 1
                                                          ELSE 0
                                              END
                                              ) + SUM(CASE
                                                          WHEN interesse3 IN (?, ?, ?) THEN 1
                                                          ELSE 0
                                              END) AS num_matches
                                   FROM interesselijst
                                   WHERE email!= ?
                                   GROUP BY email
                                   ORDER BY num_matches DESC) t ON t.email = post.postEigenaar
                             INNER JOIN locatie
                                        ON post.idLocatie = locatie.idLocatie
                             INNER JOIN activiteit
                                        ON post.activiteit = activiteit.naam
                             INNER JOIN interesselijst
                                        ON post.postEigenaar = interesselijst.email
                             INNER JOIN gebruiker
                                        ON post.postEigenaar = gebruiker.email
                    WHERE CURDATE() <= einddatum AND (land = ?
                       OR activiteit = ?
                       OR stad = ?)
                    ORDER BY num_matches DESC, post.startdatum ASC
                `, [userInterest.interesse1, userInterest.interesse2, userInterest.interesse3,
                    userInterest.interesse1, userInterest.interesse2, userInterest.interesse3,
                    userInterest.interesse1, userInterest.interesse2, userInterest.interesse3, session,
                    stringArray[0], stringArray[0], stringArray[0]])
                .then(data => {
                    loadPosts(data)
                }).catch(function (reason) {
                console.log(reason)
            })
        } else if (stringArray.length === 2) {
            FYSCloud.API.queryDatabase(
                `
                    SELECT *
                    FROM post
                             JOIN (SELECT email,
                                          SUM(CASE
                                                  WHEN interesse1 IN (?, ?, ?) THEN 1
                                                  ELSE 0
                                              END
                                              ) + SUM(CASE
                                                          WHEN interesse2 IN (?, ?, ?) THEN 1
                                                          ELSE 0
                                              END
                                              ) + SUM(CASE
                                                          WHEN interesse3 IN (?, ?, ?) THEN 1
                                                          ELSE 0
                                              END) AS num_matches
                                   FROM interesselijst
                                   WHERE email!= ?
                                   GROUP BY email
                                   ORDER BY num_matches DESC) t ON t.email = post.postEigenaar
                             INNER JOIN locatie
                                        ON post.idLocatie = locatie.idLocatie
                             INNER JOIN activiteit
                                        ON post.activiteit = activiteit.naam
                             INNER JOIN interesselijst
                                        ON post.postEigenaar = interesselijst.email
                             INNER JOIN gebruiker
                                        ON post.postEigenaar = gebruiker.email
                    WHERE CURDATE() <= einddatum AND (land = ? OR activiteit = ? OR stad = ?)
                      AND (land = ? OR activiteit = ? OR stad = ?)
                    ORDER BY num_matches DESC, post.startdatum ASC
                `, [userInterest.interesse1, userInterest.interesse2, userInterest.interesse3,
                    userInterest.interesse1, userInterest.interesse2, userInterest.interesse3,
                    userInterest.interesse1, userInterest.interesse2, userInterest.interesse3, session,
                    stringArray[0], stringArray[0], stringArray[0], stringArray[1], stringArray[1], stringArray[1]])
                .then(data => {
                    loadPosts(data)
                }).catch(function (reason) {
                console.log(reason)
            })
        } else if (stringArray.length === 3) {
            FYSCloud.API.queryDatabase(
                `
                    SELECT *
                    FROM post
                             JOIN (SELECT email,
                                          SUM(CASE
                                                  WHEN interesse1 IN (?, ?, ?) THEN 1
                                                  ELSE 0
                                              END
                                              ) + SUM(CASE
                                                          WHEN interesse2 IN (?, ?, ?) THEN 1
                                                          ELSE 0
                                              END
                                              ) + SUM(CASE
                                                          WHEN interesse3 IN (?, ?, ?) THEN 1
                                                          ELSE 0
                                              END) AS num_matches
                                   FROM interesselijst
                                   WHERE email!= ?
                                   GROUP BY email
                                   ORDER BY num_matches DESC) t ON t.email = post.postEigenaar
                             INNER JOIN locatie
                                        ON post.idLocatie = locatie.idLocatie
                             INNER JOIN activiteit
                                        ON post.activiteit = activiteit.naam
                             INNER JOIN interesselijst
                                        ON post.postEigenaar = interesselijst.email
                             INNER JOIN gebruiker
                                        ON post.postEigenaar = gebruiker.email
                    WHERE CURDATE() <= einddatum AND (land = ? OR activiteit = ? OR stad = ?)
                      AND (land = ? OR activiteit = ? OR stad = ?)
                      AND (land = ? OR activiteit = ? OR stad = ?)
                    ORDER BY num_matches DESC, post.startdatum ASC
                `, [userInterest.interesse1, userInterest.interesse2, userInterest.interesse3,
                    userInterest.interesse1, userInterest.interesse2, userInterest.interesse3,
                    userInterest.interesse1, userInterest.interesse2, userInterest.interesse3, session,
                    stringArray[0], stringArray[0], stringArray[0], stringArray[1], stringArray[1], stringArray[1],
                    stringArray[2], stringArray[2], stringArray[2]])
                .then(data => {
                    loadPosts(data)
                }).catch(function (reason) {
                console.log(reason)
            })
        } else if (stringArray.length === 4) {
            FYSCloud.API.queryDatabase(
                `
                    SELECT *
                    FROM post
                             JOIN (SELECT email,
                                          SUM(CASE
                                                  WHEN interesse1 IN (?, ?, ?) THEN 1
                                                  ELSE 0
                                              END
                                              ) + SUM(CASE
                                                          WHEN interesse2 IN (?, ?, ?) THEN 1
                                                          ELSE 0
                                              END
                                              ) + SUM(CASE
                                                          WHEN interesse3 IN (?, ?, ?) THEN 1
                                                          ELSE 0
                                              END) AS num_matches
                                   FROM interesselijst
                                   WHERE email!= ?
                                   GROUP BY email
                                   ORDER BY num_matches DESC) t ON t.email = post.postEigenaar
                             INNER JOIN locatie
                                        ON post.idLocatie = locatie.idLocatie
                             INNER JOIN activiteit
                                        ON post.activiteit = activiteit.naam
                             INNER JOIN interesselijst
                                        ON post.postEigenaar = interesselijst.email
                             INNER JOIN gebruiker
                                        ON post.postEigenaar = gebruiker.email
                    WHERE CURDATE() <= einddatum AND (land = ? OR activiteit = ? OR stad = ?)
                      AND (land = ? OR activiteit = ? OR stad = ?)
                      AND (land = ? OR activiteit = ? OR stad = ?)
                      AND (land = ? OR activiteit = ? OR stad = ?)
                    ORDER BY num_matches DESC, post.startdatum ASC
                `, [userInterest.interesse1, userInterest.interesse2, userInterest.interesse3,
                    userInterest.interesse1, userInterest.interesse2, userInterest.interesse3,
                    userInterest.interesse1, userInterest.interesse2, userInterest.interesse3, session,
                    stringArray[0], stringArray[0], stringArray[0], stringArray[1], stringArray[1], stringArray[1],
                    stringArray[2], stringArray[2], stringArray[2], stringArray[3], stringArray[3], stringArray[3]])
                .then(data => {
                    loadPosts(data)
                }).catch(function (reason) {
                console.log(reason)
            })
        }
    } else {
        if (stringArray.length === 0) {
            FYSCloud.API.queryDatabase(
                `
                    SELECT *
                    FROM post
                             JOIN (SELECT email,
                                          SUM(CASE
                                                  WHEN interesse1 IN (?, ?, ?) THEN 1
                                                  ELSE 0
                                              END
                                              ) + SUM(CASE
                                                          WHEN interesse2 IN (?, ?, ?) THEN 1
                                                          ELSE 0
                                              END
                                              ) + SUM(CASE
                                                          WHEN interesse3 IN (?, ?, ?) THEN 1
                                                          ELSE 0
                                              END) AS num_matches
                                   FROM interesselijst
                                   WHERE email!= ?
                                   GROUP BY email
                                   ORDER BY num_matches DESC) t ON t.email = post.postEigenaar
                             INNER JOIN locatie
                                        ON post.idLocatie = locatie.idLocatie
                             INNER JOIN activiteit
                                        ON post.activiteit = activiteit.naam
                             INNER JOIN interesselijst
                                        ON post.postEigenaar = interesselijst.email
                             INNER JOIN gebruiker
                                        ON post.postEigenaar = gebruiker.email
                    WHERE activiteit.categorie = ? AND CURDATE() <= einddatum
                    ORDER BY num_matches DESC, post.startdatum ASC
                `, [userInterest.interesse1, userInterest.interesse2, userInterest.interesse3,
                    userInterest.interesse1, userInterest.interesse2, userInterest.interesse3,
                    userInterest.interesse1, userInterest.interesse2, userInterest.interesse3, session,
                    activeCategorie])
                .then(data => {
                    loadPosts(data)
                }).catch(function (reason) {
                console.log(reason)
            })
        } else if (stringArray.length === 1) {
            FYSCloud.API.queryDatabase(
                `
                    SELECT *
                    FROM post
                             JOIN (SELECT email,
                                          SUM(CASE
                                                  WHEN interesse1 IN (?, ?, ?) THEN 1
                                                  ELSE 0
                                              END
                                              ) + SUM(CASE
                                                          WHEN interesse2 IN (?, ?, ?) THEN 1
                                                          ELSE 0
                                              END
                                              ) + SUM(CASE
                                                          WHEN interesse3 IN (?, ?, ?) THEN 1
                                                          ELSE 0
                                              END) AS num_matches
                                   FROM interesselijst
                                   WHERE email!= ?
                                   GROUP BY email
                                   ORDER BY num_matches DESC) t ON t.email = post.postEigenaar
                             INNER JOIN locatie
                                        ON post.idLocatie = locatie.idLocatie
                             INNER JOIN activiteit
                                        ON post.activiteit = activiteit.naam
                             INNER JOIN interesselijst
                                        ON post.postEigenaar = interesselijst.email
                             INNER JOIN gebruiker
                                        ON post.postEigenaar = gebruiker.email
                    WHERE activiteit.categorie = ? AND CURDATE() <= einddatum
                      AND (land = ? OR stad = ? OR activiteit = ?)
                    ORDER BY num_matches DESC, post.startdatum ASC
                `, [userInterest.interesse1, userInterest.interesse2, userInterest.interesse3,
                    userInterest.interesse1, userInterest.interesse2, userInterest.interesse3,
                    userInterest.interesse1, userInterest.interesse2, userInterest.interesse3, session,
                    activeCategorie, stringArray[0], stringArray[0], stringArray[0]])
                .then(data => {
                    loadPosts(data)
                }).catch(function (reason) {
                console.log(reason)
            })
        } else if (stringArray.length === 2) {
            FYSCloud.API.queryDatabase(
                `
                    SELECT *
                    FROM post
                             JOIN (SELECT email,
                                          SUM(CASE
                                                  WHEN interesse1 IN (?, ?, ?) THEN 1
                                                  ELSE 0
                                              END
                                              ) + SUM(CASE
                                                          WHEN interesse2 IN (?, ?, ?) THEN 1
                                                          ELSE 0
                                              END
                                              ) + SUM(CASE
                                                          WHEN interesse3 IN (?, ?, ?) THEN 1
                                                          ELSE 0
                                              END) AS num_matches
                                   FROM interesselijst
                                   WHERE email!= ?
                                   GROUP BY email
                                   ORDER BY num_matches DESC) t ON t.email = post.postEigenaar
                             INNER JOIN locatie
                                        ON post.idLocatie = locatie.idLocatie
                             INNER JOIN activiteit
                                        ON post.activiteit = activiteit.naam
                             INNER JOIN interesselijst
                                        ON post.postEigenaar = interesselijst.email
                             INNER JOIN gebruiker
                                        ON post.postEigenaar = gebruiker.email
                    WHERE activiteit.categorie = ? AND CURDATE() <= einddatum
                      AND (land = ? OR stad = ? OR activiteit = ?)
                      AND (land = ? OR stad = ? OR activiteit = ?)
                    ORDER BY num_matches DESC, post.startdatum ASC
                `, [userInterest.interesse1, userInterest.interesse2, userInterest.interesse3,
                    userInterest.interesse1, userInterest.interesse2, userInterest.interesse3,
                    userInterest.interesse1, userInterest.interesse2, userInterest.interesse3, session,
                    activeCategorie, stringArray[0], stringArray[0], stringArray[0],
                    stringArray[1], stringArray[1], stringArray[1]])
                .then(data => {
                    loadPosts(data)
                }).catch(function (reason) {
                console.log(reason)
            })
        } else if (stringArray.length === 3) {
            FYSCloud.API.queryDatabase(
                `
                    SELECT *
                    FROM post
                             JOIN (SELECT email,
                                          SUM(CASE
                                                  WHEN interesse1 IN (?, ?, ?) THEN 1
                                                  ELSE 0
                                              END
                                              ) + SUM(CASE
                                                          WHEN interesse2 IN (?, ?, ?) THEN 1
                                                          ELSE 0
                                              END
                                              ) + SUM(CASE
                                                          WHEN interesse3 IN (?, ?, ?) THEN 1
                                                          ELSE 0
                                              END) AS num_matches
                                   FROM interesselijst
                                   WHERE email!= ?
                                   GROUP BY email
                                   ORDER BY num_matches DESC) t ON t.email = post.postEigenaar
                             INNER JOIN locatie
                                        ON post.idLocatie = locatie.idLocatie
                             INNER JOIN activiteit
                                        ON post.activiteit = activiteit.naam
                             INNER JOIN interesselijst
                                        ON post.postEigenaar = interesselijst.email
                             INNER JOIN gebruiker
                                        ON post.postEigenaar = gebruiker.email
                    WHERE activiteit.categorie = ? AND CURDATE() <= einddatum
                      AND (land = ? OR stad = ? OR activiteit = ?)
                      AND (land = ? OR stad = ? OR activiteit = ?)
                      AND (land = ? OR stad = ? OR activiteit = ?)
                    ORDER BY num_matches DESC, post.startdatum ASC
                `, [userInterest.interesse1, userInterest.interesse2, userInterest.interesse3,
                    userInterest.interesse1, userInterest.interesse2, userInterest.interesse3,
                    userInterest.interesse1, userInterest.interesse2, userInterest.interesse3, session,
                    activeCategorie, stringArray[0], stringArray[0], stringArray[0],
                    stringArray[1], stringArray[1], stringArray[1], stringArray[2], stringArray[2], stringArray[2]])
                .then(data => {
                    loadPosts(data)
                }).catch(function (reason) {
                console.log(reason)
            })
        } else if (stringArray.length === 4) {
            FYSCloud.API.queryDatabase(
                `
                    SELECT *
                    FROM post
                             JOIN (SELECT email,
                                          SUM(CASE
                                                  WHEN interesse1 IN (?, ?, ?) THEN 1
                                                  ELSE 0
                                              END
                                              ) + SUM(CASE
                                                          WHEN interesse2 IN (?, ?, ?) THEN 1
                                                          ELSE 0
                                              END
                                              ) + SUM(CASE
                                                          WHEN interesse3 IN (?, ?, ?) THEN 1
                                                          ELSE 0
                                              END) AS num_matches
                                   FROM interesselijst
                                   WHERE email!= ?
                                   GROUP BY email
                                   ORDER BY num_matches DESC) t ON t.email = post.postEigenaar
                             INNER JOIN locatie
                                        ON post.idLocatie = locatie.idLocatie
                             INNER JOIN activiteit
                                        ON post.activiteit = activiteit.naam
                             INNER JOIN interesselijst
                                        ON post.postEigenaar = interesselijst.email
                             INNER JOIN gebruiker
                                        ON post.postEigenaar = gebruiker.email
                    WHERE activiteit.categorie = ? AND CURDATE() <= einddatum
                      AND (land = ? OR stad = ? OR activiteit = ?)
                      AND (land = ? OR stad = ? OR activiteit = ?)
                      AND (land = ? OR stad = ? OR activiteit = ?)
                      AND (land = ? OR stad = ? OR activiteit = ?)
                    ORDER BY num_matches DESC, post.startdatum ASC
                `, [userInterest.interesse1, userInterest.interesse2, userInterest.interesse3,
                    userInterest.interesse1, userInterest.interesse2, userInterest.interesse3,
                    userInterest.interesse1, userInterest.interesse2, userInterest.interesse3, session,
                    activeCategorie, stringArray[0], stringArray[0], stringArray[0],
                    stringArray[1], stringArray[1], stringArray[1],
                    stringArray[2], stringArray[2], stringArray[2],
                    stringArray[3], stringArray[3], stringArray[3]])
                .then(data => {
                    loadPosts(data)
                }).catch(function (reason) {
                console.log(reason)
            })
        }

    }

}

/**
 * Haalt de interesses van de ingolgde gebruiker op uit de DB
 * @param callback
 */
function getUserInterest(callback) {
    FYSCloud.API.queryDatabase(
        `SELECT interesse1, interesse2, interesse3
         FROM interesselijst
         WHERE email = ?
        `, [session]).then(data => {
        userInterest = data[0]
        callback()
    }).catch(reason => {
        console.log(reason)
    })
}

function createInterestList(user) {

}


/**
 * Deze functie zorgt ervoor dat alle gebruikers die uit de vorige functie kwamen in een array gezet worden die ik
 * in het gehele javascript kan zien.
 * @param users zijn de array van gebruiker objecten
 * @param callback is om de vervolgfunctie uit te voeren
 */
function makeUserList(users, callback) {
    for (let user of users) {
        userList.push(user.email)
    }
    callback()
}


function getPostFromDBLoop() {
    /**alle posts worden opgehaald op basis van welke user het meest overeenkomt tot minder. Nadeel is alle post
     * van 1 persoon worden eerst opgehaald en zo door en recent werkt niet meer hierdoor, want je haalt alles op van 1 persoon eerst.
     * */
    for (let user of userList) {
        getPostFromDB(user)
    }
}

function loadPosts(posts) {
    document.getElementById("catogoriePosts").innerHTML = '';
    for (let p of posts) {
        let postHelp = convertPostJSON(p)
        createArticle(postHelp)
    }
}


function convertPostJSON(postJSON) {
    return new Post(postJSON.activiteit, postJSON.stad, postJSON.land, postJSON.beschrijving,
        new Date(postJSON.startdatum),
        new Date(postJSON.einddatum), postJSON.idPost, postJSON.idLocatie,
        postJSON.fotoURL, postJSON.voornaam + " " + postJSON.achternaam)
}

function Post(activiteit, stad, land, beschrijving, datumvan, datumtot, postid, locatieid, fotoURL, gebruiker) {
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
}

/**
 * Hiermee wordt in de FYSCloud bijgehouden welke post geopend is zodat het html bestand van postOpenScherm de
 * juiste gegevens kan laden.
 * @param id is het id van de post die aangeklikt wordt
 */
function setOpenPostId(id) {
    FYSCloud.Session.set("OpenId", id)
}

/**
 * Het onderstaande gedeelte wordt gebruikt om de post in html aan te maken.
 * @param post bevat alle gegevens die nodig zijn om de post aan te maken.
 */
function createArticle(post) {
    let a = document.createElement('a')

    a.href = 'Post/postOpenScherm.html'
    a.className = 'postCategorie'
    a.addEventListener("click", function () {
        setOpenPostId(post.postid)
    })
    let article = document.createElement('article')
    a.append(article)
    article.append(createFigurePostImage(post))
    article.append(createDivPosttext(post))

    let sectionPostList = document.getElementById('catogoriePosts')

    sectionPostList.append(a)
}

function createFigurePostImage(post) {
    let figure = document.createElement('figure')
    let img = document.createElement('img')

    figure.className = 'PostImage'

    img.src = "../../" + post.fotoURL
    img.alt = 'PostImage'
    img.loading = 'lazy'

    figure.append(img)

    return figure
}

function createDivPosttext(post) {
    let div = document.createElement('div')
    let h1 = document.createElement('h1')
    let p = document.createElement('p')
    let p2 = document.createElement('p')

    div.className = 'Posttext'
    h1.className = 'PostActiviteit'

    let texth1 = document.createTextNode(post.activiteit)

    h1.appendChild(texth1)
    div.append(h1)

    p.className = 'postPeriode'

    let textp = document.createTextNode(post.datumvan.toLocaleDateString() + " tot " + post.datumtot.toLocaleDateString())
    p.appendChild(textp)
    div.append(p)

    p2.className = 'postEigenaar'
    let textp2 = document.createTextNode(post.gebruiker)
    p2.appendChild(textp2)
    div.append(p2)

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
    img.src = '../../assets/img/locatieIcon.png'
    img.alt = 'locatieIcon'

    p.id = 'location' + post.postid
    p.appendChild(text)
    div.append(img)
    div.append(p)

    return div

}