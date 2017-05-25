import { fetchMap } from '../../modules/__facade__fetchMap';

export function fetchData(templateFromJson, errorAction){
	return function(list){
		fetchMap.fetchBoard(
			templateFromJson,
			errorAction
		)(list);
	};
}