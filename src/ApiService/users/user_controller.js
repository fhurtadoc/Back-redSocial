
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
        if (!req.body.new_password) return res.sendStatus(400);
        if (!id) return res.sendStatus(400);
        password_encrypt = await encrypt.encryptPassword(req.body.new_password);
        user_dao.edit_pass(id, password_encrypt, async(passedit, res)=>{
            if(err) return res.send({menssaje:"error en query", codigo: 402});
            if(passedit)return res.send({menssaje:"modificado correctamente", codigo:200});
        })
    },

    async edit_image(req, res){        
        if (!req.files.cover.path) return res.sendStatus(400);
        if (!req.params.id) return res.sendStatus(400);

        let filePath=req.files.cover.path;        
        let fileSplit = filePath.split("/");
        var fileName = fileSplit[3];
        var id=req.params.id        

        user_dao.edit_image(fileName, async(res, err)=>{
            if(res){
                console.log(res.insertId);
                user_dao.asoc_img(id, res.insertId, (res_asoc, err)=>{
                    if(res_asoc){
                        console.log(res_asoc);
                    }
                    if(err){
                        console.log(err);
                    }
                })
            }
            if(err){
                console.log(err);
            }
        })
        
    }
}