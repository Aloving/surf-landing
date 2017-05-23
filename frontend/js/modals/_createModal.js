export function CreateModal(content){
	debugger;
	let body = document.getElementsByTagName('body')[0];

	let modalContainer = document.createElement('div');
	let modalContentContainer = document.createElement('div');
	let modalContent = document.createElement('div');

	modalContent.classList.add('modal__content');
	modalContent.innerHTML = content;

	modalContentContainer.classList.add('modal__content-container');
	modalContentContainer.appendChild(modalContent);


	modalContainer.classList.add('modal');
	modalContainer.appendChild(modalContentContainer);

	modalContainer.addEventListener('click', function(){
		body.removeChild(this);
	});
	modalContent.addEventListener('click', (evt) => {
		evt.stopPropagation();
	});

	body.appendChild(modalContainer);
}	