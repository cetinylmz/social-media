const { AuthenticationError } = require("apollo-server-express");
const jwt = require("jsonwebtoken");

const token = {
  generate: (user) => {
    return jwt.sign(
      {
        id: user.id,
        email: user.email,
        fullName: user.fullName,
      },
      process.env.SECRET_KEY,
      { expiresIn: "1h" }
    );
  },
  checkAuth: (context) => {
    // context = { ... headers }
    const authHeader = context.req.headers.authorization;
    if (authHeader) {
      // Bearer ....
      const token = authHeader.split("Bearer ")[1];
      if (token) {
        try {
          const user = jwt.verify(token,  process.env.SECRET_KEY);
          return user;
        } catch (err) {
          throw new AuthenticationError("Invalid/Expired token");
        }
      }
      throw new Error("Authentication token must be 'Bearer [token]");
    }
    throw new Error("Authorization header must be provided");
  },
};

module.exports = token;
