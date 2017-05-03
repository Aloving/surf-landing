export function getBoardIds(cb, publishEvent){
	return function(url){
		fetch(url,{
			method: 'post'
		})
		.then(response => response.json())
		.then(data => {
			cb(publishEvent, data);
		})
		.catch(err => {
			throw data;
		})	
	}
}
