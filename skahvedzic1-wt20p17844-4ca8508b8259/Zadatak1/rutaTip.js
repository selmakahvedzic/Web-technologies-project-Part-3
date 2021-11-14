'use strict';
const { tipovi } = require("./db.js");
module.exports = (app, db) => {

    // daje sve tipove
    app.get('/v2/tipovi', (req, res) => {
        tipovi.findAll()
            .then(tipovi => {
                res.json(tipovi);
            });
    });


    //Vraća tipove po id-u
    app.get('/v2/tipovi/:id', (req, res) => {
        const id = req.params.id;
        tipovi.findByPk(id).then(tip => {
            res.send(tip);
        })
    });


    // Kreira tip
    app.post('/v2/tipovi', (req, res) => {
        const id = req.body.id;
        const naziv = req.body.naziv;

        tipovi.create({ id: id, naziv: naziv })
            .then(novitip => {
                res.json(novitip);
            });
    });

    // Updejtuje tip sa zadanim idom
    app.put('/v2/tipovi/:id', (req, res) => {
        const id = req.params.id;
        tipovi.update({naziv: req.params.naziv},
            { where: { id: id } }
        ).then(() => {
            res.status(200).send("Uspješno ažuriran tip sa id-em: " + id);
        });
    });




    //Brise tip sa idom
    app.delete('/v2/tipovi/:id', (req, res) => {
        const id = req.params.id;
        tipovi.destroy({
            where: { id: id }
        })
            
            .then(() => {
                res.status(200).send('Uspješno obrisan tip sa id-em: ' + id);
              });
    });

};