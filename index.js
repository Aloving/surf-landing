let express = require('express');
let app 		= express();
let boardsData 		= require('./data');

let pugModules = {
	formatNumber: require('./pugModules/formatNumber')
};

let boardIdsUrl = '/getboardids';
let video = '/getvideocontent';

let data = (function(data){
	let information = {};

	information.counts = data.boards.length;
	information.pugModules = pugModules;
	information.urls = {
		boardIdsUrl: boardIdsUrl,
		video: video
	};

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

app.post('/getboard/:id', (req,res) => {
	let itemId = req.params.id;
	let itemJson = boardsData.boards.filter(item => item._id == itemId)[0];

	res.send(itemJson);
});

app.get(video, (req, res, next) => {
	let content = '<iframe width="560" height="315" src="https://www.youtube.com/embed/b6hoBp7Hk-A" frameborder="0" allowfullscreen></iframe>';
	res.send(content);
});

app.post(boardIdsUrl, (req,res) => {
	res.send(boardsIds);
});

app.listen(8000, () => {
  console.log('Listening on port 8000');
});