export function createDOMelement(publishcb){

return function(innerContent){
		let docElement = document.createElement('div');
		docElement.classList.add('board-wall', 'board-wall_hidden');
		docElement.innerHTML = innerContent;

		publishcb(docElement);
	}
}