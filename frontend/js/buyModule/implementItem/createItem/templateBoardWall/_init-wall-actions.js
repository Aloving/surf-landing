import { tabsActions } from './_tabs-actions';
import { galleryActions } from './_gallery-actions';

export function initWallActions(publishcb){
	return function(element){
		let elementWithTabs = tabsActions(element);
		let createdElement = galleryActions(elementWithTabs);
		publishcb(createdElement);
	}
}