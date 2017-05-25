import { fetchMap } from '../modules/__facade__fetchMap';
import { _gettingUrl } from '../app';

export function fetchIds(receivedIds, errorAction){
	return function(){
		fetchMap.getBoardIds(
			receivedIds,
			errorAction
		)(_gettingUrl('boardsIds'));
	};
}