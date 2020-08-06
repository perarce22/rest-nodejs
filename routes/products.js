"use strict"        // add
var express = require('express');
var router = express.Router();

var Product = require('../database/models/Product');        // add

/*
var products = {};      // Temporal "database"
*/

/* POST a new product. */
router.post('/', function(req, res, next) {
    console.log("Product.CREATE: " + req.body);

    if(!req.body)
    {
      res.status(403)
         .json({
              "error": true,
              "message": "Request body is empty!"
          });
    }
    
    // Mongoose

    // db.mycol.insert({
    //     name: 'xxx', 
    //     price: 100,
    //     expiration: '2018-01-02'
    // })

    var params = req.body;

    Product.create(params)
        .then(product => {
            res.status(201)
               .json({"product": product});
        }).catch(err => {
            console.log(err);
            res.status(403)
               .json({
                   "error": true,
                   "message": err
            });     
    });

    // /Mongoose

    /*
    let product = req.body;
    product._id = Date.now();

    products[product._id] = product;

    res.status(201)
        .json({"product": products[product._id]});
    */
});

/* GET all products. */
router.get('/', function(req, res, next) {
    console.log("Product.GET: " + req.body);
  
    // Mongoose
    
    // db.products.find()

    Product.paginate({},{ page: req.query.page || 1, 
                          limit: 10, 
                          sort: {'_id': -1} })
        .then(products => {
            res.status(200)
                .json({"products": products});
        }).catch(err =>{
            console.log(err);
            res.status(400)
               .json({
                   "error": true,
                   "message": err
            });     
        });

    // /Mongoose

    /*
    var productValues = Object.keys(products).map(k => products[k]);

    res.status(200)
       .json({"products": productValues});
    */
});

/* GET a particular product. */
router.get('/:id', function(req, res, next) {
    console.log("Product.GET: " + req.params.id);
  
    if(!req.params.id)
    {
      res.status(403)
         .json({
              "error": true,
              "message": "There is no 'id' parameter!"
          });
    }

    // Mongoose

    // Doc: https://docs.mongodb.com/manual/reference/method/db.collection.findOne/

    // db.products.find({ _id: ObjectId("5aefa0b961e1cc2194b5ced5") });

    Product.findOne({ _id: req.params.id })
        .then(product => {
            if(product === null)
            {
                res.status(404)
                   .json({
                       "error": true,
                       "message": "Product not found. id=" + req.params.id
                });     
            }

            res.status(200)
               .json({"product": product});
        }).catch(err =>{
            res.status(404)
            .json({
                 "error": true,
                 "message": "Product not found. id=" + req.params.id
             });
    });

    // /Mongoose

    /*
    let product = products[req.params.id];

    if(product === undefined)
    {
        res.status(404)
        .json({
             "error": true,
             "message": "Product not found. id=" + req.params.id
         });
    }

    res.status(200)
       .json({"product": product});
    */
});

/* PUT a particular product. */
router.put('/:id', function(req, res, next) {
    console.log("Product.PUT: " + req.params.id);

    if(!req.body)
    {
      res.status(403)
         .json({
              "error": true,
              "message": "Request body is empty!"
          });
    }
  
    if(!req.params.id)
    {
      res.status(403)
         .json({
              "error": true,
              "message": "There is no 'id' parameter!"
          });
    }
    
    // Mongoose

    // Doc: https://docs.mongodb.com/manual/reference/method/db.collection.findOneAndUpdate/

    // example?

    Product.findOneAndUpdate({"_id": req.params.id}, {$set: req.body}, {new: true})
        .then(product => {
            res.status(200)
               .json({"product": product});
        })
        .catch(err => {
            console.log(err);
            res.status(404)
               .json({
                   "error": true,
                   "message": err
            });     
    });

    // /Mongoose    

    /*    
    let product = req.body;
    product._id = parseInt(req.params.id, 10);
    products[product._id] = product;

    res.status(200)
       .json({"product": product});
    */
});

/* DELETE a particular product. */
router.delete('/:id', function(req, res, next) {
    console.log("Product.DELETE: " + req.params.id);
  
    if(!req.params.id)
    {
      res.status(403)
         .json({
              "error": true,
              "message": "There is no 'id' parameter!"
          });
    }

    // Mongoose

    // Doc: https://docs.mongodb.com/manual/reference/method/db.collection.findOneAndUpdate/

    // example?

    Product.findOneAndRemove({"_id": req.params.id}, {})
        .then(product => {
            if(product === null)
            {
                res.status(404)
                   .json({
                       "error": true,
                       "message": "Product not found. id=" + req.params.id
                });     
            }

            res.status(200)
               .json({"product": product});
        })
        .catch(err => {
            console.log(err);
            res.status(500)
               .json({
                   "error": true,
                   "message": err
            });     
    });

    // /Mongoose    

    /*
    var id = parseInt(req.params.id, 10);
    var product = products[id];

    if(product === undefined)
    {
        res.status(404)
        .json({
             "error": true,
             "message": "Product not found. id=" + req.params.id
         });
   }

    delete (products[id]);

    res.status(200)
       .json({"product": product});
    */
});
  
module.exports = router;