import { mediator } from './_implementMediator';
import { facade } from './__facade__implementationDOMelement';
import { cacheStorage } from '../../modules/cacheStorage';
import { addErrorMessageInToModule } from '../_addErrorMessageInToModule';

let lifeCycle = {
	startCycle: 'startCycle',
	templateFromJson: 'templateFromJson',
	itemFromScratch: 'itemFromScratch',
	templateItem: 'templateItem',
	createDOMelement: 'createDOMelement',
	initWallInteractive: 'initWallInteractive',
	loadImages: 'loadImages'
};

let _getFromCacheStorage = cacheStorage({
	publishDOMElement: mediator.publish.bind(undefined, lifeCycle.publishDOMelement),
	publishLSelement: mediator.publish.bind(undefined, lifeCycle.templateFromJson),
	publishCreate: mediator.publish.bind(undefined, lifeCycle.itemFromScratch)
}).gettingItem.bind(undefined, 'boards');	


mediator.subscribe(lifeCycle.startCycle, function(id){
	_getFromCacheStorage(id);
});

mediator.subscribe(lifeCycle.itemFromScratch, facade.fetchData(
	mediator.publish.bind(undefined, lifeCycle.templateFromJson),
	addErrorMessageInToModule
));

mediator.subscribe(lifeCycle.templateFromJson, facade.templateModule(
	mediator.publish.bind(undefined, lifeCycle.createDOMelement)
));

mediator.subscribe(lifeCycle.createDOMelement, facade.createDOMelement(
	mediator.publish.bind(undefined, lifeCycle.initWallInteractive)
));


mediator.subscribe(lifeCycle.initWallInteractive, facade.initWallInteractive(
	mediator.publish.bind(undefined, lifeCycle.loadImages)
));

mediator.subscribe(lifeCycle.loadImages, facade.loadImages(
	mediator.publish.bind(undefined, lifeCycle.publishDOMElement)
));


mediator.subscribe(lifeCycle.publishDOMelement, function(element){
	let boardID = element.querySelector('#js-id').getAttribute('data-productid');
	cacheStorage().setIntoLocalCache('boards', boardID, element);
});

export function implementDOMelement(publishItem){
	//subscribe on ready element and pull him out
	mediator.subscribe(lifeCycle.publishDOMelement, publishItem);
	return function(id){
		//notice module that need item
		mediator.publish(lifeCycle.startCycle, id);
	};
}