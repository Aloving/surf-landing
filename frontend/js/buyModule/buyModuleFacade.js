import { getBoardIds } from './_getids';

export let buyModuleFacade = (function(){
	return {
		_getBoardIds: getBoardIds,
		_logging: function(arg1){
			console.log(arg1);
		}
	}
})();