const User = require("../../models/user");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const register = async (req, res) => {
  try {
    const { username, mail, password } = req.body;

    // check if user mail exists
    const userExists = await User.exists({ mail: mail.toLowerCase() }); //returns boolean
    if (userExists) return res.status(409).send("email already exists"); //409 means conflict

    // encrypt password and save in db and send jwt token back to client
    const encryptedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      username,
      mail: mail.toLowerCase(),
      password: encryptedPassword,
    });

    const token = jwt.sign(
      { userId: user._id, mail: user.mail },
      process.env.TOKEN_KEY,
      {
        expiresIn: "24h",
      }
    );

    res.status(201).json({
      userDetails: {
        _id: user._id,
        mail: user.mail,
        username: user.username,
        token,
      },
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send("error occured.please try again later");
  }
};

module.exports = register;
