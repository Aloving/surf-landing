import { counterPosition } from './_counter-position';

export function initNavigation(publishcb){

	return function(ids){
		let forwardArrow = document.querySelector('.js-forward-arrow');
		let backwardArrow = document.querySelector('.js-backward-arrow');
		let currentPosition = 0;
		let allPositions = ids.length-1;

		forwardArrow.addEventListener('click', (evt) => {
			evt.preventDefault();
			currentPosition == allPositions ? currentPosition = 0 : ++currentPosition;
			counterPosition(currentPosition);
			publishcb(ids[currentPosition]);
		});

		backwardArrow.addEventListener('click', (evt) => {
			evt.preventDefault();
			!currentPosition ? currentPosition = allPositions : --currentPosition;
			counterPosition(currentPosition);
			publishcb(ids[currentPosition]);
		});
	};
}