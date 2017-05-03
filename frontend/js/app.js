import 'babel-polyfill';
import Rx from 'rxjs';

import { mediator } from './surfCore';
import { buyModuleFacade } from './buyModule/buyModuleFacade';

mediator.subscribe('gettingIds', buyModuleFacade._logging);
buyModuleFacade
	._getBoardIds()
	.then(response => response.json())
	.then(data => mediator.publish('gettingIds', data))
	.catch(err => {
		mediator.publish('gettingIds', 
			{
				type: error,
				data: err
			});
	});
