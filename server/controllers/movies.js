
var mongoose = require('mongoose');
require("../models/movie.js");
var Movie = mongoose.model('Movie');
var Review = mongoose.model("Review");

module.exports = {
    addMovie: function(req, res){

            Review.create(req.body, function(err,review){
                if (err){
                    console.log("Errors",err);
                    if(req.body.title.length < 3){
                        err.title = "Title must have atleast 3 characters";
                    }
                    res.json({message :"Error", data : err});
                } else {
                    Movie.create({title: req.body.title, reviews: review}, function(err, data) {
                        if(err){
                            res.json({message :"Error", data : data})
                        }
                        else{

                            res.json({message :"Success", data : data})
                        }
                    })

                }
            });

    },
    getAllMovies: function(req, res){
        Movie.find({}, function(err,data){
            if(err){
                res.json({message :"Error", data : err})
            } else {
                res.json({message :"Success", data : data})
            }
        })
    },
    getOneMovie: function(req,res){
        Movie.findOne({_id:req.params.id}, function(err,data){
            if(err){
                res.json({message :"Error", data : err})
            }else{
                res.json({message :"Success", data : data})
            }
        })
    },


    deleteMovie: function(req, res) {

        Movie.remove({_id: req.params.id}, function(err,data) {
            if(err) {
                return res.json({message :"Error", data : err});
            }
            else {
                return res.json({message:"Success", data: data})
            }
        })
    },

    newReview: function(req, res) {
        console.log("in newReview");

                Review.create(req.body, function(err, review){
                    console.log("creating review")
                    if (err){
                        res.json({message :"Error", data : err})
                    } else {
                        console.log("req.body", req.body);
                        Movie.update({_id: req.params.id}, {$push: {reviews: req.body}},{runValidators: true}, function(err, data){

                            if(err){
                                res.json({message :"Error", data : err});
                            }else{
                                console.log("adding review to Movie")
                                res.json({message:"Success", data: data});
                            }
                        });
                    }
                });
            }



}
