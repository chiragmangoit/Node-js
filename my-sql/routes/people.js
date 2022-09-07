const express = require("express");
const router = express.Router();
// const { body, validationResult } = require('express-validator');
const mysqlConnection = require("../src/connection");

//get all people data
router.get("/", async (req, res) => {
  
  mysqlConnection.query("SELECT * FROM people", (err, rows, fields) => {
    if (!err) {
      res.send(rows);
    } else {
      console.log(err);
    }
  });
});

//get single people data
router.get("/:id", (req, res) => {
  mysqlConnection.query(
    "SELECT * FROM people WHERE id = ?",
    [req.params.id],
    (err, rows, fields) => {
      if (!err) {
        res.send(rows);
      } else {
        console.log(err);
      }
    }
  );
});

//delete single people data
router.delete("/:id",  (req, res) => {
  mysqlConnection.query(
    "DELETE FROM people WHERE id = ?",
    [req.params.id],
    (err, rows, fields) => {
      if (!err) {
        res.send("Deleted Successfully");
      } else {
        console.log(err);
      }
    }
  );
});

//insert people data
router.post("/", (req, res) => {
  let newPeople = req.body;

  mysqlConnection.query(
    "INSERT INTO `people` SET ? ",
    newPeople,
    (err, result, fields) => {
      if (!err) {
        res.status(201).send(`User added with ID: ${result.insertId}`);
      } else {
        console.log(err);
      }
    }
  );
});

//update people data
router.put("/:id", (req, res) => {
  let newPeople = req.body;

  mysqlConnection.query(
    "UPDATE people SET ? WHERE id = ?",
    [newPeople, req.params.id],
    (err, result, fields) => {
      if (!err) {
        res.status(201).send(`User updated successfully`);
      } else {
        console.log(err);
      }
    }
  );
});

module.exports = router;
