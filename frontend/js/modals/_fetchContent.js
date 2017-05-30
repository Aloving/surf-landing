import { fetchMap } from '../modules/__facade__fetchMap';

export function fetchContent(publishcb, errcb){
	return function(list){
		fetchMap.getModalContent(
			publishcb,errcb
		)(`${list.category}/${list.id}`, list);
	};
}