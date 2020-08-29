const mongoose = require("mongoose");
const validator = require("validator");
const jwt = require("jsonwebtoken");
const bcryptjs = require("bcryptjs");

const Schema = mongoose.Schema;

const userSchema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    minlength: 5,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator: function (value) {
        return validator.isEmail(value);
      },
      message: function () {
        return "Invalid email format";
      },
    },
  },
  mobile: {
    //TODO :mobileNumber
    type: String,
    required: true,
    unique: true,
    minlength: 10,
    maxlength: 10,
  },
  password: {
    type: String,
    required: true,
    minlength: 6,
    maxlength: 128,
  },
  tokens: [
    {
      token: {
        type: String,
      },
      createdAt: {
        type: Date,
        default: Date.now(),
      },
    },
  ],
  asMember: [
    // TODO : memberSessions
    {
      session: {
        ref: "Session",
        type: Schema.Types.ObjectId,
      },
      joinedAt: {
        type: Date,
        default: Date.now(),
      },
    },
  ],
  asHost: [
    // TODO : hostedSessions
    {
      session: {
        ref: "Session",
        type: Schema.Types.ObjectId,
      },
      joinedAt: {
        type: Date,
        default: Date.now(),
      },
    },
  ],
});

userSchema.methods.generateToken = function () {
  const user = this;
  const tokenData = {
    _id: user._id,
    username: user.username,
    createdAt: Number(new Date()),
  };
  //Private key
  const token = jwt.sign(tokenData, "jwt@123");
  user.tokens.push({
    token: token,
  });

  return user
    .save()
    .then((user) => {
      return Promise.resolve(token);
    })
    .catch((err) => {
      return Promise.reject(err);
    });
};

userSchema.pre("save", function (next) {
  const user = this;
  if (user.isNew) {
    bcryptjs.genSalt(10).then((salt) => {
      bcryptjs.hash(user.password, salt).then((encryptedPassword) => {
        user.password = encryptedPassword;
        next();
      });
    });
  } else {
    next();
  }
});

userSchema.statics.findByCredentials = function (
  value,
  isEmailOrMobile,
  password
) {
  console.log(isEmailOrMobile, "sfdsfsdfsdfds", value);
  const User = this;
  return User.findOne({ [isEmailOrMobile]: value })
    .then((user) => {
      if (!user) {
        return Promise.reject("Invalid email or password");
      }
      return bcryptjs.compare(password, user.password).then((result) => {
        if (result) {
          return Promise.resolve(user);
        } else {
          return Promise.reject("Invalid email or password");
        }
      });
    })
    .catch((err) => {
      return Promise.reject(err);
    });
};

userSchema.statics.findByToken = function (token) {
  const User = this;
  let tokenData;
  try {
    tokenData = jwt.verify(token, "jwt@123");
  } catch (err) {
    return Promise.reject(err);
  }
  return User.findOne({
    _id: tokenData._id,
    "tokens.token": token,
  });
};

const User = mongoose.model("User", userSchema);

module.exports = {
  User,
};
