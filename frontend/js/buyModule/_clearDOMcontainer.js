export function clearDOMcontainer(){
	let boardWall = document.querySelector('.board-wall');

	if(boardWall){
		boardWall.classList.add('board-wall_hidden');
	}
}