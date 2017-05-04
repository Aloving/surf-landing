export function getBoardIds(cb, errcb, publishEvent){
	return function(url){
		fetch(url,{
			method: 'post'
		})
		.then(response => response.json())
		.then(data => {
			cb(publishEvent, data);
		})
		.catch(err => {
			errcb();
			throw err;
		})	
	}
}