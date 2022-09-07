const express = require("express");
const router = express.Router();
// const { body, validationResult } = require('express-validator');
const mysqlConnection = require("../config/connection");
const dbQuery = require("../controllers/dbcontroller");

//get all orders data
router.get("/", (req, res) => {
  dbQuery.getAllOrders((err, resp) => {
    if (err) {
      res.send(err);
    } else {
      res.send(resp);
    }
  });
});

//get single order data
router.get("/:id", (req, res) => {
  dbQuery.getOrder(req.params.id, (err, resp) => {
    if (err) {
      res.send(err);
    } else {
      if (resp.length == 0) {
        res.json({
          success: 0,
          message: `Order with id ${req.params.id} doesn't exist`,
        });
      } else {
        res.send(resp);
      }
    }
  });
});

//delete single orders data
router.delete("/:id", (req, res) => {
  dbQuery.deleteOrder(req.params.id, (err, resp) => {
    if (err) {
      res.send(err);
    } else {
      res.send(resp);
    }
  });
});

//insert orders data
router.post("/", (req, res) => {
  let neworders = req.body;
  dbQuery.addOrder(neworders, (err, resp) => {
    if (err) {
      res.send(err);
    } else {
      res.send(resp);
    }
  });
});

//update orders data
router.put("/:id", (req, res) => {
  let neworders = req.body;
  dbQuery.updateOrder(req.params.id, neworders, (err, resp) => {
    if (err) {
      res.send(err);
    } else {
      res.send(resp);
    }
  });
});

module.exports = router;
