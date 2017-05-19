export function getHtmlContent(publishcb, errcb){

	return function(url){
		fetch(url, {method: 'GET'})
			.then(data => data.text())
			.then(data => publishcb(data))
			.catch(err => {
				errcb(err);
			});
	};
}