import { mediator } from './_implement-core';
import { facade } from './_implementation-facade';

let lifeCycle = {
	needItem: 'needItem',
	returnItem: 'returnItem',
	createItem: 'createItem',
	addIntoCache: 'addIntoCache',
	publishDOMelement: 'publishDOMelement'
}

let cascheStorage = facade.cascheStorage(
		 	mediator.publish.bind(undefined, lifeCycle.publishDOMelement),
		 	mediator.publish.bind(undefined, lifeCycle.createItem)
		 )();


	/*
	==============
		needItem
	=============
	*/
	mediator.subscribe(lifeCycle.needItem,
		 cascheStorage.gettingItem
	 );

		/*
	==============
		createItem
	=============
	*/

	mediator.subscribe(lifeCycle.createItem, facade.createItem(
		mediator.publish.bind(undefined, lifeCycle.publishDOMelement)
	));


		/*
	==============================
		subscribe on created items
	==============================
	*/
	mediator.subscribe(lifeCycle.publishDOMelement, cascheStorage.addItem);

export function implementItem(publishItem){
	mediator.subscribe(lifeCycle.publishDOMelement, publishItem);
	return function(id){
		mediator.publish(lifeCycle.needItem, id);
	}
}