// Requiring our Register model
var db = require("../models");

//Routes
// =============================================================
module.exports = function(app) {
  //POST route for saving new user
  app.post("/api/register", function(req, res) {
      
    console.log(req.body.firstName);
    console.log(req.body.lastName);
    console.log(req.body.email);
    console.log(req.body.password);
    console.log(req.body.password2);
    
    //Add sequelize code for creating a new user using req.body,
    //then return the result using res.json

    //Check err
    var errors = [];
    //Check required fields
    if(!req.body.firstName || !req.body.lastName || !req.body.password2 || !req.body.email || !req.body.password || !req.body.zipcode) {
      console.log("something is wrong");
      errors.push({msg: "Please fill all the fields"});
    }
    //Check passwords match
    if(req.body.password !== req.body.password2) {
      console.log("passwords are not matching");
      errors.push({ msg: "passwords do not match"});
    }
    //Check password length
    if(req.body.password.length < 6) {
      console.log("password should be at least 6 caracters");
      errors.push({ msg: "Password should be at least 6 characters"});
    }
    console.log(errors);
    if(errors.length > 0) {
      res.render("register", {
        errors: errors,
        firstName: req.body.firstName, 
        lastName: req.body.lastName, 
        email: req.body.email, 
        password: req.body.password,
        zipcode: req.body.zipcode,
        user_picture: req.body.picture
      });
    } else {
      db.Register.findOne({ 
            where: {
              email: req.body.email
            }
      }).then(function(user) {
         if(user) {
          //user exists
          errors.push({msg: "Email is already registered"});
          res.render("register", {
            errors
          });
        } else {
          db.Register.create ({
            first_name: req.body.firstName, 
            last_name: req.body.lastName, 
            email: req.body.email, 
            password: req.body.password,
            zipcode: req.body.zipcode,
            user_picture: req.body.picture
          }).then(function(result) {
             //res.json(result);
            res.send("HELLO");
 
          }).catch (function(err) {
            res.json(err);
          });
 
        } 
      
      })
    }
//=============simple first part working=====
    // console.log(req.body.firstName);
    // console.log(req.body.lastName);
    // console.log(req.body.email);
    // console.log(req.body.password);
    // console.log(req.body.password2);
      
    // db.Register.create ({
    //   first_name: req.body.firstName, 
    //   last_name: req.body.lastName, 
    //   email: req.body.email, 
    //   password: req.body.password,
    //   zipcode: req.body.zipcode,
    //   user_picture: req.body.picture
    // }).then(function(result) {
    //   //res.json(result);
    //   res.send("HELLO");
    // }).catch(function(err) {
    //   res.json(err);
    // });
    //================end first working part=======
  });

  app.post("/api/login", function(req, res) {
      console.log(req.body.email);
    console.log(req.body.password);
    res.send("LOgged in");
    // db.Register.findOne({
    //     where: {
    //       email: req.body.email
    //     }
    // }).then(function (error, results, fields) {
    // if (error) {
        //   // console.log("error ocurred",error);
        //   res.send({
        //     "code":400,
        //     "failed":"error ocurred"
        //   })
        // }else{
        //   // console.log('The solution is: ', results);
        //   if(results.length >0){
        //     if(results[0].password == password){
        //       res.send({
        //         "code":200,
        //         "success":"login sucessfull"
        //           });
        //     }
        //     else{
        //       res.send({
        //         "code":204,
        //         "success":"Email and password does not match"
        //       });
        //     }
        //   }
        //   else{
        //     res.send({
        //       "code":204,
        //       "success":"Email does not exits"
        //     });
        //   }
        // }
        // 
    // });
  });
};



//==========================================================
//Code from sample file
//==========================================================


// module.exports = function(app) {
//   // Get all examples
//   app.get("/api/examples", function(req, res) {
//     db.Example.findAll({}).then(function(dbExamples) {
//       res.json(dbExamples);
//     });
//   });

//   // Create a new example
//   app.post("/api/examples", function(req, res) {
//     db.Example.create(req.body).then(function(dbExample) {
//       res.json(dbExample);
//     });
//   });

//   // Delete an example by id
//   app.delete("/api/examples/:id", function(req, res) {
//     db.Example.destroy({ where: { id: req.params.id } }).then(function(dbExample) {
//       res.json(dbExample);
//     });
//   });
// };