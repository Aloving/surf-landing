export function initNavigation(publishcb, publishTag){

	return function(ids){
		let forwardArrow = document.querySelector('.js-forward-arrow');
		let backwardArrow = document.querySelector('.js-backward-arrow');
		let currentPosition = 0;
		let allPositions = ids.length-1;

		forwardArrow.addEventListener('click', (evt) => {
			evt.preventDefault();
			currentPosition == allPositions ? currentPosition = 0 : ++currentPosition;
			publishcb(publishTag, ids[currentPosition]);
		});

		backwardArrow.addEventListener('click', (evt) => {
			evt.preventDefault();
			!currentPosition ? currentPosition = allPositions : --currentPosition;
			publishcb(publishTag, ids[currentPosition]);
		});
	}
}