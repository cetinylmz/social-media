const Comment = require("../../../Models/Comment");
const Token = require("../../../Utils/Token");
const Mutation = {
  createComment: async (parent, { data }, context) => {
    const user = Token.checkAuth(context);

    const newComment= new Comment({
      ...data,
      user: user.id,
    });
    return await newComment.save();
  },

  deleteComment: async (parent, { id }, context) => {
    const user = Token.checkAuth(context);
    const newPost = await Post.findById(id);
    if (user.id == newPost.user) {
      return await Post.findByIdAndDelete(id);
    }
  },
};

module.exports.Mutation = Mutation;
