let express = require('express');
let router = express.Router();

router.get('/aboutVideo', (req, res) => {
	let content = '<iframe width="671" height="356" src="https://www.youtube.com/embed/b6hoBp7Hk-A" frameborder="0" allowfullscreen></iframe>';
	res.send(content);
});

router.get('/aboutmore', (req, res) => {
	let content = '<img class="read-more-image read-more-image-1" src="./images/surf_read_more.jpg"><p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Natus molestiae quibusdam officiis libero quia ad, unde, assumenda totam soluta modi ullam cumque rem porro tempore ratione doloribus ab delectus optio. Excepturi voluptates mollitia soluta at obcaecati, magni, doloremque aperiam quisquam esse ipsa voluptas commodi quis nulla dolore atque cumque incidunt, similique porro veritatis dicta quo libero rem! Praesentium nobis, laudantium illum, quisquam quaerat accusantium odio tempora odit in eius error enim voluptates nesciunt perspiciatis debitis neque dolorem voluptatibus deleniti vitae ea optio? Delectus doloremque, provident magnam facere eligendi minus dignissimos a quae id ut distinctio, voluptates odit repudiandae! Deleniti distinctio eaque quod eos numquam sunt harum, laudantium labore maxime architecto! Tempore, et quis. Perspiciatis ipsam numquam similique ea libero explicabo dicta et delectus quae impedit, est, illum alias temporibus asperiores qui, velit voluptates maiores doloremque mollitia nobis dolore expedita non. Corrupti esse neque sequi laboriosam rem, magni ab itaque nam vel doloribus aliquid quaerat excepturi velit et ipsa explicabo, eos optio voluptatem <img class="read-more-image read-more-image-2" src="./images/surf_read_more_1.jpg">recusandae repellat incidunt ea blanditiis, consequatur. Doloribus, voluptatibus, quas! Eius odit eveniet, consequuntur sint sunt velit tenetur! Deleniti consequuntur neque architecto, totam eius illo dolore in odit. Placeat aliquid provident quibusdam culpa officia modi, commodi aspernatur, excepturi, ipsam et rerum laboriosam totam adipisci autem quaerat fugit? Vel repudiandae architecto iusto adipisci, excepturi quam quae velit voluptas impedit aut. Est possimus iure ipsum eligendi ut, omnis laboriosam, inventore quibusdam aliquam quo, adipisci quia non soluta voluptas cum fuga debitis. Est dolor quibusdam odit iure esse repellat sit nobis, dolore fugit voluptate libero necessitatibus pariatur, neque, tempore doloribus similique ipsum quasi reiciendis at. Natus molestiae similique quas officia odit cumque amet perspiciatis earum nostrum alias rem harum esse voluptate dignissimos aut aspernatur, cupiditate necessitatibus incidunt facilis architecto nihil doloribus ducimus veritatis quasi impedit. Vel facilis ipsam deserunt iste consectetur perferendis.</p>';
	res.send(content);
});


module.exports = router;