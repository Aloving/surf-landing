export function getHtmlContent(publishcb, errcb){
	return function(url){
		fetch(url, {method: 'GET'})
			.then(data => data.text())
			.then(publishcb)
			.catch(errcb);
	};
}