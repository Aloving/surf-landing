export function toggleSpinner(hidden){
	let spinner = document.querySelector('.js-board-spinner');

	!hidden ? spinner.classList.add('buy-module__spinner_hidden') : spinner.classList.remove('buy-module__spinner_hidden');

}