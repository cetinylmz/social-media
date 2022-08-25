const Comment = require("../../../../Models/Comment");


const Post = {
  comments: async (parent, args) => await Comment.find({ post : parent.id }),
};

module.exports.Post = Post;
