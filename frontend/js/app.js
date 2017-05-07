import 'babel-polyfill';

import { mediator } from './corePubSub';
import { buyModuleFacade } from './buyModule/buyModuleFacade';

// import { initWallActions } from './buyModule/templateBoardWall/_init-wall-actions';

/*
	@gettingIdsUrl 	= get url from 'body - tag' for getting ids of goods
	@gettingIds 		= get ids of goods
	@needIttem 			= say for pubsub that need item
*/

let lifeCycle = {
	gettingIdsUrl: 'gettingIdsUrl',
	gettingIds: 'gettingIds',
	needItem: 'needItem',
	implementedItem: 'implementedItem'
}

// initialize buy module
try{

	/*
		subscribers on @gettingIdsUrl life tick
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
		subscribers on @gettingIds life tick
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
};

// document.querySelector('.board-wall').innerHTML = '';

// var b = document.createElement('div');
// b.classList.add('board-wall');
// console.log(b);

// b.innerHTML = a;
// initWallActions(b);

// setTimeout(function(){
// 	document.querySelector('.js-board-content').append(b);	
// }, 3000);


// let boardWall = document.querySelector('.board-wall');
// 
// initWallActions(boardWall);	