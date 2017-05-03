import { getBoardIds } from './_getids';
import { gettingUrlForGettingIds } from './_gettingUrlForGettingIds';
import { addErrorMessageInToModule } from './_addErrorMessageInToModule';

export let buyModuleFacade = (function(){
	return {
		_gettingUrlForGettingIds: gettingUrlForGettingIds,
		_getBoardIds: getBoardIds,
		_logging: function(arg1){
			console.log(arg1);
		},
		_addErrorMessageInToModule: addErrorMessageInToModule
	}
})();