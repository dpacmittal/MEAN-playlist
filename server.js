var app = require('./app.js');
app.get('/hello.txt', function(req, res){
	res.send('Hello World!');
});
app.listen('1337');
