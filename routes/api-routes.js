// Requiring our register database
var db = require("../models");
var axios = require("axios");

//Routes
// =============================================================
module.exports = function(app) {
  app.post("/api/comments", function(req, res) {
    db.Comment.create({
      author: req.body.author,
      body:req.body.body
    }).then(function(results) {

      res.end();
    });
  });

  app.get("/api/displaycomments", function(req, res) {
    db.Comment.findAll({}).then(function(results){
      res.json(results);
    });
  });

  // GET route for getting all of the 
  app.get("/api/register", function(req, res) {
    // findAll returns all entries for a table when used with no options
    db.Register.findAll({}).then(function(dbResult) {
      // We have access to the Registers as an argument inside of the callback function
      res.json(dbResult);
    });
  });

  // GET route for getting all of the 
  app.get("/api/logins", function(req, res) {
    // findAll returns all entries for a table when used with no options
    db.Login.findAll({}).then(function(dbResult) {
      // We have access to the Registers as an argument inside of the callback function
      res.json(dbResult);
    });
  });

  app.get("/api/loginstatus", function(req, res) {
    // findAll returns all entries for a table when used with no options
    db.Loginstatus.findAll({}).then(function(dbResult) {
      // We have access to the Registers as an argument inside of the callback function
      res.json(dbResult);
    });
  });

  app.post("/api/event", function(req, res) {
    console.log(req.body.id);

    axios
      .get("https://api.eventful.com/json/events/get?&id=" + req.body.id + "E0-001-123080839-5&app_key=Zdp7TJQBkTgdJwbM")
      .then(function(response) {
        // If the axios was successful...
        // Then log the body from the site!
        console.log(response.data);
        res.json(response.data);
      })
      .catch(function(error) {
        if (error.response) {
          // The request was made and the server responded with a status code
          // that falls out of the range of 2xx
          console.log(error.response.data);
          console.log(error.response.status);
          console.log(error.response.headers);
        } else if (error.request) {
          // The request was made but no response was received
          // `error.request` is an object that comes back with details pertaining to the error that occurred.
          console.log(error.request);
        } else {
          // Something happened in setting up the request that triggered an Error
          console.log("Error", error.message);
        }
        console.log(error.config);
    
      });

  });
  // // POST route for saving a new Register
  // app.post("/api/Registers", function(req, res) {
  //   // create takes an argument of an object describing the item we want to
  //   // insert into our table. In this case we just we pass in an object with a text
  //   // and complete property (req.body)
  //   db.Register.create({
  //     text: req.body.text,
  //     complete: req.body.complete
  //   }).then(function(dbResult) {
  //     // We have access to the new Register as an argument inside of the callback function
  //     res.json(dbResult);
  //   })
  //     .catch(function(err) {
  //     // Whenever a validation or flag fails, an error is thrown
  //     // We can "catch" the error to prevent it from being "thrown", which could crash our node app
  //       res.json(err);
  //     });
  // });

  // // DELETE route for deleting Registers. We can get the id of the Register to be deleted from
  // // req.params.id
  // app.delete("/api/Registers/:id", function(req, res) {
  //   // We just have to specify which Register we want to destroy with "where"
  //   db.Register.destroy({
  //     where: {
  //       id: req.params.id
  //     }
  //   }).then(function(dbResult) {
  //     res.json(dbResult);
  //   });

  // });

  // // PUT route for updating Registers. We can get the updated Register data from req.body
  // app.put("/api/Registers", function(req, res) {

  //   // Update takes in an object describing the properties we want to update, and
  //   // we use where to describe which objects we want to update
  //   db.Register.update({
  //     text: req.body.text,
  //     complete: req.body.complete
  //   }, {
  //     where: {
  //       id: req.body.id
  //     }
  //   }).then(function(dbResult) {
  //     res.json(dbResult);
  //   })
  //     .catch(function(err) {
  //     // Whenever a validation or flag fails, an error is thrown
  //     // We can "catch" the error to prevent it from being "thrown", which could crash our node app
  //       res.json(err);
  //     });
  // });
};