const express = require("express");
const router = express.Router();
// const { body, validationResult } = require('express-validator');
const mysqlConnection = require("../config/connection");
const dbcontroller = require("../controllers/dbcontroller");
const { genSaltSync, hashSync, compareSync } = require("bcrypt");

const { sign } = require("jsonwebtoken");

//registration
router.post("/register", (req, res) => {
  let newUser = req.body;
  let salt = genSaltSync(10);
  newUser.password = hashSync(newUser.password, salt);
  dbcontroller.registerUser(newUser, (err, resp) => {
    if (err) {
      res.json(err);
    } else {
      res.json({
        success: 1,
        message: resp,
      });
    }
  });
});

//login
router.post("/login", (req, res) => {
  let user = req.body;
  dbcontroller.login(user, (err, resp) => {
    if (err) {
      res.json(err);
    } else {
      if (resp) {
        const result = compareSync(user.password, resp.password);
        if (result) {
          resp.password = undefined;
          const jsonToken = sign({ result: resp }, "qwe1234", {
            expiresIn: "1h",
          });
          res.json({
            success: 1,
            message: "Login Successfull",
            token: jsonToken,
          });
        } else {
          res.json({
            success: 0,
            message: "Invalid Password!",
          });
        }
      } else {
        res.json({
          success: 0,
          message: "Invalid email or password!",
        });
      }
    }
  });
});

module.exports = router;
