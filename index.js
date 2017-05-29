let express = require('express');
let app 		= express();
let boardsData 		= require('./boardsData');
let teammatesData = require('./teammatesData');

let pugModules = {
	formatNumber: require('./pugModules/formatNumber')
};

let boardIdsUrl = '/getboardids';
let aboutVideo = '/getvideocontent';
let aboutMore = '/aboutmore';

let tajburrow = '/teammate/tajburrow';
let maliamanuel = '/teammate/maliamanuel';
let macycallaghan = '/teammate/macycallaghan';
let ianwalsh = '/teammate/ianwalsh';
let susansmith = '/teammate/susansmith';
let timjackson = '/teammate/timjackson';
let mickgrey = '/teammate/mickgrey';
let jennythompson = '/teammate/jennythompson';
let miladunst = '/teammate/miladunst';
let morganmitch = '/teammate/morganmitch';
let sarahbrown = '/teammate/sarahbrown';
let emmajenkins = '/teammate/emmajenkins';


let data = (function(data){
	let information = {};

	information.counts = data.boards.length;
	information.pugModules = pugModules;
	information.urls = {
		commons: {
			boardsIds: boardIdsUrl,
		},
		modals: {
			aboutVideo: aboutVideo,
			aboutMore: aboutMore,
			tajburrow,
			maliamanuel,
			macycallaghan,
			ianwalsh,
			susansmith,
			timjackson,
			mickgrey,
			jennythompson,
			miladunst,
			morganmitch,
			sarahbrown,
			emmajenkins
		}
		
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

	setTimeout(() => {res.send(itemJson)}, 500);
});

app.get(aboutMore, (req, res, next) => {
	let content = '<img class="read-more-image read-more-image-1" src="./images/surf_read_more.jpg"><p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Natus molestiae quibusdam officiis libero quia ad, unde, assumenda totam soluta modi ullam cumque rem porro tempore ratione doloribus ab delectus optio. Excepturi voluptates mollitia soluta at obcaecati, magni, doloremque aperiam quisquam esse ipsa voluptas commodi quis nulla dolore atque cumque incidunt, similique porro veritatis dicta quo libero rem! Praesentium nobis, laudantium illum, quisquam quaerat accusantium odio tempora odit in eius error enim voluptates nesciunt perspiciatis debitis neque dolorem voluptatibus deleniti vitae ea optio? Delectus doloremque, provident magnam facere eligendi minus dignissimos a quae id ut distinctio, voluptates odit repudiandae! Deleniti distinctio eaque quod eos numquam sunt harum, laudantium labore maxime architecto! Tempore, et quis. Perspiciatis ipsam numquam similique ea libero explicabo dicta et delectus quae impedit, est, illum alias temporibus asperiores qui, velit voluptates maiores doloremque mollitia nobis dolore expedita non. Corrupti esse neque sequi laboriosam rem, magni ab itaque nam vel doloribus aliquid quaerat excepturi velit et ipsa explicabo, eos optio voluptatem <img class="read-more-image read-more-image-2" src="./images/surf_read_more_1.jpg">recusandae repellat incidunt ea blanditiis, consequatur. Doloribus, voluptatibus, quas! Eius odit eveniet, consequuntur sint sunt velit tenetur! Deleniti consequuntur neque architecto, totam eius illo dolore in odit. Placeat aliquid provident quibusdam culpa officia modi, commodi aspernatur, excepturi, ipsam et rerum laboriosam totam adipisci autem quaerat fugit? Vel repudiandae architecto iusto adipisci, excepturi quam quae velit voluptas impedit aut. Est possimus iure ipsum eligendi ut, omnis laboriosam, inventore quibusdam aliquam quo, adipisci quia non soluta voluptas cum fuga debitis. Est dolor quibusdam odit iure esse repellat sit nobis, dolore fugit voluptate libero necessitatibus pariatur, neque, tempore doloribus similique ipsum quasi reiciendis at. Natus molestiae similique quas officia odit cumque amet perspiciatis earum nostrum alias rem harum esse voluptate dignissimos aut aspernatur, cupiditate necessitatibus incidunt facilis architecto nihil doloribus ducimus veritatis quasi impedit. Vel facilis ipsam deserunt iste consectetur perferendis.</p>';
	res.send(content);
});

app.get(aboutVideo, (req, res, next) => {
	let content = '<iframe width="671" height="356" src="https://www.youtube.com/embed/b6hoBp7Hk-A" frameborder="0" allowfullscreen></iframe>';
	res.send(content);
});

app.get('/teammate/:id', (req, res) => {
	let teammateId = req.params.id;
	let itemJson = teammatesData.teammates.filter(item => item.id == teammateId)[0];

	res.render('helpers/teammates-modal',itemJson);
	
});

app.post(boardIdsUrl, (req,res) => {
	res.send(boardsIds);
});

app.listen(8000, () => {
  console.log('Listening on port 8000');
});