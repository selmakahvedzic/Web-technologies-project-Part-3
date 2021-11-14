var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
var ajax = new XMLHttpRequest();



//Kupi studente
ajax.onreadystatechange = function () {
    if (ajax.readyState == 4 && ajax.status == 200) {
        var niz = [];
        var studenti = ajax.responseText;
        var pomStudent = document.getElementById("Student");

        for (var i = 0; i < studenti.length; i++) {
            //Studenti su u CSV formatu pa ih razdvaja po ,
            var pom = studenti[i].split(",");
            var option = new Option(pom[0].ime, pom[1].index, studenti[i].id);
            pomStudent.options.add(option);
        }
    }

    if (ajax.readyState == 4 && ajax.status == 404) {
        console.log("Greska: nepoznat URL");
    }
}


ajax.open("GET", "http://localhost:3000/v2/studenti", true);
ajax.send();


//Kupi grupe
ajax.onreadystatechange = function () {
    if (ajax.readyState == 4 && ajax.status == 200) {
        var grupe = ajax.responseText;
        var pomGrupa = document.getElementById("Grupa");
        console.log(pomGrupa);
        for (var i = 0; i < grupe.length; i++) {
            var option = new Option(grupe[i].naziv, grupe[i].id);
            pomGrupa.options.add(option);
        }
    }

    if (ajax.readyState == 4 && ajax.status == 404) {
        console.log("Greska: nepoznat URL");
    }
}


ajax.open("GET", "http://localhost:3000/v2/grupe", true);
ajax.send();


function posaljiZahtjev() {
  
    document.getElementById("vSubmit").addEventListener('click', posaljiZahtjev);
    var student = document.getElementById("Student");
    var grupa = document.getElementById("Grupa");
    //od ovog napravimo objekat
    var objekat = { student: student, grupa: grupa }

    var postoji = false;
    //provjerimo da li pokupljeni student postoji
    for (var i = 0; i < pomStudent.length; i++) {
        if (objekat.student == pomStudent[i]) {
            var postoji = true;
            break;
        }
    }

    if (postoji == false) {
        ajax.open("POST", "http://localhost:3000/Zadatak2/studenti", true);
        ajax.send();
        //Zatim kreira i aktivnost
        ajax.open("POST", "http://localhost:3000/v2/grupe", true);
        ajax.send(JSON.stringify(objekat));
    } else {
        console.log("Greska: nepoznat URL");
    }
}





