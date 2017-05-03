import 'babel-polyfill';
import Rx from 'rxjs';

import { mediator } from './surfCore';
import { buyModuleFacade } from './buyModule/buyModuleFacade';


// initialize buy module
try{
	mediator.subscribe('gettingIdsUrl', buyModuleFacade._getBoardIds(mediator.publish, 'gettingIds'));
	mediator.subscribe('gettingIds', buyModuleFacade._logging)

	mediator.publish('gettingIdsUrl', buyModuleFacade._gettingUrlForGettingIds());
	// mediator.publish('gettingIds', buyModuleFacade._getBoardIds())
}catch(err){
	buyModuleFacade._addErrorMessageInToModule();
	throw err;
};