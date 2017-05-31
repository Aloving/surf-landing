let headerMenu = document.querySelector('.js-header-menu');

export function middleMenu(){
	console.log(window.pageYOffset, !headerMenu.classList.contains('header__menu_middle'));
	if(window.pageYOffset >= 300 && !headerMenu.classList.contains('header__menu_middle')){
		headerMenu.classList.add('header__menu_middle');
	}else if(window.pageYOffset < 300 && headerMenu.classList.contains('header__menu_middle')){
		headerMenu.classList.remove('header__menu_middle');
	}
}