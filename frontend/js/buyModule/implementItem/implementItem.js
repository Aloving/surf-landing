import { mediator } from './_implementMediator';
import { facade } from './__facade__implementationItem';


/*
	@needItem 						= publish event called need item, for start chain of implement iten
	@createItem 					= create item, task for other module
	@addIntoCache 				= add created item in to local cache, this option has been realizated for minimize requests on server
	@publishDOMelement 		= publish ready element 
*/
let lifeCycle = {
	needItem: 'needItem',
	createItem: 'createItem',
	addIntoCache: 'addIntoCache',
	publishDOMelement: 'publishDOMelement'
}

/*
	init casche
	carring function
	@publishDOMelement if cache have item
	or
	@createItem if cache doesn't have any
*/
let cacheStorage = facade.cacheStorage(
		 	mediator.publish.bind(undefined, lifeCycle.publishDOMelement),
		 	mediator.publish.bind(undefined, lifeCycle.createItem)
		 )();


	/*
		subribers on @needItem
	*/
	mediator.subscribe(lifeCycle.needItem,
		 cacheStorage.gettingItem
	 );

	/*
		subribers on @createItem
	*/

	mediator.subscribe(lifeCycle.createItem, facade.createItem(
		mediator.publish.bind(undefined, lifeCycle.publishDOMelement)
	));


		/*
		subscribe on @publishDOMelement
	*/
	mediator.subscribe(lifeCycle.publishDOMelement, cacheStorage.addItem);

export function implementItem(publishItem){
	//subsctibe on ready element and pull him out

	mediator.subscribe(lifeCycle.publishDOMelement, publishItem);
	return function(id){

		//notice module that need item
		mediator.publish(lifeCycle.needItem, id);
	}
}