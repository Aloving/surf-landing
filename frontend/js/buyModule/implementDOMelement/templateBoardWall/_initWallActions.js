import { tabsActions } from './_tabsActions';
import { galleryActions } from './_galleryActions';

export function initWallInteractive(publishcb){
	return function(element){
		let elementWithTabs = tabsActions(element);
		let createdElement = galleryActions(elementWithTabs);
		publishcb(createdElement);
	};
}