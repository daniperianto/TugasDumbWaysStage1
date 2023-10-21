const bcrypt = require('bcrypt');
const saltRounds = 10;

const Account = class {

    constructor(json, isHashPassword) {
        this.id = json.id;
        this.username = json.username;
        this.email = json.email;
        if(isHashPassword) {
            this.password = json.password;
        } else {
            this.password = this.bcryptHash(json.password);
        }
        
    }

    bcryptHash(password) {
        return bcrypt.hashSync(password, saltRounds);
    }

    isRightPassword(plainPassword) {
        return bcrypt.compareSync(plainPassword, this.password);
    }
}

module.exports = Account;