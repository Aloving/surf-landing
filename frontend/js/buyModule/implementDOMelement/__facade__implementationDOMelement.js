import { cacheStorage } from '../../modules/cacheStorage';
import { fetchData } from './_fetchData';
import { initWallInteractive } from './templateBoardWall/_initWallActions';
import { templateModule } from './templateBoardWall/_templateModule';
import { createDOMelement } from './templateBoardWall/_createDomElement';


export let facade = {
	cacheStorage: cacheStorage,
	fetchData: fetchData,
	templateModule: templateModule,
	createDOMelement: createDOMelement,
	initWallInteractive: initWallInteractive
};
