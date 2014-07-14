var passport = require('passport');
var FacebookStrategy = require('passport-facebook').Strategy;
var oauth_config = require('./oauth.js');
var User = require('./models/user.js');

passport.use(new FacebookStrategy({
  clientID: oauth_config.facebook.clientID,
  clientSecret: oauth_config.facebook.clientSecret,
  callbackURL: oauth_config.facebook.callbackURL
},
function(accessToken, refreshToken, profile, done) {
    User.findOne({ oauthID: profile.id }, function(err, user) {
        if(err) { console.log(err); }
        if (!err && user != null) {
          done(null, user);
      } else {
          var user = new User({
            oauthID: profile.id,
            name: profile.displayName,
            created: Date.now()
        });
          user.save(function(err) {
            if(err) {
              console.log(err);
          } else {
              console.log("saving user ...");
              done(null, user);
          };
      });
      };
  });
}
));

passport.serializeUser(function(user, done) {
    console.log('serializeUser: ' + user._id)
    done(null, user._id);
});
passport.deserializeUser(function(id, done) {
    User.findById(id, function(err, user){
        console.log(user)
        if(!err) done(null, user);
        else done(err, null)
    })
});