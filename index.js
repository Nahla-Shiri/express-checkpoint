// index.js

/**
 * Required External Modules
 */

const express = require("express");
const path = require("path");


/**
 * App Variables
 */

const app = express();
const port = process.env.PORT || "4000"; 

/**
 *  App Configuration
 */

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");
app.use(express.static(path.join(__dirname, "public")));

/**
 * Middelware Definitions
 */

var requestTime = function (req, res, next) {
    const date = new Date();
    const day = date.getDay();
    const hour =date.getHours();
    if(hour > 8 && hour <18 && day > 0 && day < 6)
      console.log("The web application is available");
    else
      res.send("The web application is only available in working time (Monday to Friday,  from 9 to 17")
    
    next()
  }
  
  app.use("*",requestTime)

 /**
 * Routes Definitions
 */ 

app.get("/", (req, res) => {
    res.render("index", { title: "Home"});
  });

app.get("/services", (req, res) => {
    res.render("services", { title: "Our services"});
  }); 

app.get("/contact", (req, res) => {
    res.render("contact", { title: "Contact us"});
  }); 

/**
 * Server Activation
 */

app.listen(port, () => {
    console.log(`Listening to requests on http://localhost:${port}`);
  });