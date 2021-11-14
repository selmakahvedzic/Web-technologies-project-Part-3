'use strict';
const { grupe } = require("./db.js");
module.exports = (app, db) => {

    // daje sve grupe
    app.get('/v2/grupe', (req, res) => {
        grupe.findAll()
            .then(grupe => {
                res.json(grupe);
            });
    });

    // daje grupu za poslani id
    app.get('/v2/grupe/:id', (req, res) => {
        const id = req.params.id;
        grupe.findByPk(id)
            .then(grupe => {
                res.send(grupe);
            })
    });

    // kreira jednu grupu
    app.post('/v2/grupe', (req, res) => {
        const id = req.body.id;
        const naziv = req.body.naziv;
        grupe.create({
            id: id,
            naziv: naziv
        })
            .then(novaGrupa => {
                res.json(novaGrupa);
            })
    });

    // updejtuje grupu po poslanom idu
    app.put('/v2/grupe/:id', (req, res) => {
        const id = req.params.id;
        grupe.update({ naziv: req.params.naziv },
            { where: { id: id } }
        ).then(() => {
            res.status(200).send("Uspješno ažurirana grupa sa id-em: " + id);
        });
    });

    // brise grupu po poslanom id-u
    app.delete('/v2/grupe/:id', (req, res) => {
        const id = req.params.id;
        grupe.destroy({
            where: { id: id }
        })
            .then(() => {
                res.status(200).send('Uspješno obrisana grupa sa id-em: ' + id);
            });
    });
};