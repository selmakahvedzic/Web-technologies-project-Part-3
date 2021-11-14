'use strict';

const { dani } = require("./db.js");
module.exports = (app, db) => {

    // daje sve dane
    app.get('/v2/dani', (req, res) => {
        dani.findAll()
            .then(dani => {
                res.json(dani);
            });
    });

    // daje dane po idu
    app.get('/v2/dani/:id', (req, res) => {
        const id = req.params.id;
        dani.findByPk(id).then(dan => {
                res.send(dan);
            })
    });
 

    // Kreira dan
    app.post('/v2/dani', (req, res) => {
        const id = req.body.id;
        const naziv = req.body.naziv;

        dani.create({ id: id, naziv: naziv })
            .then(novidan => {
                res.json(novidan);
            });
    });

    // Updejtuje dan sa zadanim idom
    app.put('/v2/dani/:id', (req, res) => {
        const id = req.params.id;
        dani.update({ naziv: req.params.naziv },
            { where: { id: id } }
        ).then(() => {
            res.status(200).send("Uspješno ažuriran dan sa id-em: " + id);
        });
    });

    //Brise dan sa idom
    app.delete('/v2/dani/:id', (req, res) => {
        const id = req.params.id;
        dani.destroy({
            where: { id: id }
        })
            .then(() => {
                res.status(200).send('Uspješno obrisan dan sa id-em: ' + id);
            });
    });

};

