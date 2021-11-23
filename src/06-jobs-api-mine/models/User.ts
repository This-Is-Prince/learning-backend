import { Schema, model } from "mongoose";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { env } from "process";

const UserSchema = new Schema({
  name: {
    type: String,
    required: [true, "Please provide name..."],
    minlength: 3,
    maxlength: 50,
  },
  email: {
    type: String,
    required: [true, "Please provide email..."],
    match: [
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
      "Please provide valid email...",
    ],
    unique: true,
  },
  password: {
    type: String,
    required: [true, "Please provide password..."],
    minlength: 3,
  },
});

UserSchema.pre("save", async function () {
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});
UserSchema.methods.createJWT = function () {
  return jwt.sign({ userId: this._id, name: this.name }, env.JWT_SECRET, {
    expiresIn: env.JWT_LIFETIME,
  });
};
UserSchema.methods.comparePassword = function (reqPassword: string) {
  return bcrypt.compare(reqPassword, this.password);
};

export default model("User", UserSchema);