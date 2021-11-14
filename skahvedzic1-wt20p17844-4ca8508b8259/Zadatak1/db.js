'use strict';
const { Sequelize } = require('sequelize');
const sequelize = new Sequelize('wt2017844', 'root', 'root', {
   host: '127.0.0.1',
   dialect: 'mysql'
});

module.exports = sequelize;

//Spojimo sve modele u jedan objekt preko kojeg ćemo pristupati
const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;



db.predmeti = require('../Zadatak1/modelPredmet.js')(sequelize, Sequelize);
db.aktivnosti = require('../Zadatak1/modelAktivnost.js')(sequelize, Sequelize);
db.dani = require('../Zadatak1/modelDan.js')(sequelize, Sequelize);
db.grupe = require('../Zadatak1/modelGrupa.js')(sequelize, Sequelize);
db.tipovi = require('../Zadatak1/modelTip.js')(sequelize, Sequelize);
db.studenti = require('../Zadatak1/modelStudent.js')(sequelize, Sequelize);



//Relacije:
//Predmet 1-N Grupa
db.grupe.belongsTo(db.predmeti);

//Aktivnost N-1 Predmet
db.predmeti.hasMany(db.aktivnosti, { foreignKey: { allowNull: false } });
db.aktivnosti.belongsTo(db.predmeti);

//Aktivnost N-0 Grupa
db.grupe.hasMany(db.aktivnosti);
db.aktivnosti.belongsTo(db.grupe);

//Aktivnost N-1 Dan
db.dani.hasMany(db.aktivnosti, { foreignKey: { allowNull: false } });
db.aktivnosti.belongsTo(db.dani);

//Aktivnost N-1 Tip
db.tipovi.hasMany(db.aktivnosti, { foreignKey: { allowNull: false } });

//Grupe N-M Student
//db.studenti.belongsToMany(db.grupe, {through: 'studenti'});

module.exports = db;