const express = require("express");
const bodyparser = require("body-parser");
const path = require("path");
const app = express();

var Publishable_Key =
  "pk_test_51LfGMYGUXKrYcRI3RLJjMIue387l7wuK1WUdsxa0JcGEVMfUiy6uR381XaubuXFmvAcaLdG8VNGYs6pQQzH5Zvr900SNLWfDCs";
var Secret_Key =
  "sk_test_51LfGMYGUXKrYcRI3uv2XcSvOS8HxUd8mKH9TryTstjoB9qJD1slhJ6mlprKnuY7x0KdqwS1wir0iin2mRKwOKJmT00zWN82Du1";

const stripe = require("stripe")(Secret_Key);

const port = process.env.PORT || 3000;

app.use(bodyparser.urlencoded({ extended: false }));
app.use(bodyparser.json());

// View Engine Setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.get("/", (req, res) => {
  res.render("home", {
    key: Publishable_Key,
  });
});

app.post("/payment", (req, res) => {
  // Moreover you can take more details from user
  // like Address, Name, etc from form
  stripe.customers
    .create({
      email: req.body.stripeEmail,
      source: req.body.stripeToken,
      name: "Chirag Bajaj",
      address: {
        line1: "TC 9/4 Old MES colony",
        postal_code: "452331",
        city: "Indore",
        state: "Madhya Pradesh",
        country: "India",
      },
    })
    .then((customer) => {
      return stripe.charges.create({
        amount: 2500, // Charging USD 25
        description: "Web Development Product",
        currency: "USD",
        customer: customer.id,
      });
    })
    .then((charge) => {
      res.send("Payments Successfull"); // If no error occurs
    })
    .catch((err) => {
      res.send(err); // If some error occurs
    });
});

app.listen(port, function (error) {
  if (error) throw error;
  console.log("Server created Successfully");
});
