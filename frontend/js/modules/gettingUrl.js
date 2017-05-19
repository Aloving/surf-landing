export function gettingUrl(publishUrls){
	return function(urls, thatNeed){
		var getUrls = JSON.parse(document.getElementsByTagName('body')[0].getAttribute('data-urls'));
		publishUrls(getUrls[thatNeed]);
		return getUrls[thatNeed];
	};
}