class Model{
    constructor(){
        const express = require('express');
        const session = require('express-session');
        const app = express();
        app.use(session({
            secret: 'usingRedisSessionStorage',
            name: 'redis',
            resave: false,
            saveUninitialized: true,
            cookie: { secure: false }, // Note that the cookie-parser module is no longer needed
        }));
        this.session = session;
        let y = {
            first_name: 'Halla',
            last_name: 'Conley',
            email: 'byxa@mailinator.com',
            password: 'asdfasdf'
        }
    }
    fetchRows(table_name){
        return new Promise((resolve, reject)=>{
            try{
                const MongoClient = require('mongodb').MongoClient;
                let db_config = require('../config');
                let connection_string = `${db_config.server}://${db_config.host}:${db_config.port}/${db_config.database}`;
                MongoClient.connect(connection_string, {useUnifiedTopology: true},
                    function(err, client){
                        if (err) throw err
                    
                        var db = client.db(db_config.database);
                        db.collection(table_name).find().toArray(function (err, result) {
                            if (err) throw err
                            return resolve(result);
                        })
                    });
            }catch(err){
                return reject(err);
            }
        });
    }
    
    fetchRow(table_name, where){
        return new Promise((resolve, reject)=>{
            try{
                const MongoClient = require('mongodb').MongoClient;
                let db_config = require('../config');
                let connection_string = `${db_config.server}://${db_config.host}:${db_config.port}/${db_config.database}`;
                MongoClient.connect(connection_string, {useUnifiedTopology: true},
                    function(err, client){
                        if (err) throw err
                    
                        var db = client.db(db_config.database);
                        db.collection(table_name).find(where).toArray(function (err, result) {
                            if (err) throw err
                            return resolve(result);
                        })
                    });
            }catch(err){
                return reject(err);
            }
        });
    }

    insertRow(table_name, insert){
        return new Promise((resolve, reject)=>{
            try{
                const MongoClient = require('mongodb').MongoClient;
                let db_config = require('../config');
                let connection_string = `${db_config.server}://${db_config.host}:${db_config.port}/${db_config.database}`;
                MongoClient.connect(connection_string, {useUnifiedTopology: true},
                    function(err, client){
                        if (err) throw err
                    
                        var db = client.db(db_config.database);
                        
                        db.collection(table_name).insertOne(insert);
                    });
            }catch(err){
                return reject(err);
            }
        });
    }
}
module.exports = Model;