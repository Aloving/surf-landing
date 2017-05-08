import { CreateMediator } from '../../../modules/mediatorCreate';

export let mediator = (function(){
	return new CreateMediator();
})();