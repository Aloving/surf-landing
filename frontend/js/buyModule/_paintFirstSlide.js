export function paintFirstSlide(publishcb){
	return function(gettingIds){
		let id = gettingIds[0];
		publishcb(id);
	};
}