import { cacheStorage } from '../modules/cacheStorage';

export function initIds(receivedIds, fetchIds){
	return function(){
		cacheStorage({
			publishLSelement: receivedIds,
			publishCreate: fetchIds
		}).gettingItem('commons', 'boardsIds');
	};
}