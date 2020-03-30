const mongoose = require('mongoose');
require('dotenv').config({path:'variables.env'});

const conectarDB = async () => {
    try{
     //   const BD_HOST="localhost"
     //   const BD_PORT="27018"
     //   const BD_NAME="dbMERN"
     //   const  BD_USER="admin"
    //    const BD_PASS="admin"
        const BD_URL = process.env.BD_HOST + ':' + process.env.BD_PORT + '/' + process.env.BD_NAME;
        var connectionStr = 'mongodb://' + process.env.BD_USER + ':' + process.env.BD_PASS + '@' + BD_URL;

//TODO corregir el variables.env que no lo toma y llega como UNDEFINED
//        var connectionStr = 'mongodb://'+ process.env.BD_USER+process.env + ':' + process.env.BD_PASS + '@' + BD_URL

        await mongoose.connect(connectionStr, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useFindAndModify:false
        })
        console.log('DB Conectada');

    } catch(error){
        console.log(error);
        process.exit(1); // Detener la app
    }
}
//
module.exports = conectarDB;