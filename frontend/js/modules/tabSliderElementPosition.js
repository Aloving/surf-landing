export function tabSliderElementPosition(domElement, activeElement){
	let sliderElement = domElement.querySelector('.js-board-tab-slider-element');

	sliderElement.style.left = `${activeElement.offsetLeft}px`;
	sliderElement.style.width = `${activeElement.offsetWidth}px`;	
}