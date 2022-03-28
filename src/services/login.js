
const jwt = require('jsonwebtoken');
const controller_user= require('../ApiService/users/user_controller')

/**
 * @author  Fabio Alejandro <fabiohurtadoc@gmail.com>
 * @description funcion que permite hacer el login  
 * recibe el request y ejecuta una funcion de passport que va a estar en ./passport.js 
 * @return retorna codigo 200 se registro correctamente el usuario y un 400 si no se pudo hacer el registro
 * si notan es un callback que tiene un donde al final con la res con un token. 
 * 
*/
module.exports = {

    async login (req, res){                
        let user=controller_user.login(req, res);
        
    }, 

    async logup (req, res){        
        let user=controller_user.logup(req, res);
    }, 

}