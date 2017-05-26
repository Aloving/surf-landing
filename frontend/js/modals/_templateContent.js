import { cacheStorage } from '../modules/cacheStorage';

export function templateContent(publishcb){
	return function(content, list){
		let modalContent = document.createElement('div');

		modalContent.classList.add('modal__content');
		modalContent.innerHTML = content;

		modalContent.addEventListener('click', (evt) => {
			evt.stopPropagation();
		});
		publishcb(modalContent);
		cacheStorage().setIntoLocalCache(list.category, list.id, modalContent);
	};
}