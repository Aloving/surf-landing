import { CreateMediator } from '../../../modules/mediator-create';

export let mediator = (function(){
	return new CreateMediator();
})();