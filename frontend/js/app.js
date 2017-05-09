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

/*
	@gettingIdsUrl 				= get url from 'body - tag' for getting ids of goods
	@gettingIds 					= getting ids of goods
	@needIttem 						= tell the pubsub that you need a item
	@implementedItem 			= realization of item
*/

let lifeCycle = {
	gettingIdsUrl: 'gettingIdsUrl',
	gettingIds: 'gettingIds',
	needItem: 'needItem',
	implementedItem: 'implementedItem'
};

// initialize buy module
try{

	/*
		subscribers on @gettingIdsUrl	
	*/
	mediator.subscribe(
		lifeCycle.gettingIdsUrl,
		buyModuleFacade.getBoardIds(
			mediator.publish,
			buyModuleFacade.addErrorMessageInToModule,
			lifeCycle.gettingIds
		)
	);

	/*
		subscribers on @gettingIds
	*/

	mediator.subscribe(
		lifeCycle.gettingIds,
		buyModuleFacade.initNavigation(
			mediator.publish.bind(undefined, lifeCycle.needItem)
		)
	);

	mediator.subscribe(
		lifeCycle.gettingIds,
		buyModuleFacade.paintFirstSlide(
			mediator.publish.bind(undefined, lifeCycle.needItem)
		)
	);

	/*
		subcribers on @needItem life tick
	*/

	mediator.subscribe(
		lifeCycle.needItem,
		buyModuleFacade.clearDOMcontainer
	);	

	mediator.subscribe(
		lifeCycle.needItem,
		buyModuleFacade.toggleSpinner.bind(undefined, true)
	);

	mediator.subscribe(
		lifeCycle.needItem,
		buyModuleFacade.implementItem(
			mediator.publish.bind(undefined, lifeCycle.implementedItem)
		)
	);


	/*
		subcribers on @implementedItem life tick
	*/

	mediator.subscribe(
		lifeCycle.implementedItem,
		buyModuleFacade.toggleSpinner.bind(undefined, false)
	);

	mediator.subscribe(
		lifeCycle.implementedItem, buyModuleFacade.addIntoDOM
	);


	/* ==============================
							publishers
		 ==============================
	 */
	mediator.publish(lifeCycle.gettingIdsUrl, buyModuleFacade.gettingUrlForGettingIds());
}catch(err){
	buyModuleFacade.addErrorMessageInToModule();
	throw err;
}
