import { mediator } from './_createItemMediator';
import { facade } from './__facade__createItem';

/*
	@needData 						= called what need data from server
	@templateItem 				= template innerHTML with fetched data
	@createDOMelement 		= created dom element founded on templated text 
	@initWallActions 			= init wall actions for dom element
	@createDOMelement 		= publish ready dom element
*/
let lifeCycle = {
	needData: 'needData',
	templateItem: 'templateItem',
	createDOMelement: 'createDOMelement',
	initWallActions: 'initWallActions',
	createdElement: 'createdElement'
}

/*
	subscribers on @needData	
*/
mediator.subscribe(lifeCycle.needData, facade.fetchData(
	mediator.publish.bind(undefined, lifeCycle.templateItem)
));

/*
	subscribers on @templateItem	
*/
mediator.subscribe(lifeCycle.templateItem, facade.templateModule(
	mediator.publish.bind(undefined, lifeCycle.createDOMelement)
));


/*
	subscribers on @createDOMelement	
*/
mediator.subscribe(lifeCycle.createDOMelement, facade.createDOMelement(
	mediator.publish.bind(undefined, lifeCycle.initWallActions)
));


/*
	subscribers on @initWallActions	
*/
mediator.subscribe(lifeCycle.initWallActions, facade.initWallActions(
	mediator.publish.bind(undefined, lifeCycle.createdElement)
));

export function createItem(publishcb){
	/*
		subscribers on @createdElement	
	*/
	mediator.subscribe(lifeCycle.createdElement, publishcb);
	return function(id){
		setTimeout(() => {
			mediator.publish(lifeCycle.needData, id);
		}, 500);
	}
}