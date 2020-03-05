const CONFIG_BANCO = require('../conf-app/bancoDados');
const Sequelize = require('sequelize');

const sequelize = new Sequelize(
    CONFIG_BANCO.table.name_database, 
    CONFIG_BANCO.user.name, 
    CONFIG_BANCO.user.pass, 
    {
        host: CONFIG_BANCO.table.host,
        dialect: CONFIG_BANCO.table.dialect
    }
)

module.exports = {
    Sequelize: Sequelize,
    sequelize: sequelize
}