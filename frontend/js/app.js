import 'babel-polyfill';

import { mediator } from './corePubSub';
import { buyModuleFacade } from './buyModule/buyModuleFacade';

/*
	@gettingIdsUrl 	= get url from 'body - tag' for getting ids of goods
	@gettingIds 		= get ids of goods
	@needIttem 			= say for pubsub that need item
*/

let lifeCiclce = {
	gettingIdsUrl: 'gettingIdsUrl',
	gettingIds: 'gettingIds',
	needItem: 'needItem'
}

// initialize buy module
try{

	/*
		action for getting ids 
		carring callbacks for publish events
	*/
	mediator.subscribe(

		lifeCiclce.gettingIdsUrl,
		buyModuleFacade.getBoardIds(
		 	mediator.publish,
		 	buyModuleFacade.addErrorMessageInToModule,
		 	lifeCiclce.gettingIds
		)

	);

	/*
		subscribers on @gettingIds life tick
	*/
	mediator.subscribe(lifeCiclce.gettingIds, buyModuleFacade.initNavigation(mediator.publish, lifeCiclce.needItem));
	mediator.subscribe(lifeCiclce.gettingIds, buyModuleFacade.paintFirstSlide(mediator.publish, lifeCiclce.needItem));

	/*
		subcribers on @needItem life tick
	*/
	mediator.subscribe(lifeCiclce.needItem, buyModuleFacade.implementItem)

	/* ==============================
							publishers
		 ==============================
	 */
	mediator.publish(lifeCiclce.gettingIdsUrl, buyModuleFacade.gettingUrlForGettingIds());
}catch(err){
	buyModuleFacade.addErrorMessageInToModule();
	throw err;
};