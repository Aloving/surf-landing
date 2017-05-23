import { getHtmlContent } from './_getHtmlContent';
import { CreateModal } from './_createModal';
import { cacheStorage } from '../modules/cacheStorage';

export let modalsFacade = {
	getHtmlContent: getHtmlContent,
	createModal: CreateModal,
	cacheStorage: cacheStorage
};
