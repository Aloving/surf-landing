let express = require('express');
let app 		= express();
let data 		= require('./data.js')

app.set('view engine', 'pug');
app.use(express.static(__dirname + '/public'));

app.use((req, res, next) => {         
  console.log('%s %s', req.method, req.url);
  next();
});

app.get('/', (req,res) => {
	res.render('index', data);
});

app.listen(8000, () => {
  console.log('Listening on port 8000')
});