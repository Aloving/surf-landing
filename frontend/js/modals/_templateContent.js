export function templateContent(publishcb){
	return function(content){
		let modalContent = document.createElement('div');

		modalContent.classList.add('modal__content');
		modalContent.innerHTML = content;

		modalContent.addEventListener('click', (evt) => {
			evt.stopPropagation();
		});
		publishcb(modalContent);
	};
}