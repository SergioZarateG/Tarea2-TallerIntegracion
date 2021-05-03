require('dotenv').config();


//const { native } = require('pg');
const Sequelize = require('sequelize');

const sequelize = new Sequelize(
    process.env.DB_DATABASE,
    process.env.DB_USERNAME,
    process.env.DB_PASSWORD,
    {
        host: process.env.DB_HOST,
        dialect: 'postgres',
        pool:{
            max: 10,
            min: 0,
            require: 30000,
            idle: 10000
        },
        logging: false,
        dialectOptions: {
            ssl: {
                require: true,
                rejectUnauthorized: false
            }
        }  
    }
)

module.exports = {
    sequelize
}
