const pool = require("../../CONEXIONsql/sql");

const INSERT_POST = "INSERT INTO Post set ?";
const SELECT_POST = "SELECT * FROM Post WHERE id_user=? ORDER BY id_post DESC";
const LIST_COMENTS =
  "SELECT * FROM post_coments pc inner join coments c on c.id_coment =pc.id_coment WHERE id_post=?";
const INSERT_COMENT = "INSERT INTO coments SET ?";
const INSERT_COMENTS_ASOC = "INSERT INTO post_coments SET ?";

module.exports = {
  async create_post(post_model, done) {
    pool.query(INSERT_POST, post_model, (err, res) => {
      if (err) {
        done(err);
      } else {
        done(res);
      }
    });
  },

  async list_postXid(id_post, done) {
    pool.query(SELECT_POST, id_post, (err, res) => {
      if (err) {
        done(err);
      } else {
        done(res);
      }
    });
  },

  async list_comentsXpost(id_post, done) {
    pool.query(LIST_COMENTS, id_post, (err, res) => {
      if (err) {
        done(err);
      } else {
        done(res);
      }
    });
  },

  async create_coment(coment, done) {
    pool.query(INSERT_COMENT, coment, (err, res) => {
      if (err) {
        done(err);
      } else {
        done(res);
      }
    });
  },
  async coment_asocs(asoc_coment, done) {
    pool.query(INSERT_COMENTS_ASOC, asoc_coment, (err, res) => {
      if (err) {
        done(err);
      } else {
        done(res);
      }
    });
  },
};
