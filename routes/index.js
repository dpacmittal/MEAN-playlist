var express = require('express');
var functions = require('../functions.js');
var router = express.Router();
var User = require('../models/user.js');

/* GET home page. */
router.get('/', function(req, res) {
	res.render('index', { title: 'Express' });
});

router.get('/hello.txt', function(req, res) {
	res.send('Hello World!');
});
router.get('/account', functions.ensureAuthenticated, function(req, res){
	User.findById(req.session.passport.user, function(err, user) {
		if(err) {
			console.log(err);
		} else {
			res.render('account', { user: user});
		};
	});
});

module.exports = router;
