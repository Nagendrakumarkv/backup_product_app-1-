const express = require("express");
const User = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const userControllers=require("../controllers/user")

const router = express.Router();

router.post("/signup",userControllers.createUser);

router.post("/login",userControllers.loginUser );

router.get("/signup",userControllers.getRegisteredUsers);

module.exports = router;
