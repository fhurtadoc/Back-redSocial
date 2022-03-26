
const user_dao=require('./user_dao');
const user_model=require('./user_model');
const user_dto=require('./user_dto');
const encrypt= require('../../helpers/encrypt');
const jwt = require('jsonwebtoken');


module.exports = {


    async logup(req, res){
        if (!req.body.email) return res.sendStatus(400);
        if (!req.body.nickname) return res.sendStatus(400);
        if (!req.body.password)  return res.sendStatus(400);
        if (!req.body.status)  return res.sendStatus(400);
        
        let email =req.body.email;        
        let nickname=req.body.nickname;        
        let password=req.body.password;
        let status=req.body.status;

        password_encrypt = await encrypt.encryptPassword(password);
        
        let new_user=new user_model(email,nickname,password_encrypt, status);

        user_dao.createUser(new_user, async (new_user, err)=>{
            if(err) return res.send({menssaje:"error en query", codigo: 404})
            if(new_user)return res.send({menssaje:"Creado correctamente", codigo:200});
        })
    },

    async login(req, res){
        if (!req.body.email) return res.sendStatus(400);        
        let email=req.body.email;                
        let password_insert=req.body.password;                
        user_dao.find_user( email,  async (user, err)=>{
            console.log(user); 
            if(err) return res.send({menssaje:"error en query", codigo: 402});
            if(user.length<=0) return res.send({menssaje:"el correo no existe", codigo: 402});
            if(user){
                let validPassword= await encrypt.matchPassword(password_insert, user[0].password);
                    if(!validPassword){
                    return res.send({menssaje: 'contraseña es incorrecta'});
                }else{

                    const token= await jwt.sign({user: user_dto.single(user, req.users)}, 'process.env.TOKEN_FORGOT');
                    return res.send({token});
                }
            }
        })
    }, 

    async edit_pass(req, res){
        var id=req.params.id
        if (!req.body.password) return res.sendStatus(400);
        if (!id) return res.sendStatus(400);

    },

    async edit_image(req, res){        
        if(req.files.cover.path){
            let filePath=req.files.cover.path;        
            let fileSplit = filePath.split("/");
            fileName = fileSplit[3];
        } 
        var id=req.params.id
        if (!fileName) return res.sendStatus(400);
        if (!id) return res.sendStatus(400);
        user_dao.edit_image(id, fileName, async(user, res)=>{
            if(err) return res.send({menssaje:"error en query", codigo: 402});
            if(user)return res.send({menssaje:"cargado correctamente", codigo:200});
        })
        
    }

    
}