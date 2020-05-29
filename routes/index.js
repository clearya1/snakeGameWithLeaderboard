var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

/* GET Hello World page. */
router.get('/helloworld', function(req, res) {
  res.render('helloworld', { title: 'Hello, World!' });
});

/* GET Userlist page. */
router.get('/userlist', function(req, res) {
    var db = req.db;
    var collection = db.get('usercollection');
    collection.find({},{},function(e,docs){
        res.render('userlist', {
            "userlist" : docs
        });
    });
});

/* GET New User page. */
router.get('/newuser', function(req, res) {
    res.render('newuser', { title: 'Add New User' });
});

/* POST to Add User Service */
router.post('/adduser', function(req, res) {

    // Set our internal DB variable
    var db = req.db;

    // Get our form values. These rely on the "name" attributes
    var userName = req.body.username;
    var userEmail = req.body.useremail;

    // Set our collection
    var collection = db.get('usercollection');

    // Submit to the DB
    collection.insert({
        "username" : userName,
        "email" : userEmail
    }, function (err, doc) {
        if (err) {
            // If it failed, return error
            res.send("There was a problem adding the information to the database.");
        }
        else {
            // And forward to success page
            res.redirect("userlist");
        }
    });

});

/*Go to new user page*/
router.get('/newuser.ejs', function(req, res) {
    res.render('newuser', { title: 'Add New User' });
});

/* GET Snake App page. */
router.get('/snake', function(req, res) {
    var db = req.db;
    var collection = db.get('snakecollection');
    collection.find({},{sort : { score : -1 }},function(e,docs){
        res.render('snake', {
            "leaderboard" : docs
        });
    });
});

/* POST to Leaderboard */
router.post('/addleader', function(req, res) {

    // Set our internal DB variable
    var db = req.db;

    // Get our form values. These rely on the "name" attributes
    var userName = req.body.name;
    var userScore = req.body.score;

    // Set our collection
    var collection = db.get('snakecollection');

    // Submit to the DB
    
    collection.find({},
                    {sort : { score : 1 } },
                    function (err,res) { }
                    );
    
    collection.findOneAndDelete(
        {},
        function (err, doc) {
        });
    
    collection.insert({
        "name" : userName,
        "score" : parseInt(userScore,10)
    }, function (err, doc) {
        if (err) {
            // If it failed, return error
            res.send("There was a problem adding you to the leaderboard.");
        }
        else {
            // And forward to success page
            res.redirect("snake");
        }});


});

module.exports = router;
