var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
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
