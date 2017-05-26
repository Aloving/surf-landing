import { cacheStorage } from '../modules/cacheStorage';
import { modalsFacade } from './__facade__modals';
import { mediator } from './_modalsMediator';

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

mediator.subscribe(lifeCycle.publishDOMcontent, modalsFacade.createModal);

mediator.subscribe(lifeCycle.templateInnerContent, modalsFacade.templateContent(
	mediator.publish.bind(undefined, lifeCycle.publishDOMcontent)
));

mediator.subscribe(lifeCycle.createFromScratch, modalsFacade.fetchContent(
	mediator.publish.bind(undefined, lifeCycle.templateInnerContent)
));


export function implementModal(info) {
	mediator.publish(lifeCycle.startCycle, info);
}