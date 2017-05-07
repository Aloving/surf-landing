export function cascheStorage(publishCacheItem, createItem){


	return function(id){		

		let localCache = {

		};

		function gettingItem(item){
			localCache[item] ? publishCacheItem(localCache[item]) : createItem(item);
		}

		function addItem(item){
			let id = item.querySelector('.js-id').dataset.productid;
			localCache[id] = item;
				console.log(localCache);
		}

		return{
			gettingItem: gettingItem,
			addItem: addItem
		}

	}

}