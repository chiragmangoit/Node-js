const express = require("express");
const mysqlConnection = require("../config/connection");

//Register
const registerUser = (newUser, result) => {
  mysqlConnection.query("INSERT INTO `users` SET ? ", newUser, (err, res) => {
    if (!err) {
      result(null, `User Registered Successfully`);
    } else {
      result(null, err);
      console.log(err);
    }
  });
};

//login
const login = (data, result) => {
  mysqlConnection.query(
    "SELECT * FROM users WHERE email = ?",
    [data.email],
    (err, rows, fields) => {
      if (!err) {
        result(null, rows[0]);
      } else {
        result(null, err);
        console.log(err);
      }
    }
  );
};

//get all orders
const getAllOrders = (result) => {
  mysqlConnection.query("SELECT * FROM orders", (err, rows) => {
    // try {
    //   const order = await rows;
    //   result(null, order);
    // } catch (error) {
    //   console.log(error);
    // }

    if (!err) {
      result(null, rows);
    } else {
      result(null, err);
      console.log(err);
    }
  });
};

//get single orders
const getOrder = (orderID, result) => {
  mysqlConnection.query(
    "SELECT * FROM orders WHERE orderId = ?",
    [orderID],
    (err, rows, fields) => {
      if (!err) {
        result(null, rows);
      } else {
        result(null, err);
        console.log(err);
      }
    }
  );
};

//delete an order
const deleteOrder = (orderID, result) => {
  mysqlConnection.query(
    "DELETE FROM orders WHERE orderId = ?",
    [orderID],
    (err, rows, fields) => {
      if (!err) {
        result(null, rows);
      } else {
        result(null, err);
        console.log(err);
      }
    }
  );
};

//add an order
const addOrder = (neworders, result) => {
  mysqlConnection.query(
    "INSERT INTO `orders` SET ? ",
    neworders,
    (err, res) => {
      if (!err) {
        result(null, `order added with ID: ${res.insertId}`);
      } else {
        result(null, err);
        console.log(err);
      }
    }
  );
};

//update an order
const updateOrder = (orderid, neworders, result) => {
  mysqlConnection.query(
    "UPDATE orders SET ? WHERE orderId = ?",
    [neworders, orderid],
    (err, fields) => {
      if (!err) {
        result(null, `User updated successfully`);
      } else {
        result(null, err);
        console.log(err);
      }
    }
  );
};

module.exports = {
  registerUser: registerUser,
  getAllOrders: getAllOrders,
  getOrder: getOrder,
  deleteOrder: deleteOrder,
  addOrder: addOrder,
  updateOrder: updateOrder,
  login: login,
};
