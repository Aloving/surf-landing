let express = require('express');
let app 		= express();
let boardsData 		= require('./boardsData');
let teammatesData = require('./teammatesData');
let newsData = require('./newsData');

let pugModules = {
	formatNumber: require('./pugModules/formatNumber')
};

let modalsRoute = require('./routes/modals');

let boardIdsUrl = '/getboardids';


let data = (function(_boardsData, _newsData){
	let information = {};

	information.counts = _boardsData.boards.length;
	information.pugModules = pugModules;
	information.urls = {
		commons: {
			boardsIds: boardIdsUrl,
		}
	};
	information.news = _newsData.news;

	return information;
})(boardsData, newsData);

let boardsIds = boardsData.boards.map(item => item._id);

app.use((req, res, next) => {         
	console.log('%s %s', req.method, req.url);
	next();
});

app.use('/modals', modalsRoute);

app.set('view engine', 'pug');
app.use(express.static(__dirname + '/public'));


app.get('/', (req,res) => {
	res.render('index', data);
});

app.post('/getboard/:id', (req,res) => {
	let itemId = req.params.id;
	let itemJson = boardsData.boards.filter(item => item._id == itemId)[0];

	setTimeout(() => {res.send(itemJson)}, 500);
});


app.get('/teammates/:id', (req, res) => {
	let teammateId = req.params.id;
	let itemJson = teammatesData.teammates.filter(item => item.id == teammateId)[0];

	res.render('helpers/teammates-modal',itemJson);
	
});

app.get('/news/:id', (req, res) => {
	let newId = req.params.id;

	let itemJson = newsData.news.filter(item => item._id == newId)[0];

	res.render('helpers/new-modal', itemJson);
});

app.post(boardIdsUrl, (req,res) => {
	res.send(boardsIds);
});

app.listen(8000, () => {
  console.log('Listening on port 8000');
});