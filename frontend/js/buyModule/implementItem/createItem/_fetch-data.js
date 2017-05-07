export function fetchData(publishcb){
	return function(id){
		fetch(`/getboard/${id}`, {
			method: 'post'
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