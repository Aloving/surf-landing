export function addIntoDOM(item){
	let boardContainer = document.querySelector('.js-board-content');
	
	boardContainer.innerHTML = '';
	boardContainer.append(item);
}