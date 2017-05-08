export function cacheStorage(publishCacheItem, createItem){

	return function(id){		

		let localCache = {
		};

		function gettingItem(item){
			localCache[item] ? publishCacheItem(localCache[item]) : createItem(item);
		}

		function addItem(item){
			let id = item.querySelector('.js-id').getAttribute('data-productid');
			localCache[id] = item;
		}

		return{
			gettingItem: gettingItem,
			addItem: addItem
		}

	}

}