/*
import depencies
*/
import 'babelify-es6-polyfill';
import 'whatwg-fetch';

/*
	import main modules
*/
import { mediator } from './app-mediator';
import { implementModal } from './modals/_implementModal';
import { appFacade } from './__facade__app';
import { buyModuleFacade } from './buyModule/__facade__buymodule';
import { lory } from 'lory.js';
import { scrollToY } from './modules/scrollTo';

export let _gettingUrl = appFacade.gettingUrl();


let buyModuleLifeCycle = {
	initBuyModule: 'initBuyModule',
	initIds: 'initIds',
	receivedIds: 'receivedIds',
	fetchIds: 'fetchIds',
	errorAction: 'errorAction',
	implementedItem: 'implementedItem',
	getDOMelement: 'getDOMelement',
	initNavigation: 'initNavigation'
};

let modalsLifeCycle = {
	callModal: 'callModal',
	readyModal: 'readyModal'
};


//middle menu
var scrollTimeOut;
let headerMenu = document.querySelector('.js-header-menu');

window.addEventListener('scroll', function(){
	clearTimeout(scrollTimeOut);
	scrollTimeOut = setTimeout(function(){
		if(window.pageYOffset >= 300 && !headerMenu.classList.contains('header__menu_middle')){
			headerMenu.classList.add('header__menu_middle');
		}else if(window.pageYOffset < 300 && headerMenu.classList.contains('header__menu_middle')){
			headerMenu.classList.remove('header__menu_middle');
		}
	},100);
});

//menu navigation
var navLinks = document.getElementsByClassName('js-nav-link');

Array.prototype.forEach.call(navLinks, item => {

	item.addEventListener('click', function(evt){
		evt.preventDefault();
		let thatId = this.getAttribute('data-sectionavname');
		let sectionById = document.querySelector(`.js-section[data-sectionname="${thatId}"]`);
		scrollToY(sectionById.getBoundingClientRect().top, 600, 'easeInOutQuint');
	});

});

mediator.subscribe(buyModuleLifeCycle.initBuyModule, mediator.publish.bind(undefined, buyModuleLifeCycle.initIds));

mediator.subscribe(buyModuleLifeCycle.initIds, buyModuleFacade.initIds(
	mediator.publish.bind(undefined, buyModuleLifeCycle.receivedIds),
	mediator.publish.bind(undefined, buyModuleLifeCycle.fetchIds)
));

mediator.subscribe(buyModuleLifeCycle.fetchIds, buyModuleFacade.fetchIds(		
		mediator.publish.bind(undefined, buyModuleLifeCycle.receivedIds),
		mediator.publish.bind(undefined, buyModuleLifeCycle.errorAction)
	));

mediator.subscribe(buyModuleLifeCycle.receivedIds, buyModuleFacade.paintFirstSlide(
	mediator.publish.bind(undefined, buyModuleLifeCycle.getDOMelement)
));

mediator.subscribe(buyModuleLifeCycle.receivedIds,
	buyModuleFacade.initNavigation(
		mediator.publish.bind(undefined, buyModuleLifeCycle.getDOMelement)
));

mediator.subscribe(buyModuleLifeCycle.errorAction, function(){
	buyModuleFacade.addErrorMessageInToModule();
});

mediator.subscribe(
	buyModuleLifeCycle.getDOMelement,
	buyModuleFacade.clearDOMcontainer
);	

mediator.subscribe(
	buyModuleLifeCycle.getDOMelement,
	buyModuleFacade.toggleSpinner.bind(undefined, true)
);

mediator.subscribe(buyModuleLifeCycle.getDOMelement, buyModuleFacade.implementDOMelement(
	mediator.publish.bind(undefined, buyModuleLifeCycle.implementedItem)
));


mediator.subscribe(
	buyModuleLifeCycle.implementedItem,
	buyModuleFacade.toggleSpinner.bind(undefined, false)
);

mediator.subscribe(
	buyModuleLifeCycle.implementedItem, buyModuleFacade.addIntoDOM
);

//init buy module
mediator.publish(buyModuleLifeCycle.initBuyModule);


// modals
var aboutVideoPreview = document.getElementById('js-about-video');
var aboutReadMode = document.getElementById('js-about-more');

mediator.subscribe(modalsLifeCycle.callModal, implementModal);

aboutVideoPreview.addEventListener('click', evt => {

	evt.preventDefault();
	mediator.publish(modalsLifeCycle.callModal, {
		category: 'modals',
		id: 'aboutVideo'
	});

});

aboutReadMode.addEventListener('click', evt => {

	evt.preventDefault();
	mediator.publish(modalsLifeCycle.callModal, {
		category: 'modals',
		id: 'aboutMore'
	});

});

//carousel

const slider = document.querySelector('.js_slider');
var teammatesElements = document.getElementsByClassName('js-teammate');

lory(slider, {
	infinite: 4
});

Array.prototype.forEach.call(teammatesElements, item => {

	item.addEventListener('click', function(){
		let teammateId = this.getAttribute('data-slidekey');

		mediator.publish(modalsLifeCycle.callModal, {
			category: 'teammates',
			id: teammateId
		});
	});

});

//news 
var news = document.getElementsByClassName('js-new');

Array.prototype.forEach.call(news, item => {

	item.addEventListener('click', function(){
		let newId = this.getAttribute('data-newid');

		mediator.publish(modalsLifeCycle.callModal, {
			category: 'news',
			id: newId
		});
	});

});