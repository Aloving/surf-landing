import { getBoardIds } from './_getids';
import { addErrorMessageInToModule } from './_addErrorMessageInToModule';
import { initNavigation } from './_initNavigation';
import { paintFirstSlide } from './_paintFirstSlide';
import { implementItem } from './implementItem/implementItem';
import { toggleSpinner } from './_toggleSpinner';
import { addIntoDOM } from './_addIntoDOM';
import { clearDOMcontainer } from './_clearDOMcontainer';

export let buyModuleFacade = {
	getBoardIds: getBoardIds,
	implementItem: implementItem,
	paintFirstSlide: paintFirstSlide,
	toggleSpinner: toggleSpinner,
	addIntoDOM: addIntoDOM,
	clearDOMcontainer: clearDOMcontainer,
	initNavigation: initNavigation,
	addErrorMessageInToModule: addErrorMessageInToModule
};