export function fetchData(publishcb){
	return function(id){
		fetch(`/getboard/${id}`, {
			method: 'post',
			headers: {
    		'Content-Type': 'application/json'
  		}
		})
		.then(data => data.json())
		.then(data => {
			publishcb(data);
		})
		.catch((err) => {
			throw err;
		})
	}
}