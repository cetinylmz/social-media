const { UserInputError } = require("apollo-server-express");
const bcrypt = require("bcryptjs");

const User = require("../../../Models/User");

const {
  validateRegisterInput,
  validateLoginInput,
} = require("../../../Utils/vaildators");
const Token = require("../../../Utils/Token");

const Mutation = {
  register: async (parent, { data }) => {
    //blank and email check
    const { valid, errors } = validateRegisterInput({ ...data });
    if (!valid) {
      throw new UserInputError("Errors ", { errors });
    }

    // hash password and create an auth token
    password = await bcrypt.hash(data.password, 12);

    //register
    const newUser = new User({
      ...data,
      password,
    });

    const res = await newUser.save();
    const token = Token.generate(res);
    return { ...res._doc, id: res._id, token };
  },

  login: async (parent, { data }) => {
    //blank and email check
    const { valid, errors } = validateLoginInput({ ...data });
    if (!valid) {
      throw new UserInputError("Errors ", { errors });
    }

    //email and password check
   
    const email = await User.findOne({email:data.email});
    if (!email) {
      throw new Error("Not found Email");
    }
    //email and password check
    const match = await bcrypt.compare(data.password, email.password);
    if (!match) {
      throw new Error("Not found Password");
    }

    const token = Token.generate(email);
    return { ...email._doc, id: email._id, token };
  },
};

module.exports.Mutation = Mutation;
