export function clearDOMcontainer(){
	let boardContainer = document.querySelector('.js-board-content');
	let boardWall = document.querySelector('.board-wall');

	if(boardWall){
		boardWall.classList.add('board-wall_hidden');
	}
}