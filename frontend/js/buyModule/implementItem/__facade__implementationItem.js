import { cacheStorage } from './_cacheStorage';
import { createItem } from './createItem/_createItem';


export let facade = (function(){
	return {
		cacheStorage: cacheStorage,
		createItem: createItem
	}
})();