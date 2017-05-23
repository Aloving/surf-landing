import { mediator } from './_implementMediator';
import { facade } from './__facade__implementationItem';


/*
	@needView 						= publish event called need item, for start chain of implement iten
	@createView 					= create item, task for other module
	@addIntoCache 				= add created item in to local cache, this option has been realizated for minimize requests on server
	@publishElementView 		= publish ready element 
*/
let lifeCycle = {
	needView: 'needView',
	createView: 'createView',
	addIntoCache: 'addIntoCache',
	publishElementView: 'publishElementView',
	publishDOMelement: 'publishDOMelement'
};

/*
	init casche
	carring function
	@publishElementView if cache have item
	or
	@createView if cache doesn't have any
*/
let cacheStorage = facade.cacheStorage(
			mediator.publish.bind(undefined, lifeCycle.publishElementView),
			mediator.publish.bind(undefined, lifeCycle.createView)
		);

	/*
		subscribe on @needView
	*/
mediator.subscribe(lifeCycle.needView, cacheStorage.gettingItem.bind(undefined, 'boards'));

	/*
		subscribe on @createView
	*/

mediator.subscribe(lifeCycle.createView, facade.createView(
	mediator.publish.bind(undefined, lifeCycle.publishElementView)
));


	/*
		subscribe on @publishElementView
	*/
mediator.subscribe(lifeCycle.publishElementView, function(elementView){
	if(!elementView.DOMelement){
		cacheStorage.addItem(elementView);
	}
	mediator.publish(lifeCycle.publishDOMelement, elementView.DOMelement || elementView);
});

export function implementItem(publishItem){
	//subscribe on ready element and pull him out
	mediator.subscribe(lifeCycle.publishDOMelement, publishItem);
	return function(id){
		//notice module that need item
		mediator.publish(lifeCycle.needView, id);
	};
}