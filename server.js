var express = require('express');
var app = express();
const bodyParser = require('body-parser');
var path = require('path');
var mongoose = require('mongoose');
mongoose.set('useFindAndModify', false);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static( __dirname + '/public/dist/public' ));

mongoose.connect('mongodb://localhost/cakes', { useNewUrlParser: true });

const CommentSchema = new mongoose.Schema({
    rating:  { type: Number, required: true},
    comment: {type: String, required: [true, "Comment must have content"]},
}, {timestamps: true})
  
var CakesSchema = new mongoose.Schema({
    name:  { type: String, required: true, minlength: 3},
    image:  { type: String, required: true, minlength: 3},
    comments: [CommentSchema]
}, {timestamps: true });

mongoose.model('Cake', CakesSchema); 
mongoose.model('Comment', CommentSchema); 
var Cake = mongoose.model('Cake');
var Comment = mongoose.model('Comment');

mongoose.Promise = global.Promise;

app.get('/', function(req, res) {
    cakes = Cake.find({}, function(err, cakes) {
        if(err) {
            res.json({message: "Error", error: err})
        } else { 
            res.json({message: "Success", data: cakes})
        }
    })
})

app.get('/all', function(req, res) {
    cakes = Cake.find({}, function(err, cakes) {
        if(err) {
            res.json({message: "Error", error: err})
        } else { 
            res.json({message: "Success", data: cakes})
        }
    })
})

app.post('/new', function(req, res) {
    var cake = new Cake ({name: req.body.name, image: req.body.image});
    cake.save(function(err) {
        if(err) {
            res.json({message: "Error", error: err})
        } else { 
            res.json({message: "Success", data: cake})
        }
    })
})

app.post('/edit', function(req, res){
    console.log("I will add rating");
    console.log("ID: " + req.body._id);
    console.log("Rating: " + req.body.rating);
    Cake.findOneAndUpdate({_id: req.body._id}, {$push: {comments: {rating: req.body.rating, comment: req.body.comment}}}, function(err, cake){
        if(err) {
            console.log("Something is wrong");
            res.json({message: "Error", error: err})
        } else { 
            console.log("Success!");
            res.json({message: "Success", data: cake})
        }
    })
})

app.post('/delete', function(req, res) {
    Cake.deleteOne({_id: req.body._id}, function(err) {
        if(err) {
            res.json({message: "Error", error: err})
        } else { 
            res.json({message: "Success"})
        }
    })
})

app.listen(8000, function() {
    console.log("listening on port 8000");
})