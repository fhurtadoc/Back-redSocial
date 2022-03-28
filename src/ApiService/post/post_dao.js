const pool=require('../../CONEXIONsql/sql');

const INSERT_POST='INSERT INTO Post set ?';
const SELECT_POST='SELECT * FROM Post WHERE id_user=?';

module.exports={
    
    async create_post(post_model,  done){
        pool.query(INSERT_POST, post_model, (err, res)=>{
            if(err){
                done(err);
            }else{
                done(res);
            }
        })
    }, 

    async list_postXid(id_post, done){
        pool.query(SELECT_POST, id_post, (err, res)=>{
            if(err){
                done(err);
            }else{
                done(res);
            }
        })
    }
    
}