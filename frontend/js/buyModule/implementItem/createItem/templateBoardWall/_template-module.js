let templateItem = require('./_template.pug');

export function templateModule(publishcb){
	return function(data){
		let templatedItem = templateItem(data);
		publishcb(templatedItem);
	}
}