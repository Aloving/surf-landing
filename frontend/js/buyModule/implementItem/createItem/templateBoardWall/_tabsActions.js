import { tabSliderElementPosition } from '../../../../modules/tabSliderElementPosition';

export function tabsActions(element){
	
	//get tabs
	let tabs = element.querySelectorAll('.js-board-wall-tab-item');

	Array.prototype.forEach.call(tabs, item => {
		item.addEventListener('click', function(evt){

			evt.preventDefault();
			let tabindex = this.getAttribute('data-tabitem');
			let active = this.classList.contains('board-wall__tab_active');
			var shouldBeActive;
			var tabContainers;
			var tabs;

			if(active) return false;

			// host tabs
			tabs = element.querySelectorAll('.js-board-wall-tab-item');

			//host tabContainers (text content)
			tabContainers = element.querySelectorAll('.js-board-wall-tab-container');

			//remove active class for tab containers
			Array.prototype.forEach.call(tabContainers, item => {
				item.classList.remove('board-wall__tab-container_active')
			});

			//container that should be active
			shouldBeActive = Array.prototype.filter.call(tabContainers, item => item.getAttribute('data-tabcontainer') == tabindex)[0];

			//set active class in to item that should be active
			shouldBeActive.classList.add('board-wall__tab-container_active');

			//remove active class from tabs 
			Array.prototype.forEach.call(tabs, item => item.classList.remove('board-wall__tab_active'));

			//add active class in to this element
			this.classList.add('board-wall__tab_active');

			tabSliderElementPosition(element, this);

		});
	});
	
	return element;
}