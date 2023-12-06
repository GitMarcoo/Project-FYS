document.addEventListener('DOMContentLoaded', start)

function start() {

    var initialLanguage = "nl";

    var translations = {
        header:{
            home:{
                nl: "Home",
                en: "Home",
                es: "Home"
            },
            contact:{
                nl: "Contact",
                en: "Contact",
                es: "Contacto"
            },
            inlog:{
                nl: "Inloggen",
                en: "Login",
                es: "Acceso"
            },
            mijnPosts:{
                nl: "Posts",
                en: "Posts",
                es: "Publicaciones"
            },
            profiel:{
                nl: "Profiel",
                en: "Profile",
                es: "Perfil"
            },
        },

        // INDEX  //
        blok1: {
            titel: {
                nl: "Deel uw ervaring...",
                en: "Share your experience...",
                es: "Comparte tu experiencia..."
            },
            beschrijving: {
                nl: "Met de wereld...",
                en: "With the world...",
                es: "Con el mundo..."
            },
            redirect: {
                nl: "Kom meer erover te weten",
                en: "Learn more",
                es: "Aprende más"
            },
            locatie: {
                nl: "Andesgebergte, Zuid-Amerika",
                en: "Andesmountains, South-America",
                es: "Cordillera de los Andes, Sud-América"
            },
        },
        blok2: {
            titel: {
                nl: "Het begin van nieuwe vriendschappen...",
                en: "The beginning of new friendships...",
                es: "El comienzo de nuevas amistades..."
            },
            beschrijving: {
                nl: "Een tool waarin individuen met talloze interesses en hobbies elkaar kunnen opzoeken voor een gezamenlijke reis vol met avontuur en plezier.",
                en: "A tool in which individuals with numerous interests and hobbies can join together to a journey full of adventure and fun.",
                es: "Una herramienta en la que personas con múltiples intereses y aficiones pueden unirse en un viaje lleno de aventuras y diversión."
            },
        },
        blok3: {
            titel: {
                nl: "Hoe werkt het?",
                en: "How does it work?",
                es: "¿Como funciona?"
            },
            beschrijving: {
                nl: "Het hele proces om deel te nemen aan je favoriete activiteit is zo gedaan! Bekijk de simpele stappen hieronder!",
                en: "The process of participating in your favorite activity is done in no time! Check out the simple steps below!",
                es: "¡El proceso de participar en tu actividad favorita se hace en poco tiempo! ¡Mira los sencillos pasos a continuación!"
            },
            stap1t: {
                nl: "stap 1",
                en: "step 1",
                es: "paso 1"

            },
            stap1b: {
                nl: "Meld je aan en vul je hobby's en interesses in",
                en: "Sign up and begin filling up your hobbies and interests",
                es: "Regístrese y comience a llenar sus pasatiempos e intereses"
            },
            stap2t: {
                nl: "stap 2",
                en: "step 2",
                es: "paso 2"
            },
            stap2b: {
                nl: "Scroll door de posts waarme je gematcht wordt en kies er een uit",
                en: "Scroll through the recommended posts and choose one",
                es: "Desplácese por las publicaciones recomendadas y elija una"
            },
            stap3t: {
                nl: "stap 3",
                en: "step 3",
                es: "paso 3"
            },
            stap3b: {
                nl: "Neem contact op met de eigenaar van de post",
                en: "Contact the owner of the post",
                es: "Contacta al dueño de la publicación"
            },
            stap4t: {
                nl: "stap 4",
                en: "step 4",
                es: "paso 4"
            },
            stap4b: {
                nl: "Bereid je voor op de activiteit!",
                en: "Get ready for the activity!",
                es: "¡Prepárate para la actividad!"
            },
            button: {
                nl: "Registreren",
                en: "Register",
                es: "Registrarse"
            },
        },

        // CONTACT //
        contact: {
            titel: {
                nl: "Contact",
                en: "Contact",
                es: "Contacto"
            },
            beschrijving: {
                nl: "Voor alle vragen en meldingen bent u hier op de juist plek. Vul het formulier hieronder in.",
                en: "You have come to the right place for all questions and reports. Fill in the form below.",
                es: "Ha venido al lugar correcto para todas las preguntas e informes. Rellene el siguiente formulario."
            },
            naam: {
                nl: "Naam",
                en: "Name",
                es: "Nombre"
            },
            naam_placeHolder: {
                nl: "Uw voornaam & achternaam",
                en: "Your firstname & lastname",
                es: "Tu nombre y apellido"
            },
            email: {
                nl: "Email",
                en: "Email",
                es: "Email"
            },
            onderwerp: {
                nl: "Onderwerp",
                en: "Subject",
                es: "Sujeto"
            },
            bericht: {
                nl: "Bericht",
                en: "Message",
                es: "Mensaje"
            },
            verzend: {
                nl: "VERZEND",
                en: "SEND",
                es: "ENVIAR"
            },
            bevestiging: {
                nl: "Bericht verzenden?",
                en: "Send message?",
                es: "¿Enviar mensaje?"
            },
            bevestigingJa: {
                nl: "JA",
                en: "YES",
                es: "SI"
            },
            bevestigingNee: {
                nl: "NEE",
                en: "NO",
                es: "NO"
            },
            verzonden: {
                nl: "Uw bericht is verzonden",
                en: "Your message has been sent",
                es: "Tu mensaje ha sido enviado"
            },
            nietVerzonden: {
                nl: "Uw bericht is niet verzonden",
                en: "Your message hasn't been sent",
                es: "Tu mensaje no ha sido enviado"
            },
        },


        // Inlog //
        inlog: {
            titel: {
                nl: "Login",
                en: "Login",
                es: "Acceso"
            },
            rood: {
                nl: "Geen account?",
                en: "Don't have an account",
                es: "No tiene un perfil?"
            },
            register: {
                nl: "Registreer",
                en: "Register",
                es: "Registrar"
            },
        },

        // REGISTER //
        register: {
            titel: {
                nl: "Registratie",
                en: "Registration",
                es: "la inscripción"
            },
            button: {
                nl: "REGISTREER",
                en: "REGISTER",
                es: "REGISTRASE"
            },
        },

        // profielpaginaWijzigen //
        profiel: {
            profiel: {
                nl: "Profiel",
                en: "Profile",
                es: "Perfil"
            },
            biografie: {
                nl: "Biografie",
                en: "Biography",
                es: "Biografía"
            },
            naam: {
                nl: "Naam",
                en: "Name",
                es: "NOMBRE"
            },
            achternaam: {
                nl: "Achternaam",
                en: "Lastname",
                es: "Apedillo"
            },
            leeftijd: {
                nl: "Leeftijd",
                en: "Age",
                es: "Años"
            },
            adres: {
                nl: "Adres",
                en: "Adress",
                es: "Dirección"
            },
            opslaan:{
                nl: "Opslaan",
                en: "Save",
                es: "Ahorrar"
            },
            wijzigen:{
                nl: "Profiel wijzigen",
                en: "Change profile",
                es: "Cambiar el perfil"
            },
            interesse1:{
                nl: "Interesse 1",
                en: "Interest 1",
                es: "Interés 1"
            },
            interesse2:{
                nl: "Interesse 2",
                en: "Interest 2",
                es: "Interés 2"
            },
            interesse3:{
                nl: "Interesse 3",
                en: "Interest 3",
                es: "Interés 3"
            },
        },

        // FRONTPAGE INGELOGD GEBRUIKER //
        frontpage: {
            laatstbekeken: {
                nl: "Laatst bekeken",
                en: "Last viewed",
                es: "Visto recientemente"
            },
            categorieen: {
                nl: "Aanbevolen",
                en: "Recommended",
                es: "Recomendado",
            },
            recent: {
                nl: "Recent",
                en: "Recently",
                es: "Recién",
            },
            sportief: {
                nl: "Sportief",
                en: "Sporty",
                es: "Deportivo",
            },
            relaxed: {
                nl: "Relaxed",
                en: "Relaxed",
                es: "Relajado",
            },
            stad: {
                nl: "Stad",
                en: "City",
                es: "Ciudad",
            },
            natuur: {
                nl: "Natuur",
                en: "Nature",
                es: "Naturaleza",
            },
        },

        // MIJN POSTS //
        mijnposts: {
            titel: {
                nl: "Mijn Posts",
                en: "My Posts",
                es: "Mis publicaciones"
            },
            activiteit: {
                nl: "Activiteit",
                en: "Activity",
                es: "Actividad"
            },
            stad: {
                nl: "Stad",
                en: "City",
                es: "Ciudad"
            },
            land: {
                nl: "Land",
                en: "Country",
                es: "País"
            },
            bijschrift: {
                nl: "Bijschrift",
                en: "Description",
                es: "Descripción"
            },
            periodeVan: {
                nl: "Periode van",
                en: "Period from",
                es: "Periodo desde"
            },
            periodeTot: {
                nl: "Periode tot",
                en: "Period to",
                es: "Período a"
            },
            maakAan: {
                nl: "Maak aan",
                en: "Create",
                es: "Crear"
            },
        },

        // POST OPENSCHERM //
        postopen: {
            bijschrift: {
                nl: "Bijschrift",
                en: "Description",
                es: "Descripción"
            },
            bericht: {
                nl: "Geinteresseerd? Stuur een bericht!",
                en: "Interested? Send a Message!",
                es: "¿Interesado? ¡Enviar un mensaje!"
            },
            rapporteer: {
                nl: "Ongewenst gedrag of post. Geef het door!",
                en: "Undesirable behavior or post. Let us know!",
                es: "Comportamiento o publicación no deseada. ¡Haznos saber!"
            },

        },

        // PROFIELPAGINA //
        profielpagina: {
            profiel: {
                nl: "Profiel",
                en: "Profile",
                es: "Perfil"
            },
            wijzigen: {
                nl: "Profiel wijzigen",
                en: "Edit profile",
                es: "Cambiar perfil"
            },
            interesses: {
                nl: "Interesses",
                en: "Interests",
                es: "Intereses"
            },
            rapporteer: {
                nl: "Ongewenst gedrag of post. Geef het door!",
                en: "Undesirable behavior or post. Let us know!",
                es: "Comportamiento o publicación no deseada. ¡Haznos saber!"
            },
            loguit: {
                nl: "Log uit",
                en: "Log out",
                es: "Cerrar sesión",
            },
            naam: {
                nl: "Naam",
                en: "Name",
                es: "Nombre",
            },
            achternaam: {
                nl: "Achternaam",
                en: "Surname",
                es: "Apedillo",
            },
            leeftijd: {
                nl: "Leeftijd",
                en: "Age",
                es: "Años",
            },
            interesse1: {
                nl: "Interesse 1",
                en: "Interest 1",
                es: "Interés 1"
            },
            interesse2: {
                nl: "Interesse 2",
                en: "Interest 2",
                es: "Interés 2"
            },
            interesse3: {
                nl: "Interesse 3",
                en: "Interest 3",
                es: "Interés 3"
            },
            opslaan: {
                nl: "Opslaan",
                en: "Save",
                es: "Ahorrar"
            },

        },



    };

    FYSCloud.Localization.setTranslations(translations);
    FYSCloud.Localization.switchLanguage(initialLanguage);

    document.querySelector("#localizationLanguageSwitch").value = initialLanguage;

    document.querySelector("#localizationLanguageSwitch").addEventListener("change", function () {
        FYSCloud.Localization.switchLanguage(this.value);
    });

    document.querySelector("#localizationDynamicClick").addEventListener("click", function () {
        var template = document.querySelector("#localizationDynamicTemplate").innerHTML;

        var element = FYSCloud.Utils.parseHtml(template)[0];

        document.querySelector(".localizationSubheaderTarget").appendChild(element);

        FYSCloud.Localization.translate();
    });

}