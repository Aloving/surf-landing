export function galleryActions(element){

	//get previews of element
	let previews = element.querySelectorAll('.js-board-wall_preview');
	Array.prototype.forEach.call(previews, item => {

		item.addEventListener('click', function(evt){
			evt.preventDefault();

			//get active
			var active = this.classList.contains('board-wall__preview_active');
			var linkToMainImg;
			var mainImage;

			//if active stop function
			if(active) return false;

			//else make clicked element be active
			Array.prototype.forEach.call(previews, item => item.classList.remove('board-wall__preview_active'));
			this.classList.add('board-wall__preview_active');

			//add new image as main
			mainImage = element.querySelector('.js-board-wall_main-image');
			mainImage.classList.add('board-wall__opacity-state');

			//set interval for easy animation
			linkToMainImg = this.getAttribute('href');
			setTimeout(function(){
				mainImage.setAttribute('src', linkToMainImg);
				mainImage.classList.remove('board-wall__opacity-state');
			},300)

		});

	});

	return element;
}