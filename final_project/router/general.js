const express = require('express');
let books = require("./booksdb.js");
let isValid = require("./auth_users.js").isValid;
let users = require("./auth_users.js").users;
const public_users = express.Router();


public_users.post("/register", (req,res) => {
    const username = req.body.username;
    const password = req.body.password;
    
    let bool = true;
    if (username && password) {
        let userswithsamename = users.filter((user)=>{
            return user.username === username
          });
          if(userswithsamename.length > 0){
            bool = false;
          } else {
            bool = true;
          }
      if (bool) { 
        users.push({"username":username,"password":password});
        return res.status(200).json({message: "User successfully registred. Now you can login"});
      } else {
        return res.status(404).json({message: "User already exists!"});    
      }
    } 
    return res.status(404).json({message: "Unable to register user."});
  });


// Get the book list available in the shop

// Task 1
// public_users.get('/',function (req, res) {
//   return res.send(JSON.stringify(books,null,4));
// });

//Task 10
public_users.get('/',function (req, res) {
    const bookListPromise = new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve(res.send(JSON.stringify(book,null,4)))
        },300);
        })
  });


// Get book details based on ISBN

// Task 2
// public_users.get('/isbn/:isbn',function (req, res) {
//     const isbn = req.params.isbn;
//     res.send(books[isbn])
//  });

// Task 11
public_users.get('/isbn/:isbn',function (req, res) {
    new Promise((resolve, reject) => {
        setTimeout(() => {
            const isbn = req.params.isbn;
            resolve(res.send(books[isbn]))
        },300);
        })
 });
  
// Task 3
// Get book details based on author
// public_users.get('/author/:author',function (req, res) {
//     const author = req.params.author;
//     let book = [];
//     Object.keys(books).forEach(x => {
//         if(books[x].author.toLowerCase() == author.toLowerCase()){
//             book.push(books[x])
//         }
//     });
//     res.send(book)
// });

// Task 12
public_users.get('/author/:author',function (req, res) {
    new Promise((resolve, reject) => {
        setTimeout(() => {
        const author = req.params.author;
        let book = [];
        Object.keys(books).forEach(x => {
            if(books[x].author.toLowerCase() == author.toLowerCase()){
                book.push(books[x])
                resolve(res.send(book))
            }
        },300);
    })
})
});

// Task 4
// Get all books based on title
// public_users.get('/title/:title',function (req, res) {
//     const title = req.params.title;
//     let book = [];
//     Object.keys(books).forEach(x => {
//         if(books[x].title.toLowerCase() == title.toLowerCase()){
//             book = books[x]
//         }
//     });
//     res.send(book)
// });

// Task 13
public_users.get('/title/:title',function (req, res) {
    new Promise(() => {
        setTimeout(() => {
    const title = req.params.title;
    Object.keys(books).forEach(x => {
        if(books[x].title.toLowerCase() == title.toLowerCase()){
            res.send(books[x])
        }
    },300);
    })   
});
});

//  Get book review
public_users.get('/review/:isbn',function (req, res) {
    let isbn = req.params.isbn;
    res.send(books[isbn].reviews)
});


module.exports.general = public_users;