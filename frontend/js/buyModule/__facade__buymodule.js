import { initIds } from './_initIds';
import { fetchIds } from './_fetchIds';
import { addErrorMessageInToModule } from './_addErrorMessageInToModule';
import { initNavigation } from './_initNavigation';
import { paintFirstSlide } from './_paintFirstSlide';
import { implementDOMelement } from './implementDOMelement/implementDOMelement';
import { toggleSpinner } from './_toggleSpinner';
import { addIntoDOM } from './_addIntoDOM';
import { clearDOMcontainer } from './_clearDOMcontainer';

export let buyModuleFacade = {
	initIds: initIds,
	fetchIds: fetchIds,
	implementDOMelement: implementDOMelement,
	paintFirstSlide: paintFirstSlide,
	toggleSpinner: toggleSpinner,
	addIntoDOM: addIntoDOM,
	clearDOMcontainer: clearDOMcontainer,
	initNavigation: initNavigation,
	addErrorMessageInToModule: addErrorMessageInToModule
};