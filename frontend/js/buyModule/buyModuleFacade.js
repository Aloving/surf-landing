import { getBoardIds } from './_getids';
import { gettingUrlForGettingIds } from './_gettingUrlForGettingIds';
import { addErrorMessageInToModule } from './_addErrorMessageInToModule';
import { initNavigation } from './_initNavigation';
import { paintFirstSlide } from './_paintFirstSlide';
import { implementItem } from './_implementItem';

export let buyModuleFacade = (function(){
	return {
		gettingUrlForGettingIds: gettingUrlForGettingIds,
		getBoardIds: getBoardIds,
		_logging: function(arg1){
			console.log(arg1);
		},
		implementItem: implementItem,
		paintFirstSlide: paintFirstSlide,
		initNavigation: initNavigation,
		addErrorMessageInToModule: addErrorMessageInToModule
	}
})();