/* load new page inline -- see pagination.html for elements */
/* we only have two dynamic elements, so we can just replace those with the next page */

const FADE_TIME = .2;

document.querySelector('#main-content').style.transition = `opacity ${FADE_TIME}s`;

let load_page = (url) => {
	document.querySelector('#main-content').style.opacity = 0;
	
	setTimeout(() => {
		fetch(url).then(response => response.text()).then(data => {
			let responseDocument = (new DOMParser()).parseFromString(data, "text/html");
			
			[ '#main-content' ].forEach((selector) => {
				/* remove children and replace with new ones */
				let selection = document.querySelector(selector);
				
				selection.innerHTML = '';
				responseDocument.querySelectorAll(`${selector} > *`).forEach(e =>
					selection.appendChild(e)
				);
			});
			
			document.querySelector('#motd-buttons').replaceWith(
					responseDocument.querySelector('#motd-buttons'));
			document.querySelector('#main-content').style.opacity = 1;
			
			/* execute inline scripts */
			document.querySelectorAll('#main-content script').forEach(e => eval(e.innerHTML));
			
			window.history.pushState(url, "wew", url);
		});
	}, FADE_TIME * 1000);
};

document.querySelector('footer').addEventListener('click', event => {
	let currentEvent = event || window.event;
	let target = event.target || event.srcElement;
	
	do {
		if (target.classList && target.classList.contains('nav-arrow')
					&& target.getAttribute('href')) {
			event.preventDefault();
			return load_page(target.getAttribute('href'));
		}
	} while (target = target.parentNode);
});

window.onpopstate = (event) => {
	load_page(document.location);
};
