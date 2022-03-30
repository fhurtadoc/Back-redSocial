const pool = require("../../CONEXIONsql/sql");

const FIND_USER = "SELECT * FROM Users WHERE email=?";
const INSERT = "INSERT INTO Users set ?";
const INSERTIMG = "INSERT INTO perfil_img set ?";
const ASOCIMG = "INSERT INTO img_pefilasoc set ?";
const UPDATEPASS = "UPDATE Users SET password=? WHERE id_user=?";
const SELECT_FRIENDS =
  "select * from friends f  inner join users u on f.id_friends = f.id_user where f.id_user = ?";
const INSER_FRIEND = "INSERT INTO friends set ?";
module.exports = {
  async find_user(email, done) {
    pool.query(FIND_USER, email, (err, res) => {
      if (err) {
        done(err);
      } else {
        done(res);
      }
    });
  },

  async createUser(new_user, done) {
    pool.query(INSERT, new_user, (err, res) => {
      if (err) {
        done(err);
      } else {
        done(res);
      }
    });
  },

  async edit_pass(id, password, done) {
    pool.query(UPDATEPASS, [password, id], (err, res) => {
      if (err) {
        done(err);
      } else {
        done(res);
      }
    });
  },

  async edit_image(path_img, done) {
    pool.query(INSERTIMG, { path_img: path_img }, (err, res) => {
      if (err) {
        done(err);
      } else {
        done(res);
      }
    });
  },

  async asoc_img(img_pefilasoc, done) {
    pool.query(ASOCIMG, img_pefilasoc, (err, res) => {
      if (err) {
        done(err);
      } else {
        done(res);
      }
    });
  },
  async listfriend(id_user, done) {
    pool.query(SELECT_FRIENDS, id_user, (err, res) => {
      if (err) {
        done(err);
      } else {
        done(res);
      }
    });
  },

  async asocFriend(friend, done) {
    pool.query(INSER_FRIEND, friend, (err, res) => {
      if (err) {
        done(err);
      } else {
        done(res);
      }
    });
  },

  async findFriend(email, done) {
    pool.query(
      "SELECT * FROM users WHERE email LIKE" + "'%" + email + "%'",
      (err, res) => {
        if (err) {
          done(err);
        } else {
          done(res);
        }
      }
    );
  },
};
