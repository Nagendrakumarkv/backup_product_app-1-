const User = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const _ = require("lodash");

const mailgun = require("mailgun-js");
const DOMAIN = "sandboxf9f7a8d3b5754a7ab1b0e6b486300692.mailgun.org";
const mg = mailgun({ apiKey: process.env.MAILGUN_API_KEY, domain: DOMAIN });

//create user without email account activatioon
// exports.createUser=(req, res, next) => {
// console.log(req.body)
// const {email,password}=req.body;

// User.findOne({email}).exec((err,user)=>{
//   if(user){
//     return res.status(400).json({error:"User with this email already exists.."});
//   }
//   let newUser=new User({email,password});
//   newUser.save((err,success)=>{
//     if(err){
//       return res.status(400).json({error:err})
//     }
//     res.json({message:"Signup success"})
//   })
// })
// }

//signup user with email account activatioon
exports.createUser = (req, res, next) => {
  const { email, password } = req.body;

  User.findOne({ email }).exec((err, user) => {
    if (user) {
      return res
        .status(400)
        .json({ error: "User with this email already exists..please login" });
    }

    const token = jwt.sign(
      { email, password },
      process.env.JWT_ACTIVATE_EMAIL,
      { expiresIn: "20m" }
    );

    const data = {
      from: "noreplay@gmail.com",
      to: email,
      subject: "Account activation link",
      html: `
           <h2>click below link to activate your account</h2>
           <p>${process.env.CLIENT_URL}/auth/activation/activate/${token}</p>
      `,
    };
    mg.messages().send(data, function (error, body) {
      if (error) {
        res.json({
          error: err.message,
        });
      }
      res.json({
        message: "email has been sent, kindly activate your account",
      });
    });
  });
};

//account activation
exports.activateAccount = (req, res, next) => {
  const { token } = req.body;

  if (token) {
    jwt.verify(
      token,
      process.env.JWT_ACTIVATE_EMAIL,
      function (err, decodedToken) {
        if (err) {
          res.json({ error: "invalid token or expired token" });
        }
        const { email, password } = decodedToken;
        User.findOne({ email }).exec((err, user) => {
          if (user) {
            return res
              .status(400)
              .json({
                error: "User with this email already exists..please login",
              });
          }

          let newUser = new User({ email, password });
          newUser.save((err, success) => {
            if (err) {
              return res.status(400).json({ error: err });
            }
            res.json({ message: "Signup success" });
          });
        });
      }
    );
  } else {
    res.json({
      error: "something went wrong",
    });
  }
};

//forgot password
exports.forgotPassword = (req, res, next) => {
  const { email } = req.body;

  User.findOne({ email }, (err, user) => {
    if (err || !user) {
      res.status(400).json({ error: "User with this email doesn't exist" });
    }
    const token = jwt.sign({ _id: user._id }, process.env.RESET_PASSWORD_KEY, {
      expiresIn: "20m",
    });

    const data = {
      from: "noreplay@gmail.com",
      to: email,
      subject: "Reset Password link",
      html: `
         <h2>click below link to reset your password</h2>
         <p>${process.env.CLIENT_URL}/auth/reset-password/${token}</p>
    `,
    };

    return user.updateOne({ resetLink: token }, (err, success) => {
      if (err) {
        res.status(400).json({ error: "reset password link error" });
      } else {
        mg.messages().send(data, function (error, body) {
          if (error) {
            res.json({
              error: err.message,
            });
          }
          res.json({
            message: "email has been sent, kindly reset your password",
          });
        });
      }
    });
  });
};

//reset password
exports.resetPassword = (req, res, next) => {
  const { resetLink, newPassword } = req.body;
  if (resetLink) {
    jwt.verify(
      resetLink,
      process.env.RESET_PASSWORD_KEY,
      (err, decodedToken) => {
        if (err) {
          return res
            .status(401)
            .json({ error: "invalid token or token expired" });
        }
        User.findOne({ resetLink }, (err, user) => {
          if (err) {
            return res
              .status(400)
              .json({ error: "User with this token doen't exists" });
          }
          const obj = {
            password: newPassword,
            resetLink: "",
          };
          user = _.extend(user, obj);
          user.save((err, result) => {
            if (err) {
              return res.status(400).json({ error: "reset password error" });
            } else {
              return res
                .status(200)
                .json({ message: "password has been changed" });
            }
          });
        });
      }
    );
  } else {
    return res.status(401).json({ error: "authentication error" });
  }
};

//login user
exports.loginUser = (req, res, next) => {
  let fetchedUser;
  User.findOne({ email: req.body.email })
    .then((user) => {
      if (!user) {
        return res.status(401).json({
          error: "User with this email doesn't exists",
        });
      }
      fetchedUser = user;
      if (req.body.password != user.password) {
        return res.status(401).json({
          error: "Incorrect password",
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
        userId: fetchedUser._id,
      });
    })
    .catch((err) => {
      return res.status(500).json({
        error: "Error while login",
      });
    });
};

//get resistered users
exports.getRegisteredUsers = async (req, res) => {
  try {
    const user = await User.find();
    res.status(200).send(user);
  } catch (err) {
    res.status.send(err);
  }
};
