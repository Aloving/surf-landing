import { tabSliderElementPosition } from '../modules/tabSliderElementPosition'

export function addIntoDOM(item){
	let boardContainer = document.querySelector('.js-board-content');
	let activeTabOfElement = item.querySelector('.board-wall__tab_active');
	let boardWall = boardContainer.querySelector('.board-wall');
	
	if(boardWall){
			boardContainer.innerHTML = '';
			boardContainer.appendChild(item);
		setTimeout(() => {
			item.classList.remove('board-wall_hidden');
			tabSliderElementPosition(item, activeTabOfElement);
		}, 10);
	}else{
		boardContainer.appendChild(item);
		setTimeout(() => {
			item.classList.remove('board-wall_hidden');
			tabSliderElementPosition(item, activeTabOfElement);
		}, 10);
	}



}