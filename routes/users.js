var express = require('express');
var router = express.Router();
var passport = require('passport');

/* GET users listing. */
router.get('/', function(req, res) {
	res.render('login', {user: req.user});
});
router.get('/facebook',
		passport.authenticate('facebook'),
		function(req, res){
		});
router.get('/facebook/callback', passport.authenticate('facebook', {failureRedirect: '/'}),
		function(req, res) {
			res.redirect('/account');
		});
router.get('/logout', function(req, res){
	req.logout();
	res.redirect('/');
});
module.exports = router;
