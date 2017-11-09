var express = require('express');
var router = express.Router();
var Comment = require("../models/comments");

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: "Express" });
});

router.get('/login', function(req, res, next) {
  res.render('login', { title: "Login" });
});

router.get('/feed', function(req, res, next) {
    res.render('feed', { title: "I love tweeting!" })
});

router.post('/feed', function(req, res, next) {
    res.render("Comment updated successfully!");
});

/* Adds comments */
router.post('/addComment', function(req, res, next) {
    var comment = new Comment(req.body);
    comment.save(function (err, savedComment) {
        if (err) {
            throw err;
        }

        res.json({
            "id": savedComment._id
        });
    });
});

/* Retrieves all comments */
router.get('/getComments', function(req, res, next) {
    Comment.find({}, function(err, comments) {

    if (err) {
        res.send(err);
    }

    res.json(comments);

    });
});

/*Update comment*/
router.put('/updateComment/:id', function(req, res, next) {

    var toUpdate = req.params.id;

    Comment.update({_id:toUpdate}, req.body, function(err, comment) {

    if (err) {
        res.send(err);
    }

    res.json({"status" : "Comment updated successfully!"})

    });
});

/*Delete comment*/
router.delete('/deleteComment/:id', function(req, res, next) {

    var toDelete = req.params.id;

    Comment.remove({_id:toDelete}, function(err, comment) {
        if (err) {
            res.send(err);
        }

    res.json({"status": "Comment deleted successfully!"});

    });
});

module.exports = router;
