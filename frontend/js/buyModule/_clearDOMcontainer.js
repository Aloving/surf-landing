export function clearDOMcontainer(){
	let boardContainer = document.querySelector('.js-board-content');
	let boardWall = document.querySelector('.board-wall');

	if(boardWall){
		debugger;
		boardWall.classList.add('board-wall_hidden');
		// setTimeout(() => {
		// 	boardContainer.innerHTML = '';
		// }, 500);
	}
}