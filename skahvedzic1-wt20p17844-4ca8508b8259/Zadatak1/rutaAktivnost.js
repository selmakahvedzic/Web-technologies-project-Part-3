
'use strict';
const { aktivnosti } = require("./db.js");

module.exports = (app, db) => {

    // daje sve aktivnosti
    app.get('/v1/aktivnosti', (req, res) => {
        aktivnosti.findAll()
            .then(aktivnosti => {
                res.json(aktivnosti);
            });
    });

    // daje aktivnost po idu
    app.get('/v1/aktivnosti/:id', (req, res) => {
        const id = req.params.id;
        aktivnosti.findByPk(id)
            .then(aktivnost => {
                res.send(aktivnost);
            })
    });

   
    // Kreira jednu aktivnost
    app.post('/v1/aktivnosti', (req, res) => {
        const id = req.body.id;
        const naziv = req.body.naziv;
        const pocetak = req.body.pocetak;
        const kraj = req.body.kraj;
        aktivnosti.create({
            id: id,
            naziv: naziv,
            pocetak: pocetak,
            kraj: kraj
        })
            .then(novaAktivnost => {
                res.send(novaAktivnost);
            });
            
    });

    // Updejtuje aktivnost sa zadanim idom
    app.put('/v2/aktivnosti/:id', (req, res) => {
        const id = req.params.id;
        aktivnosti.update({ naziv: req.params.naziv, pocetak: req.params.pocetak, kraj: req.params.kraj },
            { where: { id: id } }
        ).then(() => {
            res.status(200).send("Uspješno ažuriran tip sa id-em: " + id);
        });
    });

    //Brise aktivnost sa idom
    app.delete('/v1/aktivnosti/:id', (req, res) => {
        const id = req.params.id;
        aktivnosti.destroy({
            where: { id: id }
        })
            .then(() => {
                res.status(200).send('Uspješno obrisana aktivnost sa id-em: ' + id);
            });
    });

};