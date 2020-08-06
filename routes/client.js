"use strict"        // add
var express = require('express');
var router = express.Router();

var Client = require('../database/models/Client');        
  
router.post('/', function(req, res, next) {
    console.log("Client.CREATE: " + req.body);

    if(!req.body)
    {
      res.status(403)
         .json({
              "error": true,
              "message": "Request body is empty!"
          });
    }
     

    var params = req.body;

    Client.create(params)
        .then(client => {
            res.status(201)
               .json({"client": client});
        }).catch(err => {
            console.log(err);
            res.status(403)
               .json({
                   "error": true,
                   "message": err
            });     
    });

   
});
 
router.get('/', function(req, res, next) {
    console.log("Client.GET: " + req.body);
   

    Client.paginate({},{ page: req.query.page || 1, 
                          limit: 10, 
                          sort: {'_id': -1} })
        .then(clients => {
            res.status(200)
                .json({"clients": clients});
        }).catch(err =>{
            console.log(err);
            res.status(400)
               .json({
                   "error": true,
                   "message": err
            });     
        });

 
});
 
router.get('/:id', function(req, res, next) {
    console.log("Client.GET: " + req.params.id);
  
    if(!req.params.id)
    {
      res.status(403)
         .json({
              "error": true,
              "message": "There is no 'id' parameter!"
          });
    }

  

    Client.findOne({ _id: req.params.id })
        .then(client => {
            if(client === null)
            {
                res.status(404)
                   .json({
                       "error": true,
                       "message": "Client not found. id=" + req.params.id
                });     
            }

            res.status(200)
               .json({"client": client});
        }).catch(err =>{
            res.status(404)
            .json({
                 "error": true,
                 "message": "Client not found. id=" + req.params.id
             });
    }); 
});
 
router.put('/:id', function(req, res, next) {
    console.log("Client.PUT: " + req.params.id);

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
    
     

    Client.findOneAndUpdate({"_id": req.params.id}, {$set: req.body}, {new: true})
        .then(client => {
            res.status(200)
               .json({"cliente": client});
        })
        .catch(err => {
            console.log(err);
            res.status(404)
               .json({
                   "error": true,
                   "message": err
            });     
    });

     
});
 
router.delete('/:id', function(req, res, next) {
    console.log("Client.DELETE: " + req.params.id);
  
    if(!req.params.id)
    {
      res.status(403)
         .json({
              "error": true,
              "message": "There is no 'id' parameter!"
          });
    }
 

    Client.findOneAndRemove({"_id": req.params.id}, {})
        .then(client => {
            if(client === null)
            {
                res.status(404)
                   .json({
                       "error": true,
                       "message": "Client not found. id=" + req.params.id
                });     
            }

            res.status(200)
               .json({"client": client});
        })
        .catch(err => {
            console.log(err);
            res.status(500)
               .json({
                   "error": true,
                   "message": err
            });     
    });

     
});
  
module.exports = router;