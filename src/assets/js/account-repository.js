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
            let users = await users.findAll();
            this.usersArray = [];
            usernames.forEach( (user) => {
                this.usersArray.push(new Account(user, true));
            })
            return this.usersArray;            
        } catch (error) {
            console.log(error);
        }
    }

    async addAccount(account) {
        try {
            await users.create({
                username: account.username,
                email: account.email,
                password: account.password,
                createdAt: new Date(),
                updatedAt: new Date()
            });
        } catch (error) {
            console.log(error);
        }

    }

    async getAccountById(id) {
        try {
            let username = await users.findByPk(id);
            return new Account(username, true);
        } catch (error) {
            console.log(error);
        }
    }

    async getAccountByEmail(email) {
        try {
            let account = await users.findOne({
                where: {
                    email: email
                }
            });
            return new Account(account, true);
        } catch (error) {
            console.log(error);
        }
    }


    async deleteAccountById(id) {
        try {
            await users.destroy({
                where: {
                    id: id
                }
            });
        } catch (error) {
            console.log(error);
        }
    }

}

module.exports = AccountRepository;