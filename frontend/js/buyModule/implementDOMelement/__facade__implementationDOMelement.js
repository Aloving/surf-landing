import { cacheStorage } from '../../modules/cacheStorage';
import { fetchData } from './_fetchData';
import { initWallInteractive } from './templateBoardWall/_initWallActions';
import { templateModule } from './templateBoardWall/_templateModule';
import { loadImages } from './_loadImages';
import { createDOMelement } from './templateBoardWall/_createDomElement';


export let facade = {
	cacheStorage: cacheStorage,
	fetchData: fetchData,
	templateModule: templateModule,
	createDOMelement: createDOMelement,
	loadImages: loadImages,
	initWallInteractive: initWallInteractive
};
