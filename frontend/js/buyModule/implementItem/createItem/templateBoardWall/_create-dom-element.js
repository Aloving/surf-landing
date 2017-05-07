export function createDOMelement(publishcb){

return function(innerContent){
		let docElement = document.createElement('div');
		docElement.classList.add('board-wall');
		docElement.innerHTML = innerContent;

		publishcb(docElement);
	}
}