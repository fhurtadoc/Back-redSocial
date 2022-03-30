const user_dao = require("./user_dao");
const user_model = require("./user_model");
const user_dto = require("./user_dto");
const encrypt = require("../../helpers/encrypt");
const jwt = require("jsonwebtoken");

module.exports = {
  async logup(req, res) {
    console.log(req.body.email);
    if (!req.body.email) return res.sendStatus(400);
    if (!req.body.nickname) return res.sendStatus(400);
    if (!req.body.password) return res.sendStatus(400);
    if (!req.body.status) return res.sendStatus(400);

    let email = req.body.email;
    let nickname = req.body.nickname;
    let password = req.body.password;
    let status = req.body.status;

    password_encrypt = await encrypt.encryptPassword(password);

    let new_user = new user_model(email, nickname, password_encrypt, status);

    user_dao.createUser(new_user, async (new_user, err) => {
      if (err) return res.send({ menssaje: "error en query", codigo: 404 });
      if (new_user)
        return res.send({ menssaje: "Creado correctamente", codigo: 200 });
    });
  },

  async login(req, res) {
    console.log(req.body);
    if (!req.body.email) return res.sendStatus(400);
    let email = req.body.email;
    let password_insert = req.body.password;
    user_dao.find_user(email, async (user, err) => {
      if (err) return res.send({ menssaje: "error en query", codigo: 402 });
      if (user.length <= 0)
        return res.send({ menssaje: "el correo no existe", codigo: 402 });
      if (user) {
        let validPassword = await encrypt.matchPassword(
          password_insert,
          user[0].password
        );
        if (!validPassword) {
          return res.send({ menssaje: "contraseña es incorrecta" });
        } else {
          const token = await jwt.sign(
            { user: user_dto.single(user[0], req.users) },
            "process.env.TOKEN_FORGOT"
          );
          //console.log(user_dto.single(user, req.users));
          //console.log(jwt.decode(token,'process.env.TOKEN_FORGOT'));
          return res.send({ token: token, codigo: 200 });
        }
      }
    });
  },

  async edit_pass(req, res) {
    var id = req.params.id;
    if (!req.body.new_password) return res.sendStatus(400);
    if (!id) return res.sendStatus(400);
    password_encrypt = await encrypt.encryptPassword(req.body.new_password);
    user_dao.edit_pass(id, password_encrypt, async (passedit, res) => {
      if (err) return res.send({ menssaje: "error en query", codigo: 402 });
      if (passedit)
        return res.send({ menssaje: "modificado correctamente", codigo: 200 });
    });
  },

  async edit_image(req, res) {
    if (!req.files.perfilImg.path) return res.sendStatus(400);
    if (!req.params.id) return res.sendStatus(400);

    var filePath = req.files.perfilImg.path;
    var fileSplit = filePath.split("/");
    var path_img = fileSplit[3];
    var id = req.params.id;
    user_dao.edit_image(path_img, async (res, err) => {
      if (res) {
        console.log(res.insertId);
        var img_pefilasoc = {
          id_user: id,
          id_img: res.insertId,
        };
        user_dao.asoc_img(img_pefilasoc, (res_asoc, err) => {
          if (res_asoc)
            return res.send({
              menssaje: "modificado correctamente",
              codigo: 200,
            });
          if (err) return res.send({ menssaje: "error en query", codigo: 402 });
        });
      }
      if (err) return res.send({ menssaje: "error en query", codigo: 402 });
    });
  },
  async listfriend(req, res) {
    var id_user = req.params.id_user;
    user_dao.listfriend(id_user, (res_friend, err) => {
      if (res_friend) {
        if (res_friend) return res.send(user_dto.multiple(res_friend, req.res));
      }
      if (err) return res.send({ menssaje: "error en query", codigo: 402 });
    });
  },
  async crear_friends(req, res) {
    if (!req.body.friend) return res.sendStatus(400);
    if (!req.body.id_user) return res.sendStatus(400);
    var friend = {
      id_friends: req.body.friend,
      id_user: req.body.id_user,
    };

    user_dao.asocFriend(friend, (res_fiend, err) => {
      if (res_fiend) {
        if (res_fiend)
          return res.send({ menssaje: "ya tienes un amigo", codigo: 402 });
      }
      if (err) return res.send({ menssaje: "error en query", codigo: 402 });
    });
  },

  async findFriend(req, res) {
    console.log(req.body.email);
    if (!req.body.email) return res.sendStatus(400);
    var email = req.body.email;
    user_dao.findFriend(email, (res_friends, err) => {
      
      if (res_friends) {
        return res.send(user_dto.multiple(res_friends, req.res));
      }
      if (res_friends.length === 0)
        return res.send({ menssaje: "no tienes amigos", codigo: 204 });
      if (err) return res.send({ menssaje: "error en query", codigo: 402 });
    });
  },
};
