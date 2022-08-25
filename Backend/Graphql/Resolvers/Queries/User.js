const User = require("../../../Models/User");

const Query = {
  getUsers: async () => {
    const users = await User.find({});
    return users;
  },
  getUser: async (parent, args) => {
    const users = await User.findById(args.id);
    return users;
  },
};

module.exports.Query = Query;
