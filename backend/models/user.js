const mongoose = require("mongoose");
const schema = mongoose.Schema;

const userSchema = new schema(
  {
    username: { type: String, required: true },
    mail: { type: String, required: true, unique: true },
    password: { type: String },
    friends: [{ type: schema.Types.ObjectId, ref: "User" }],
  },
  { collection: "User" }
);

module.exports = mongoose.model("User", userSchema);
