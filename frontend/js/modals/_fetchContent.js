import { fetchMap } from '../modules/__facade__fetchMap';
import { _gettingUrl } from '../app';

export function fetchContent(publishcb, errcb){
	return function(list){
		fetchMap.getModalContent(
			publishcb,errcb
		)(_gettingUrl(list.category, list.id), list);
	};
}