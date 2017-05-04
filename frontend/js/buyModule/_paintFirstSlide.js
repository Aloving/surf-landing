export function paintFirstSlide(publishcb, publishTag){
	return function(gettingIds){
		let id = gettingIds[0];
		publishcb(publishTag, id);
	}
}