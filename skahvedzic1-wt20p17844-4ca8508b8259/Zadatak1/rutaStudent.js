'use strict';
//const {studenti} = require("./db.js");
const db = require('../Zadatak1/db.js');
const studenti = db.studenti;
module.exports = (app, db) => {

    // daje sve studente
    app.get('/v2/studenti', (req, res) => {
        studenti.findAll()
            .then(studenti => {
                res.json(studenti);
            });
    });

    // daje studente po idu
    app.get('/v2/studenti/:id', (req, res) => {
        const id = req.params.id;
        studenti.findByPk(id)
            .then(student => {
                res.send(student);
            });
    });

    // Kreira studenta
    app.post('/v2/studenti', (req, res) => {
        const id = req.body.id;
        const ime = req.body.ime;
        const index = req.body.index;
        studenti.create({
            id: id,
            ime: ime,
            index: index
        })
            .then(noviStudent => {
                res.json(noviStudent);
            });
    });

    // Updejtuje studenta sa zadanim idom
    app.put('/v2/studenti/:id', (req, res) => {
        const id = req.params.id;
        studenti.update({ naziv: req.params.naziv, index: req.params.index },
            { where: { id: id } }
        ).then(() => {
            res.status(200).send("Uspješno ažuriran student sa id-em: " + id);
        });
    });

    //Brise studenta sa idom
    app.delete('/v2/studenti/:id', (req, res) => {
        const id = req.params.id;
        studenti.destroy({
            where: { id: id }
        })
            .then(() => {
                res.status(200).send('Uspješno obrisan student sa id-em: ' + id);
            });
    });

    app.post('/Zadatak2/studenti', (req, res) => {
        const ime = req.body.ime;
        const index = req.body.index;
        studenti.findOrCreate({
            where: {
                ime: ime,
                index: index

            },
            defaults: {
                ime: ime,
                index: index
            }
        }).then(() => {
            res.status(200).send('Student je kreiran!');
        });
    });


}