class Database{
    constructor(){
        this.host = 'localhost';
        this.server = 'mongodb';
        this.user = 'postgres';
        this.pass = '';
        this.port = '27017';
        this.database = 'express_login_and_registration';
    }
}
module.exports = new Database;