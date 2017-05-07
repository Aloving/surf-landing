import { cascheStorage } from './_cache-storage';
import { createItem } from './createItem/_create-item';


export let facade = (function(){
	return {
		cascheStorage: cascheStorage,
		createItem: createItem
	}
})();