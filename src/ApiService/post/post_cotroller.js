
const Post_dao=require('./post_dao');
const Post_model=require('./post_model');
const Post_dto=require('./post_dto');


module.exports = {

    async create_post(req, res){
        if(!req.files.img.path)return res.sendStatus(400);
        if (!req.body.id_user) return res.sendStatus(400);
        if (!req.body.description) return res.sendStatus(400);
        var filePath=req.files.img.path; 
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
    
    async create_coment(req, res){
        if (!req.body.coment) return res.sendStatus(400);
        if (!req.body.id_user) return res.sendStatus(400);
        var coment=req.body.coment
        var id_user=req.body.id_user
        var id_post=req.params.id_post
        var coment={
            coment:coment,
            id_user:id_user
        }
        console.log(coment);
        Post_dao.create_coment(coment, (res, err)=>{
            if(res){
                console.log(res);
                var asoc_coment={
                    id_coment:res.insertId,
                    id_post:id_post
                }                
                Post_dao.coment_asocs(asoc_coment, (res, err)=>{
                    if(res){
                        console.log(res);
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
    },

    async list_comentsXpost(req, res){
        if (!req.params.id_post) return res.sendStatus(400);
        var id_post=req.params.id_post;
        Post_dao.list_comentsXpost(id_post, (res, err)=>{
            if(res){
                console.log(res);
            }
            if(err){
                console.log(err);
            }
        })
    },

    async likes(req, res){
        
    }
}
