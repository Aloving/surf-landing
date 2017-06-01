export function loadImages(publish){
	return function(element){

		var images = element.getElementsByTagName('img');
		var actions = Array.prototype.map.call(images, onloadPromise);

		function onloadPromise(item){
			return new Promise(resolve => item.onload = () => resolve());
		}
		var result = Promise.all(actions);

		result
			.then(() => publish(element));
	};
}