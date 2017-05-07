import { fetchData } from './_fetch-data';
import { initWallActions } from './templateBoardWall/_init-wall-actions';
import { templateModule } from './templateBoardWall/_template-module';
import { createDOMelement } from './templateBoardWall/_create-dom-element';


export let facade = (function(){
	return{
		fetchData: fetchData,
		templateModule: templateModule,
		createDOMelement: createDOMelement,
		initWallActions: initWallActions
	}
})();