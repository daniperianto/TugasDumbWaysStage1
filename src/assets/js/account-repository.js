const config = require('../config/config.json');
const { Sequelize, QueryTypes, DataTypes } = require("sequelize");
const sequelize = new Sequelize(config.development);
const Account = require("./account.js");
const { query } = require("express");
const users = require("../models/users.js")(sequelize, DataTypes);


const AccountRepository = class {
    constructor () {}

    async findAll() {
        try {
            query = "SELECT * FROM users";
            let users = await sequelize.query(query, {type: QueryTypes.SELECT});
            this.usersArray = [];
            users.forEach( (user) => {
                this.usersArray.push(new Account(user, true));
            })
            return this.usersArray;            
        } catch (error) {
            console.log(error);
        }
    }

    async addAccount(account) {
        try {
            const query = `INSERT INTO users (username, email, password, "createdAt", "updatedAt") VALUES ('${account.username}', '${account.email}', '${account.password}', NOW(), NOW());`
            await sequelize.query(query, {type: QueryTypes.INSERT});
        } catch (error) {
            console.log(error);
        }

    }

    async getAccountById(id) {
        try {
            const query = `SELECT * FROM users WHERE id = ${id}`;
            let account = await sequelize.query(query, {type: QueryTypes.SELECT});
            return new Account(account[0], true);
        } catch (error) {
            console.log(error);
        }
    }

    async getAccountByEmail(email) {
        try {
            const query = `SELECT * FROM users WHERE email = '${email}'`;
            let account = await sequelize.query(query, {type: QueryTypes.SELECT});
            return new Account(account[0], true);
        } catch (error) {
            console.log(error);
        }
    }


    async deleteAccountById(id) {
        try {
            const query = `DELETE FROM users WHERE id = ${id}`
            await sequelize.query(query, {type: QueryTypes.DELETE})
        } catch (error) {
            console.log(error);
        }
    }

}

module.exports = AccountRepository;