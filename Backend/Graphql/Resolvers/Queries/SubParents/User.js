const Post = require("../../../../Models/Post");


const User = {
  posts: async (parent, args) => await Post.find({ user: parent.id }),
};

module.exports.User = User;
