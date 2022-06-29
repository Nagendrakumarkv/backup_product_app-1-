const User = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

exports.createUser=(req, res, next) => {
  bcrypt.hash(req.body.password, 10).then((hash) => {
    const user = new User({
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      date: req.body.date,
      email: req.body.email,
      password: hash,
      confirmPassword: hash,
    });
    user
      .save()
      .then((result) => {
        res.status(201).json({
          message: "User Created",
          result: result,
        });
      })
      .catch((err) => {
        res.status(500).json({
        message:"Invalid authentication credentials!",
        });
      });
  });
}

exports.loginUser=(req, res, next) => {
  let fetchedUser;
User.findOne({ email: req.body.email })
  .then(user => {
    if (!user) {
      return res.status(401).json({
        message: "Invalid Email"
      });
    }
    fetchedUser = user;
    return bcrypt.compare(req.body.password, user.password);
  })
  .then(result => {
    if (!result) {
      return res.status(401).json({
        message: "Invalid password"
      });
    }
    const token = jwt.sign(
      { email: fetchedUser.email, userId: fetchedUser._id },
      "secret_this_should_be_longer",
      { expiresIn: "1h" }
    );
    res.status(200).json({
      token: token,
      expiresIn: 3600,
      userId:fetchedUser._id
    });
  })
  .catch(err => {
    return res.status(500).json({
      message: "Error while login"
    });
  });
}

exports.getRegisteredUsers=async (req, res) => {
  try {
    const user = await User.find();
    res.status(200).send(user);
  } catch (err) {
    res.status.send(err);
  }

}
