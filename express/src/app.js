const express = require("express");
const path = require("path");
const hbs = require("hbs");

const app = express();

//define path for express config
const publicDirectoryPath = path.join(__dirname,'../public');
const viewPath = path.join(__dirname,'../templates/views');
const partialPath = path.join(__dirname,'../templates/partials');

//setup handlebars engine and view location
app.set('view engine', 'hbs');
app.set('views', viewPath);
hbs.registerPartials(partialPath);

//setup static directory to serve
app.use(express.static(publicDirectoryPath));


app.get("", (req, res) => {
  res.render('index',{title:'Home'});
});

app.get("/about", (req, res) => {
  res.render('about',{title:'About US'});
});

app.get("/help", (req, res) => {
  res.render('help',{title:'Help'});
});

app.get("/help/*", (req, res) => {
  res.render('404',{title:'404',errorMessage:'help article not found'});
});

app.get("*", (req, res) => {
  res.render('404',{title:'404',errorMessage:'not found'});
});


app.get("/weather", (req, res) => {
  res.send({place:'indore',temp:'27 degree centigrade'});
});

app.listen(3000, () => console.log("server is running on port 3000"));

