var functions = {
	ensureAuthenticated: function(req, res, next) {
		if (req.isAuthenticated()) { return next(); }
		res.redirect('/')
	}
}
module.exports = functions;
