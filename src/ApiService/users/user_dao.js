const pool=require('../../CONEXIONsql/sql');
const { edit_image } = require('./user_controller');

const FIND_USER =('SELECT * FROM Users WHERE email=?');
const INSERT=('INSERT INTO Users set ?');
const INSERTIMG=('INSERT INTO perfil_img set ?');
const ASOCIMG=('INSERT INTO img_pefilasoc set ?');
const UPDATEPASS=('UPDATE Users SET password=? WHERE id_user=?');

module.exports={
    
    async find_user(email,  done){
        pool.query(FIND_USER, email, (err, res)=>{
            if(err){
                done(err);
            }else{
                done(res);
            }
        })
    }, 

    async createUser(new_user, done){
        pool.query(INSERT, new_user, (err, res)=>{
            if(err){
                done(err);
            }else{
                done(res);
            }
        })
    }, 

    async edit_pass(id, password){
        pool.query(UPDATEPASS, [password, id], (err, res)=>{
            if(err){
                done(err);
            }else{
                done(res);
            }
        })
    },

    async edit_image(image){
        pool.query(INSERTIMG, image, (err, res)=>{
            if(err){
                done(err);
            }else{
                done(res);
            }
        })
    },

    async asoc_img(id_user, id_img){
        pool.query( ASOCIMG,  [id_user, id_img], (err, res)=>{
            if(err){
                done(err);
            }else{
                done(res);
            }
        })
    }
}