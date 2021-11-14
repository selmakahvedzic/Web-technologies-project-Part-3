'use strict';
const { predmeti } = require("./db.js");
module.exports = (app, db) => {

  // daje sve predmete
  app.get('/v1/predmeti', (req, res) => {
    predmeti.findAll()
      .then(predmeti => {
        res.json(predmeti);
      });
  });

  // daje jedan predmet po idu
  app.get('/v1/predmeti/:id', (req, res) => {
    const id = req.params.id;
    predmeti.findByPk(id)
      .then(predmet => {
        res.send(predmet);
      });
  });

  // kreira jedan predmet
  app.post('/v1/predmeti', (req, res) => {
    const id = req.body.id;
    const naziv = req.body.naziv;
    predmeti.create({
      id: id,
      naziv: naziv
    })
      .then(novipredmet => {
        res.json(novipredmet);
      })
  });

  // updejtuje predmet po idu
  app.put('/v2/predmeti/:id', (req, res) => {
    const id = req.params.id;
    predmeti.update({ naziv: req.params.naziv },
      { where: { id: id } }
    ).then(() => {
      res.status(200).send("Uspješno ažuriran predmet sa id-em: " + id);
    });
  });

  // brise predmet po idu
  app.delete('/v1/predmeti/:id', (req, res) => {
    const id = req.params.id;
    predmeti.destroy({
      where: { id: id }
    })
      .then(() => {
        res.status(200).send('Uspješno obrisan  predmet sa id-em: ' + id);
      });

  });
};