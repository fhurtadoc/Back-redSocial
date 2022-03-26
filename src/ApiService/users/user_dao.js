const pool=require('../../CONEXIONsql/sql');
const { edit_image } = require('./user_controller');

const FIND_USER =('SELECT * FROM Users WHERE email=?');
const INSERT=('INSERT INTO Users set ?');
const UPDATEIMG=('UPDATE Users SET imagen=? WHERE id_user=?');

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

    async edit_image(id, image){
        pool.query(UPDATEIMG, [image, id], (err, res)=>{
            if(err){
                done(err);
            }else{
                done(res);
            }
        })
    }
}