import { cacheStorage } from './cacheStorage';

//todo add to localstorate
function _getBoardIds(cb, errcb){
	return function(url){
		fetch(url,{
			method: 'post',
			headers: {
				'Content-Type': 'application/json'
			}
		})
		.then(response => response.json())
		.then(data => {
			cb(data);
			cacheStorage().setIntoLocalStorage('commons', 'boardsIds', data);
		})
		.catch(errcb);
	};
}

function _fetchBoard(cb, errcb){
	return function(list){
		fetch(`/getboard/${list.id}`, {
			method: 'post',
			headers: {
				'Content-Type': 'application/json'
			}
		})
		.then(data => data.json())
		.then(data => {
			cb(data);
			cacheStorage().setIntoLocalStorage(list.category, list.id, data);
		})
		.catch(function(err){
			errcb();
			throw err;
		});
	};
}

export function _getModalContent(publishcb, errcb){
	return function(url){
		fetch(url, {method: 'GET'})
			.then(data => data.text())
			.then(publishcb)
			.catch(errcb);
	};
}

export let fetchMap = {
	getBoardIds: _getBoardIds,
	fetchBoard: _fetchBoard,
	getModalContent: _getModalContent
};