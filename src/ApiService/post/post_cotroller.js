const Post_dao = require("./post_dao");
const Post_model = require("./post_model");
const Post_dto = require("./post_dto");
const Coment_dto = require("./Coment_dto");

module.exports = {
  async create_post(req, res) {
    if (!req.files.img.path) return res.sendStatus(400);
    if (!req.body.id_user) return res.sendStatus(400);
    if (!req.body.description) return res.sendStatus(400);
    if (!req.body.date) return res.sendStatus(400);
    var filePath = req.files.img.path;
    var expresionRegular = /\\|[/]/;
    var fileSplit = filePath.split(expresionRegular);
    var fileName = fileSplit[3];
    var id_user = req.body.id_user;
    var description = req.body.description;
    var img = fileName;
    var date = req.body.date;
    var post_model = new Post_model(id_user, description, img, date);

    Post_dao.create_post(post_model, (res_post, err) => {
      console.log(res_post);
      if (res_post)
        return res.send({ menssaje: "Creado Correctamente", codigo: 200 });
      if (err) return res.send({ menssaje: "error en query", codigo: 402 });
    });
  },

  async list_postXid(req, res) {
    if (!req.body.id_user) return res.sendStatus(400);
    var id_user = req.body.id_user;
    Post_dao.list_postXid(id_user, (res_list, err) => {
      console.log(res_list);
      if (res_list) return res.send(Post_dto.multiple(res_list, req.res));
      if (err) return res.send({ menssaje: "error en query", codigo: 402 });
    });
  },

  async create_coment(req, res) {
    if (!req.body.coment) return res.sendStatus(400);
    if (!req.body.id_user) return res.sendStatus(400);
    var coment = req.body.coment;
    var id_user = req.body.id_user;
    var id_post = req.params.id_post;
    var coment = {
      coment: coment,
      id_user: id_user,
    };
    console.log(coment);
    Post_dao.create_coment(coment, (res, err) => {
      if (res) {
        var asoc_coment = {
          id_coment: res.insertId,
          id_post: id_post,
        };
        Post_dao.coment_asocs(asoc_coment, (res_asoc, err) => {
          if (res_asoc)
            return res.send({ menssaje: "Creado Correctamente", codigo: 200 });
          if (err)
            return res.send({
              menssaje: "error en query al asociar comentario",
              codigo: 402,
            });
        });
      }
      if (err) {
        if (err)
          return res.send({
            menssaje: "error en query al crear comentario",
            codigo: 402,
          });
      }
    });
  },

  async list_comentsXpost(req, res) {
    if (!req.params.id_post) return res.sendStatus(400);
    var id_post = req.params.id_post;
    Post_dao.list_comentsXpost(id_post, (res_post, err) => {
      if (res_post) return res.send(Coment_dto.multiple(res_post, req.res));
      if (err) return res.send({ menssaje: "error en query", codigo: 402 });
    });
  },

  async likes(req, res) {},
};
