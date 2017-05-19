import { cacheStorage } from './_cacheStorage';
import { createItem } from './createItem/_createItem';


export let facade = {
	cacheStorage: cacheStorage,
	createItem: createItem
};
