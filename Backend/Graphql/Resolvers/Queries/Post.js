const Post = require("../../../Models/Post");

const Query = {
  getPosts: async (parent, args) => {
    return await Post.find({});
  },
  getPost: async (parent, args) => {
    return await Post.findById(args.id);
  },
};

module.exports.Query = Query;
