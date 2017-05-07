export function galleryActions(element){

	let previews = element.querySelectorAll('.js-board-wall_preview');

	previews.forEach((item) => {

		item.addEventListener('click', function(evt){
			evt.preventDefault();

			var active = this.classList.contains('board-wall__preview_active');
			var linkToMainImg;
			var mainImage;

			if(active) return false;

			previews.forEach(item => item.classList.remove('board-wall__preview_active'));
			this.classList.add('board-wall__preview_active');


			linkToMainImg = this.getAttribute('href');
			mainImage = document.querySelector('.js-board-wall_main-image');

			mainImage.classList.add('board-wall__opacity-state');

			setTimeout(function(){
				mainImage.setAttribute('src', linkToMainImg);
				mainImage.classList.remove('board-wall__opacity-state');
			},300)

		});

	});
	return element;
}