
var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
var ajax = new XMLHttpRequest();



//učitajmo niz aktivnosti i predmeta

    ajax.onreadystatechange = function () {
        if (ajax.readyState == 4 && ajax.status == 200) {
            //uzimamo sadržaj sa responseText i splitamo po redovima
            var sadrzajPredmeti = ajax.responseText;
            var redovi = sadrzajPredmeti.split("\n");
            var nizPredmeti = [];

            for (var i = 0; i < redovi.length; i++) {
                nizPredmeti.push(redovi[i]);
            }
        }

        if (ajax.readyState == 4 && ajax.status == 404) {
            console.log("Greska: nepoznat URL");
        }
    }


    //kreiramo uz pomoc rute
    ajax.open("POST", "http://localhost:3000/v1/predmeti", true);
    ajax.send();

    ajax.onreadystatechange = function () {
        if (ajax.readyState == 4 && ajax.status == 200) {
            var sadrzajAktivnosti = ajax.responseText;
            var redovi = sadrzajAktivnosti.split("\n");
            var nizAktivnosti = [];

            for (var i = 0; i < redovi.length; i++) {
                var kolone = redovi[i].split(",");
                nizAktivnosti.push(kolone);
            }
        }

        if (ajax.readyState == 4 && ajax.status == 404) {
            console.log("Greska: nepoznat URL");
        }
    }

    //Kreiramo uz pomoc rute
    ajax.open("POST", "http://localhost:3000/v1/aktivnosti", true);
    ajax.send();



function posaljiAjax() {
    var nazivPredmeta = document.getElementById("nPredmet");
    var tip = document.getElementById("Tip");
    var pocetak = document.getElementById("vPocetak");
    var kraj = document.getElementById("vKraj");
    var dan = document.getElementById("Dan");
    //od ovog napravimo objekat
    var objekat = { nazivPredmeta: nazivPredmeta, tip: tip, pocetak: pocetak, kraj: kraj, dan: dan }

    var postoji = false;
    //provjerimo da li pokupljeni predmet postoji
    for (var i = 0; i < nizPredmeti.length; i++) {
        if (objekat.nazivPredmeta == nizPredmeti[i]) {
            var postoji = true;
        }
    }

    if (postoji == false) {
        ajax.open("POST", "http://localhost:3000/v1/predmeti", true);
        ajax.send();
        //Zatim kreira i aktivnost
        ajax.open("POST", "http://localhost:3000/v1/aktivnosti", true);
        ajax.send(JSON.stringify(objekat));
    } else {
        console.log("Greska: nepoznat URL");
    }
}





