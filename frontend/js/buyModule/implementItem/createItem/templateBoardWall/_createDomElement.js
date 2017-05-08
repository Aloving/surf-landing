export function createDOMelement(publishcb){

return function(innerContent){
		//create dom element and set external data in to
		let docElement = document.createElement('div');
		docElement.classList.add('board-wall', 'board-wall_hidden');
		docElement.innerHTML = innerContent;

		//and publish it
		publishcb(docElement);
	}
}