import { fetchContent } from './_fetchContent';
import { CreateModal } from './_createModal';
import { templateContent } from './_templateContent';

export let modalsFacade = {	
	fetchContent: fetchContent,
	createModal: CreateModal,
	templateContent: templateContent 
};