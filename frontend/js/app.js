/*
import depencies
*/
import 'babelify-es6-polyfill';
import 'whatwg-fetch';

/*
	import main modules
*/
import { mediator } from './app-mediator';
import { appFacade } from './__facade__app';
import { buyModuleFacade } from './buyModule/__facade__buymodule';
import { modalsFacade } from './modals/__facade__modals';

export let _gettingUrl = appFacade.gettingUrl();


let buyModuleLifeCycle = {
	initBuyModule: 'initBuyModule',
	initIds: 'initIds',
	receivedIds: 'receivedIds',
	fetchIds: 'fetchIds',
	errorAction: 'errorAction',
	implementedItem: 'implementedItem',
	getDOMelement: 'getDOMelement',
	initNavigation: 'initNavigation'
};

let modalsLifeCycle = {
	callModal: 'callModal',
	readyModal: 'readyModal'
};

mediator.subscribe(buyModuleLifeCycle.initBuyModule, mediator.publish.bind(undefined, buyModuleLifeCycle.initIds));

mediator.subscribe(buyModuleLifeCycle.initIds, buyModuleFacade.initIds(
	mediator.publish.bind(undefined, buyModuleLifeCycle.receivedIds),
	mediator.publish.bind(undefined, buyModuleLifeCycle.fetchIds)
));

mediator.subscribe(buyModuleLifeCycle.fetchIds, buyModuleFacade.fetchIds(		
		mediator.publish.bind(undefined, buyModuleLifeCycle.receivedIds),
		mediator.publish.bind(undefined, buyModuleLifeCycle.errorAction)
	));

mediator.subscribe(buyModuleLifeCycle.receivedIds, buyModuleFacade.paintFirstSlide(
	mediator.publish.bind(undefined, buyModuleLifeCycle.getDOMelement)
));

mediator.subscribe(buyModuleLifeCycle.receivedIds,
	buyModuleFacade.initNavigation(
		mediator.publish.bind(undefined, buyModuleLifeCycle.getDOMelement)
));

mediator.subscribe(buyModuleLifeCycle.errorAction, function(){
	buyModuleFacade.addErrorMessageInToModule();
});

mediator.subscribe(
	buyModuleLifeCycle.getDOMelement,
	buyModuleFacade.clearDOMcontainer
);	

mediator.subscribe(
	buyModuleLifeCycle.getDOMelement,
	buyModuleFacade.toggleSpinner.bind(undefined, true)
);

mediator.subscribe(buyModuleLifeCycle.getDOMelement, buyModuleFacade.implementDOMelement(
	mediator.publish.bind(undefined, buyModuleLifeCycle.implementedItem)
));


mediator.subscribe(
	buyModuleLifeCycle.implementedItem,
	buyModuleFacade.toggleSpinner.bind(undefined, false)
);

mediator.subscribe(
	buyModuleLifeCycle.implementedItem, buyModuleFacade.addIntoDOM
);

//init buy module
mediator.publish(buyModuleLifeCycle.initBuyModule);


// modals
let aboutVideoPreview = document.getElementById('js-about-video');

mediator.subscribe(modalsLifeCycle.callModal, modalsFacade.implementModal(
	mediator.publish.bind(undefined, modalsLifeCycle.readyModal)
));

mediator.subscribe(modalsLifeCycle.readyModal, function(modal){
	console.log('output', modal);
});

aboutVideoPreview.addEventListener('click', evt => {

	evt.preventDefault();
	mediator.publish(modalsLifeCycle.callModal, {
		category: 'modals',
		id: 'aboutvideo'
	});

});

