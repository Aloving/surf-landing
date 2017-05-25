import { implementModal } from './implementModal';
import { fetchContent } from './_fetchContent';
import { CreateModal } from './_createModal';
import { templateContent } from './_templateContent';

export let modalsFacade = {	
	implementModal: implementModal,
	fetchContent: fetchContent,
	createModal: CreateModal,
	templateContent: templateContent 
};