const Model = require('../lib/Model');
class User extends Model{
    constructor(){
        super();
    }
    async login_process(post_data){
        let doesExist = await this.getDataByEmail(post_data.email);
        if(doesExist){
            if(doesExist[0].password == post_data.password){
                return Promise.resolve(doesExist);
            }
        }else{
            return Promise.resolve(false);
        }
    }
    async registration(post_data){
        let result = await this.getDataByEmail(post_data.email);
        try{
            let result = await this.getDataByEmail(post_data.email);
            if(result.length != 0){
                console.log("Duplicate Email");
            }else{
                let data_to_be_inserted = {
                    firstname: post_data.first_name,
                    lastname: post_data.last_name,
                    email: post_data.email,
                    password: post_data.password
                }
                await this.insertRow("users", data_to_be_inserted);
            }
            return true;
        }catch(err){
            console.log("Error:", err);
        }
        return false;
    }
    async getDataByEmail(email){
        let result = await this.fetchRow("users", {email: email});
        return result;
    }
}
module.exports = new User;