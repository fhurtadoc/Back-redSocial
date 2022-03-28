
const Post_dao=require('./post_dao');
const Post_model=require('./post_model');
const Post_dto=require('./post_dto');


module.exports = {

    async create_post(req, res){

        if(!req.files.cover.path)return res.sendStatus(400);
        if (!req.body.id_user) return res.sendStatus(400);
        if (!req.body.description) return res.sendStatus(400);        
        if (!req.body.img) return res.sendStatus(400);        
        
        var filePath=req.files.cover.path; 
        var fileSplit = filePath.split("/");
        var fileName = fileSplit[3];
        var id_user=req.body.id_user
        var description=req.body.description
        var img=fileName
        var post_model=new Post_model(id_user, description, img);
        Post_dao.create_post(post_model, (res, err)=>{
            if(res){
                console.log(res);
            }
            if(err){
                console.log(err);
            }
        })
    }, 

    async list_postXid(req, res){
        if (!req.body.id_user) return res.sendStatus(400);
        var id_user=req.body.id_user;
        Post_dao.list_postXid(id_user, (res, err)=>{
            if(res){
                console.log(res);
            }
            if(err){
                console.log(err);
            }
        })
    },

    async list_comentsXpost(req, res){
        
    },

    async likes(req, res){
        
    }
}
