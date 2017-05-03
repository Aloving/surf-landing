export function addErrorMessageInToModule(){
	let buyModuleError = document.createElement("div");
	let errorMessage = document.createElement('p');

	errorMessage.innerText = 'A technical error';
	buyModuleError.setAttribute('class', 'buy-module__error-message');

	buyModuleError.append(errorMessage);
	
	document.querySelector('.buy-module').append(buyModuleError);
	document.querySelector('.section-heading__boards').classList.add('section-heading__boards_errored');
	document.querySelector('.buy-module__spinner').classList.add('hidden');
}