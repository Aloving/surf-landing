import { getBoardIds } from './_getids';
import { gettingUrlForGettingIds } from './_gettingUrlForGettingIds';
import { addErrorMessageInToModule } from './_addErrorMessageInToModule';
import { initNavigation } from './_initNavigation';
import { paintFirstSlide } from './_paintFirstSlide';
import { implementItem } from './implementItem/implementItem';
import { toggleSpinner } from './_toggleSpinner';
import { addIntoDOM } from './_addIntoDOM';
import { clearDOMcontainer } from './_clearDOMcontainer';

export let buyModuleFacade = (function(){
	return {
		gettingUrlForGettingIds: gettingUrlForGettingIds,
		getBoardIds: getBoardIds,
		implementItem: implementItem,
		paintFirstSlide: paintFirstSlide,
		toggleSpinner: toggleSpinner,
		addIntoDOM: addIntoDOM,
		clearDOMcontainer: clearDOMcontainer,
		initNavigation: initNavigation,
		addErrorMessageInToModule: addErrorMessageInToModule
	};
})();