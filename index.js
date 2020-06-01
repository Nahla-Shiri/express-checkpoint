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
       {req.requestTime = true; } 
    else
       {req.requestTime = false;} 
    console.log(req.requestTime);
    next()
  }
  
  app.use("*",requestTime)

 /**
 * Routes Definitions
 */ 

app.get("/", (req, res) => {
    res.render("index", { title: "Home" , opening_hours : req.requestTime});
  });

app.get("/services", (req, res) => {
    res.render("services", { title: "Our services" , opening_hours : req.requestTime});
  }); 

app.get("/contact", (req, res) => {
    res.render("contact", { title: "Contact us" , opening_hours : req.requestTime });
  }); 

/**
 * Server Activation
 */

app.listen(port, () => {
    console.log(`Listening to requests on http://localhost:${port}`);
  });