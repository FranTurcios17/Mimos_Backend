'use strict';

const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');
const process = require('process');
const basename = path.basename(__filename);
const env = process.env.NODE_ENV || 'development';
const config = require(__dirname + '/../config/config.json')[env];
const db = {};

let sequelize;
if (config.use_env_variable) {
  sequelize = new Sequelize(process.env[config.use_env_variable], config);
} else {
  sequelize = new Sequelize(config.database, config.username, config.password, config);
}

fs
  .readdirSync(__dirname)
  .filter(file => {
    return (
      file.indexOf('.') !== 0 &&
      file !== basename &&
      file.slice(-3) === '.js' &&
      file.indexOf('.test.js') === -1
    );
  })
  .forEach(file => {
    const model = require(path.join(__dirname, file))(sequelize, Sequelize.DataTypes);
    db[model.name] = model;
  });

Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.Role = require('./role')(sequelize,Sequelize.DataTypes);
db.User = require('./user')(sequelize,Sequelize.DataTypes);
db.Costumer = require('./costumer')(sequelize,Sequelize.DataTypes);
db.BCostumer = require('./bcostumer')(sequelize,Sequelize.DataTypes);
db.Admin = require('./admin')(sequelize,Sequelize.DataTypes);
db.Product = require('./product')(sequelize,Sequelize.DataTypes);
db.SpecialPrice = require('./specialprice')(sequelize,Sequelize.DataTypes);

db.Role.hasMany(db.User,{
  foreignKey: 'role_id'
});
db.User.belongsTo(db.Role,{
  foreignKey: 'role_id'
});

db.User.hasOne(db.Costumer,{
  foreignKey: 'id_user'
});
db.Costumer.belongsTo(db.User,{
  foreignKey: 'id_user'
});

db.User.hasOne(db.BCostumer,{
  foreignKey: 'id_user'
});
db.BCostumer.belongsTo(db.User,{
  foreignKey: 'id_user'
});

db.User.hasOne(db.Admin,{
  foreignKey: 'id_user'
});
db.Admin.belongsTo(db.User,{
  foreignKey: 'id_user'
});

db.BCostumer.hasMany(db.SpecialPrice,{
foreignKey: 'id_client'
});
db.SpecialPrice.belongsTo(db.BCostumer,{
  foreignKey: 'id_client'
});

db.Product.hasMany(db.SpecialPrice,{
  foreignKey: 'id_product'
  });
  db.SpecialPrice.belongsTo(db.Product,{
    foreignKey: 'id_product'
  });


db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
