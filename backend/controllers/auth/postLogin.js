const User = require("../../models/user");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const login = async (req, res) => {
  try {
    const { mail, password } = req.body;

    // check if user mail exists
    const user = await User.findOne({ mail: mail.toLowerCase() });
    if (user && (await bcrypt.compare(password, user.password))) {
      // create jwt token
      const token = jwt.sign(
        { userId: user._id, mail: user.mail },
        process.env.TOKEN_KEY,
        {
          expiresIn: "24h",
        }
      );
      return res.status(201).json({
        userDetails: {
          _id: user._id,
          mail: user.mail,
          username: user.username,
          token,
        },
      });
    }
    return res.status(400).send("Invalid credentials. Please try again");
  } catch (error) {
    return res.status(500).send("error occured.please try again later");
  }
};

module.exports = login;
