import { modalsFacade } from './__facade__modals';
import { mediator } from './_modalsMediator';
import { cacheStorage } from '../modules/cacheStorage';

let lifeCycle = {
	startCycle: 'startCycle',
	implementedModal: 'implementedModal',
	startWithDOMelement: 'startWithDOMelement',
	createFromScratch: 'createFromScratch',
	publishDOMcontent: 'publishDOMcontent',
	templateInnerContent: 'templateInnerContent'
};

let _getFromCacheStorage = cacheStorage({
	publishDOMElement: mediator.publish.bind(undefined, lifeCycle.publishDOMcontent),
	publishLSelement: mediator.publish.bind(undefined, lifeCycle.templateInnerContent),
	publishCreate: mediator.publish.bind(undefined, lifeCycle.createFromScratch)
}).gettingItem.bind(undefined, 'modals');

mediator.subscribe(lifeCycle.startCycle, function(info){
	_getFromCacheStorage(info.id);
});

mediator.subscribe(lifeCycle.publishDOMcontent, function(data){
	console.log('startWithDOMelement', data);
});

mediator.subscribe(lifeCycle.templateInnerContent, modalsFacade.templateContent(
	mediator.publish.bind(undefined, lifeCycle.publishDOMcontent)
));

mediator.subscribe(lifeCycle.createFromScratch, modalsFacade.fetchContent(
	mediator.publish.bind(undefined, lifeCycle.templateInnerContent)
));


export function implementModal(publishModal) {
	mediator.subscribe(lifeCycle.implementedModal, publishModal);
	return function(info){
		mediator.publish(lifeCycle.startCycle, info);
	};
}