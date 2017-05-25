export function CreateModal(innerContent){
	let body = document.getElementsByTagName('body')[0];

	let modalContainer = document.createElement('div');
	let modalContentContainer = document.createElement('div');

	modalContentContainer.classList.add('modal__content-container');
	modalContentContainer.appendChild(innerContent);


	modalContainer.classList.add('modal');
	modalContainer.appendChild(modalContentContainer);

	modalContainer.addEventListener('click', function(){
		body.removeChild(this);
	});

	body.appendChild(modalContainer);
}	