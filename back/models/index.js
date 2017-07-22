/**
 * Created by cuckoo on 2017/5/25.
 */
var fs= require('fs');
var path= require('path');
var Sequelize = require('sequelize');
var basename  = path.basename(module.filename);
var db= {};

var DbConnection =require('../helpers/db-connection');
var sequelize= new DbConnection().sequelize;

//Load all the models
fs
    .readdirSync(__dirname)
    .filter(function(file) {
        return (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js');
    })
    .forEach(function(file) {
            var model = sequelize['import'](path.join(__dirname, file));
            db[model.name] = model;
    });

Object.keys(db).forEach(function(modelName) {
    if (db[modelName].associate) {
        db[modelName].associate(db);
    }
});

//Export the db Object
db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;