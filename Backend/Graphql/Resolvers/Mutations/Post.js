const Post = require("../../../Models/Post");
const Token = require("../../../Utils/Token");
const Mutation = {
  createPost: async (parent, { data }, context) => {
   
    const user = Token.checkAuth(context);

    const newPost = new Post({
      ...data,
      user: user.id,
    });
    return await newPost.save();
  },

  deletePost: async (parent, { id }, context) => {
    const user = Token.checkAuth(context);
    const newPost = await Post.findById(id);
    if (user.id == newPost.user) {
      return await Post.findByIdAndDelete(id);
    }
  },
};

module.exports.Mutation = Mutation;
