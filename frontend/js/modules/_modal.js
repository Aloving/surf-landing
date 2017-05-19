export function CreateModal(content){
	
	let modalContainer = document.createElement('div');
	modalContainer.classList.add('modal');
	modalContainer.innerHTML(content);


}