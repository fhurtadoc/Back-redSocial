const pool=require('../../CONEXIONsql/sql');

const FIND_USER =('SELECT * FROM Users WHERE email=?');
const INSERT=('INSERT INTO Users set ?');

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
    }
}