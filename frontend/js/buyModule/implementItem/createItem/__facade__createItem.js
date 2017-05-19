import { fetchData } from './_fetchData';
import { initWallActions } from './templateBoardWall/_initWallActions';
import { templateModule } from './templateBoardWall/_templateModule';
import { createDOMelement } from './templateBoardWall/_createDomElement';


export let facade = {
	fetchData: fetchData,
	templateModule: templateModule,
	createDOMelement: createDOMelement,
	initWallActions: initWallActions
};
