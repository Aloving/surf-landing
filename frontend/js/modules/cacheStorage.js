let localCache = {
};

export function cacheStorage(publishCacheItem, createItem){		
	function gettingItem(category, id){
		let localStorageItem = localStorage.getItem(category) && JSON.parse(localStorage.getItem(category))[id];
		if(localCache[category] && localCache[category][id]){
			publishCacheItem(localCache[category][id]);
		}else if(localStorageItem){
			createItem({jsonView: localStorageItem});
		}else{
			createItem({id,category});
		}

	}

	function addItem(item){
		let { category, id, jsonView, DOMelement } = item;
		let localStorageCat = localStorage.getItem(category) ? JSON.parse(localStorage.getItem(category)) : {};

		if(!localCache[category]){
			localCache[category] = {};
		}

		if(!localCache[category][id]){
			localCache[category][id] = {};
		}else{
			return false;
		}

		localCache[category][id]['DOMelement'] = DOMelement;

		if(jsonView){
			localStorageCat[id] = jsonView;
			localStorage.setItem(category, JSON.stringify(localStorageCat));	
		}
	}
	
	return{
		gettingItem: gettingItem,
		addItem: addItem
	};

}