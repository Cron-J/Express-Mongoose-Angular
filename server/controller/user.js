var Joi = require('joi'),
    Boom = require('boom'),
    User = require('../model/user').User;


exports.getAll = function (req,res,next) {
      User.find({}, function(err, user) {
        if (!err) {
            res.json(user);
        } else {
            res.send(Boom.badImplementation(err)); // 500 error
        }
    });
  
};

exports.getOne = function (req,res,next) {
      User.findOne({ 'userId': req.params.userid }, function(err, user) {
        if (!err) {
            res.json(user);
        } else {
            res.send(Boom.badImplementation(err)); // 500 error
        }
    });
  
};

exports.create = function (req,res,next) {
    var user = new User(req.body);
    user.save(function(err, user) {
        if (!err) {
            res.json(user);
        } else {
             if (11000 === err.code || 11001 === err.code) {
                    res.send(Boom.forbidden("please provide another user id, it already exist"));
            }
            else res.send(Boom.forbidden(err)); // HTTP 403
        }
    });
};

exports.update = function (req,res,next) {
    User.findOne({ 'userId': req.params.userid }, function(err, user) {
        if (!err) {
            user.username = req.body.username;
             user.save(function(err, user) {
                  if (!err) {
                      res.json(user);
                  } else {
                       if (11000 === err.code || 11001 === err.code) {
                              res.send(Boom.forbidden("please provide another user id, it already exist"));
                      }
                      else res.send(Boom.forbidden(err)); // HTTP 403
                  }
              });

        } else {
            res.send(Boom.badImplementation(err)); // 500 error
        }
    });
};

exports.remove = function (req,res,next) {
  console.log(req.params.userid);
    User.findOne({ 'userId': req.params.userid }, function(err, user) {
        if (!err && user) {
            user.remove();
            res.send("User deleted successfully");
        } else if (!err) {
            // Couldn't find the object.
            res.send(Boom.notFound());
        } else {
            console.log(err);
            res.send(Boom.badRequest("Could not delete user"));
        }
    });  
};

