let _DOMcache = {
};

/*
		3 conditions: 
			1: publishDOMElement - if need DOM element from cache;
			2: publishLSelement - if need JSON element from cache;
			3: publishCreate - publish that need create from scratch;
*/
export function cacheStorage(actions){

	// return item or false
	function gettingItem(category, id){

		let DOMelement = getFromDOMCache(category,id);
		var JSONelement;

		if(DOMelement) return actions.publishDOMElement(DOMelement);

		JSONelement = getFromLocalStorage(category,id);
		if(JSONelement) return actions.publishLSelement(JSONelement, {category, id});

		actions.publishCreate({category, id});
	}

	function getFromDOMCache(category, id){

		if(!_DOMcache[category]){
			return false;
		}else if(_DOMcache[category] && _DOMcache[category][id]){
			return _DOMcache[category] && _DOMcache[category][id];
		}

	}

	function getFromLocalStorage(category, id){

		let jsonCategory = localStorage.getItem(category) && JSON.parse(localStorage.getItem(category));

		if(!jsonCategory){
			return false;
		}else{
			return jsonCategory[id] || false;
		}

	}

	function setIntoLocalStorage(category, id, item){

		let lsCat = localStorage.getItem(category) ? JSON.parse(localStorage.getItem(category)) : {};

		lsCat[id] = item;
		localStorage.setItem(category, JSON.stringify(lsCat));

	}

	function setIntoLocalCache(category, id, item){
		if(_DOMcache[category]){
			_DOMcache[category][id] = item;
		}else{
			_DOMcache[category] = {};
			_DOMcache[category][id] = item;
		}
	}
	
	return{
		gettingItem: gettingItem,
		setIntoLocalStorage: setIntoLocalStorage,
		setIntoLocalCache: setIntoLocalCache
	};

}