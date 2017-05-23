/*
import depencies
*/
import 'babelify-es6-polyfill';
import 'whatwg-fetch';

/*
	import main modules
*/
import { mediator } from './app-mediator';
import { buyModuleFacade } from './buyModule/__facade__buymodule';
import { modalsFacade } from './modals/__facade__modalsActions';
import { gettingUrl } from './modules/gettingUrl';

let _gettingUrl = gettingUrl(setUrls);

/*
	@gettingIdsUrl 				= get url from 'body - tag' for getting ids of goods
	@gettingIds 					= getting ids of goods
	@needIttem 						= tell the pubsub that you need a item
	@implementedItem 			= realization of item
*/

let urls;

let buyModuleLifeCycle = {
	gettingIdsUrl: 'gettingIdsUrl',
	gettingIds: 'gettingIds',
	needItem: 'needItem',
	implementedItem: 'implementedItem'
};

let modalsLifeCycle = {
	callModal: 'callmodal',
	checkCache: 'checkCache',
	exceptCacheStep: 'exceptCacheStep', 
	getModalUrl: 'getModalUrl',
	getModalContent: 'getModalContent',
	createModal: 'createModal',
	needAggregationParams: 'needAggregationParams'
};
let aggregationParams;

try{
	//callmodal 

	// check cache first ( 1 )
	/*
		subscribers on @modalsLifeCycle.callModal	
	*/
	mediator.subscribe(modalsLifeCycle.callModal, function(ext){
		modalsFacade.cacheStorage(
			mediator.publish.bind(undefined, modalsLifeCycle.getModalContent),
			mediator.publish.bind(undefined, modalsLifeCycle.exceptCacheStep)
		).gettingItem(ext.category, ext.id);
	});

	mediator.subscribe(modalsLifeCycle.exceptCacheStep, function(params){
		mediator.publish(modalsLifeCycle.getModalUrl, _gettingUrl(urls, params.id));
	});

	mediator.subscribe(modalsLifeCycle.exceptCacheStep, function(params){
		aggregationParams = params;
	});

	mediator.subscribe(modalsLifeCycle.getModalUrl,
		modalsFacade.getHtmlContent(
			mediator.publish.bind(undefined, modalsLifeCycle.getModalContent)
		)
		//todo add error action
	);


	/*
		subscribers on @modalsLifeCycle.getModalContent	
	*/
	mediator.subscribe(modalsLifeCycle.getModalContent, function(modalContent){
		modalsFacade.cacheStorage().addItem({
			id: aggregationParams.id,
			category: aggregationParams.category,
			DOMelement: modalContent,
			jsonView: null
		});
	});
	/*
		create modal with received content, step ( 5 )
	*/
	mediator.subscribe(modalsLifeCycle.getModalContent, function(modalView){
		if(modalView.DOMelement){
			modalsFacade.createModal(modalView.DOMelement);
		}else{
			modalsFacade.createModal(modalView);
		}
	});

} catch(err) {
	throw err;
}




// initialize buy module
try{

	/*
		subscribers on @gettingIdsUrl	
	*/
	mediator.subscribe(
		buyModuleLifeCycle.gettingIdsUrl,
		buyModuleFacade.getBoardIds(
			mediator.publish.bind(undefined, buyModuleLifeCycle.gettingIds),
			buyModuleFacade.addErrorMessageInToModule
		)
	);

	/*
		subscribers on @gettingIds
	*/

	mediator.subscribe(
		buyModuleLifeCycle.gettingIds,
		buyModuleFacade.initNavigation(
			mediator.publish.bind(undefined, buyModuleLifeCycle.needItem)
		)
	);

	mediator.subscribe(
		buyModuleLifeCycle.gettingIds,
		buyModuleFacade.paintFirstSlide(
			mediator.publish.bind(undefined, buyModuleLifeCycle.needItem)
		)
	);

	/*
		subcribers on @needItem life tick
	*/

	mediator.subscribe(
		buyModuleLifeCycle.needItem,
		buyModuleFacade.clearDOMcontainer
	);	

	mediator.subscribe(
		buyModuleLifeCycle.needItem,
		buyModuleFacade.toggleSpinner.bind(undefined, true)
	);

	mediator.subscribe(
		buyModuleLifeCycle.needItem,
		buyModuleFacade.implementItem(
			mediator.publish.bind(undefined, buyModuleLifeCycle.implementedItem)
		)
	);


	/*
		subcribers on @implementedItem life tick
	*/

	mediator.subscribe(
		buyModuleLifeCycle.implementedItem,
		buyModuleFacade.toggleSpinner.bind(undefined, false)
	);

	mediator.subscribe(
		buyModuleLifeCycle.implementedItem, buyModuleFacade.addIntoDOM
	);


	/* ==============================
							publishers
		 ==============================
	 */
	mediator.publish(
		buyModuleLifeCycle.gettingIdsUrl,
		_gettingUrl(urls, 'boardIdsUrl')
	);
}catch(err){
	buyModuleFacade.addErrorMessageInToModule();
	throw err;
}


//helpers
function setUrls(gettedUrls){
	urls = gettedUrls;
}


//event listeners
let aboutVideoElement = document.getElementById('js-about-video');
aboutVideoElement.addEventListener('click', (e) => {
	e.preventDefault();
	mediator.publish(modalsLifeCycle.callModal, {
		category: 'modal',
		id: 'video'
	});
});