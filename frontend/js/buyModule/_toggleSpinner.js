export function toggleSpinner(hidden){
	let spinner = document.querySelector('.js-board-spinner');

	!hidden ? spinner.classList.add('hidden') : spinner.classList.remove('hidden');

}