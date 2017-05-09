export function counterPosition(position){
	let currentPosition = formatNumber(++position);
	let positionElement = document.querySelector('.js-current-position');

	positionElement.innerText = currentPosition;
}

function formatNumber(num){
	if(!(String(num).length >= 2)){
		return '0' + num;
	}else{
		return String(num);
	}
}