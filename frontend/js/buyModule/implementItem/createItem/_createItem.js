import { mediator } from './_createItemMediator';
import { facade } from './__facade__createItem';

/*
	@needData 						= called what need data from server
	@templateItem 				= template innerHTML with fetched data
	@createDOMelement 		= created dom element founded on templated text 
	@initWallActions 			= init wall actions for dom element
	@createDOMelement 		= publish ready dom element
*/
let lifeCycle = {
	needData: 'needData',
	templateItem: 'templateItem',
	createDOMelement: 'createDOMelement',
	initWallActions: 'initWallActions',
	createdElement: 'createdElement',
	publishView: 'publishView'
};

let objectViews = {
};

/*
	subscribers on @needData	
*/
mediator.subscribe(lifeCycle.needData, facade.fetchData(
	mediator.publish.bind(undefined, lifeCycle.templateItem)
));

/*
	subscribers on @templateItem	
*/
mediator.subscribe(lifeCycle.templateItem, function(json){
	objectViews.jsonView = json;
	objectViews.id = json._id;
	objectViews.category = 'boards';
});
mediator.subscribe(lifeCycle.templateItem, facade.templateModule(
	mediator.publish.bind(undefined, lifeCycle.createDOMelement)
));


/*
	subscribers on @createDOMelement	
*/
mediator.subscribe(lifeCycle.createDOMelement, facade.createDOMelement(
	mediator.publish.bind(undefined, lifeCycle.initWallActions)
));


/*
	subscribers on @initWallActions	
*/
mediator.subscribe(lifeCycle.initWallActions, facade.initWallActions(
	mediator.publish.bind(undefined, lifeCycle.createdElement)
));

/*
	subscribers on @createdElement	
*/
mediator.subscribe(lifeCycle.createdElement, function(domElement){
	objectViews.DOMelement = domElement;
	mediator.publish(lifeCycle.publishView, objectViews);
});

export function createItem(publishcb){
	mediator.subscribe(lifeCycle.publishView, publishcb);
	return function(ext){
		setTimeout(() => {
			if(ext.jsonView){
				mediator.publish(lifeCycle.templateItem, ext.jsonView);
			}else{
				mediator.publish(lifeCycle.needData, ext);
			}
		}, 500);
	};
}