'use strict';

const express = require("express");
const bodyParser = require("body-parser");
const Sequelize = require('sequelize');
const db = require("./db.js");
const sequelize = require("./db.js");
const app = express();
app.use(bodyParser.json());


//Rute
require("../Zadatak1/rutaAktivnost.js")(app);
require("../Zadatak1/rutaDan.js")(app);
require("../Zadatak1/rutaDan.js")(app);
require("../Zadatak1/rutaGrupa.js")(app);
require("../Zadatak1/rutaPredmet.js")(app);
require("../Zadatak1/rutaStudent.js")(app);
require("../Zadatak1/rutaTip.js")(app);



const port = 3000;


db.sequelize.sync({ force: true })
  .then(() => {
    console.log(`Baza & tabele su kreirane!`);
  });


app.listen(port, () => console.log(`Server listening on port ${port}!`));
