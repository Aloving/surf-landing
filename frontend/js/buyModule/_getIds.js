export function getBoardIds(cb, errcb){
	return function(url){
		fetch(url,{
			method: 'post',
			headers: {
				'Content-Type': 'application/json'
			}
		})
		.then(response => response.json())
		.then(data => {
			cb(data);
		})
		.catch(err => {
			errcb();
			throw err;
		});
	};
}
