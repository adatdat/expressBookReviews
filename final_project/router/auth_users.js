const express = require('express');
const jwt = require('jsonwebtoken');
let books = require("./booksdb.js");
const regd_users = express.Router();

let users = [];
const isValid = (username)=>{ //returns boolean
//write code to check is the username is valid
}

//TEMPORARY
// Get the book list available in the shop
regd_users.get('/',function (req, res) {
    return res.send(JSON.stringify(books,null,4));
  });



const authenticatedUser = (username,password)=>{
    let validusers = users.filter((user)=>{
      return (user.username === username && user.password === password)
    });
    if(validusers.length > 0){
      return true;
    } else {
      return false;
    }
  }
//only registered users can login
regd_users.post("/login", (req,res) => {
        const username = req.body.username;
        const password = req.body.password;

        console.log(req.body);
        if (!username || !password) {
            return res.status(404).json({message: "Error logging in"});
        }
       if (authenticatedUser(username,password)) {
     let accessToken = jwt.sign({data:password}, "access", {expiresIn: 3600});
      req.session.authorization = {accessToken,username};
      return res.status(200).send("User successfully logged in");
        } else {
          return res.status(208).json({message: "Invalid Login. Check username and password"});
}});

// Add a book review
regd_users.put("/auth/review/:isbn", (req, res) => {
    const username = req.session.authorization.username;
    const isbn = req.params.isbn; 
    const review = req.body.review; 
        if(books[isbn]){
                books[isbn].reviews[username] = review;
                res.send("Review Sent"); 
        }else{
            res.send("Book does not exist");
        }
});

regd_users.delete("/auth/review/:isbn", (req, res) => {
    const username = req.session.authorization.username;
    const isbn = req.params.isbn; 

    delete books[isbn].reviews[username]
    res.send("Review Deleted"); 

});

module.exports.authenticated = regd_users;
module.exports.isValid = isValid;
module.exports.users = users;