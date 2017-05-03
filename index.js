let express = require('express');
let app 		= express();
let boardsData 		= require('./data.js')

let pugModules = {
	formatNumber: require('./pugModules/formatNumber')
}

let data = (function(data){
	let information = {};

	information.counts = data.boards.length;
	information.pugModules = pugModules;

	return information;
})(boardsData);

let boardsIds = boardsData.boards.map(item => item._id);


app.set('view engine', 'pug');
app.use(express.static(__dirname + '/public'));

app.use((req, res, next) => {         
  console.log('%s %s', req.method, req.url);
  next();
});

app.get('/', (req,res) => {
	res.render('index', data);
});

app.post('/getboardids', (req,res) => {
	res.send(boardsIds);
});

app.listen(8000, () => {
  console.log('Listening on port 8000')
});