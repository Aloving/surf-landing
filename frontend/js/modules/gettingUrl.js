export function gettingUrl(){
	var getUrls = JSON.parse(document.getElementsByTagName('body')[0].getAttribute('data-urls'));
	return function(category, id){
		return getUrls[category][id];
	};
}