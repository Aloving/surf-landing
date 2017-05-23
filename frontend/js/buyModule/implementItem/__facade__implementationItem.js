import { cacheStorage } from '../../modules/cacheStorage';
import { createItem } from './createItem/_createItem';


export let facade = {
	cacheStorage: cacheStorage,
	createView: createItem
};
