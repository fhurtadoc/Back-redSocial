class Post {
  constructor(id_user, description, img, date) {
    this.id_user = id_user;
    this.description = description;
    this.img = img;
    this.date = new Date();
  }
}
module.exports = Post;
