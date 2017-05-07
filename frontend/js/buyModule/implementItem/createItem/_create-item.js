import { mediator } from './_create-item-mediator';
import { facade } from './_create-item-facade';

let lifeCycle = {
	needData: 'needData',
	templateItem: 'templateItem',
	createDOMelement: 'createDOMelement',
	initWallActions: 'initWallActions',
	createdElement: 'createdElement'
}

mediator.subscribe(lifeCycle.needData, facade.fetchData(
	mediator.publish.bind(undefined, lifeCycle.templateItem)
));

mediator.subscribe(lifeCycle.templateItem, facade.templateModule(
	mediator.publish.bind(undefined, lifeCycle.createDOMelement)
));

mediator.subscribe(lifeCycle.createDOMelement, facade.createDOMelement(
	mediator.publish.bind(undefined, lifeCycle.initWallActions)
));

mediator.subscribe(lifeCycle.initWallActions, facade.initWallActions(
	mediator.publish.bind(undefined, lifeCycle.createdElement)
));

export function createItem(publishcb){
	mediator.subscribe(lifeCycle.createdElement, publishcb);
	return function(id){
		mediator.publish(lifeCycle.needData, id);
	}
}