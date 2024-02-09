
// When the user clicks on the button, scroll to the top of the document
function scrollTo(pos) {
	document.body.scrollTop = pos; // For Safari
	document.documentElement.scrollTop = pos; // For Chrome, Firefox, IE and Opera
}

function disableScroll() {
	document.body.style.overflow = 'hidden';
}
function enableScroll() {
	document.body.style.overflow = '';
}

function showFullscreen(img) {
	// Remember current scroll position
	var scrollPos = document.body.scrollTop || document.documentElement.scrollTop;

	// Create fullscreen element
	var fullscreen = document.getElementById("fullscreen");

	// Add image to fullscreen element
	var imgElement = document.createElement("img");
	imgElement.src = img.src;
	fullscreen.appendChild(imgElement);

	// Show fullscreen element
	fullscreen.style.display = "flex";

	// Add the "active" class to the fullscreen element
	fullscreen.classList.add('active');

	// Set the opacity of the fullscreen element to 1 (fade it in)
	setTimeout(() => {
		fullscreen.style.opacity = 1;
	}, 10);

	// Calculate the scaling factor to fill the screen
	const screenAspectRatio = window.innerWidth / window.innerHeight;
	const imageAspectRatio = imgElement.naturalWidth / imgElement.naturalHeight;
	const scaleFactor = imageAspectRatio > screenAspectRatio
		? window.innerWidth / (imgElement.naturalWidth * window.devicePixelRatio)
		: window.innerHeight / (imgElement.naturalHeight * window.devicePixelRatio);

	// Set the transform property of the image to scale the image by the calculated factor
	imgElement.style.transform = `scale(1)`;
	imgElement.style.width = '100%';
	imgElement.style.height = '100%';
	imgElement.style.objectFit = 'contain';

	disableScroll();

	// Add event listener to exit fullscreen mode
	function exitFullscreen() {
		enableScroll();
		scrollTo(scrollPos);

		// Remove the "active" class from the fullscreen element
		fullscreen.classList.remove('active');

		// Set the opacity of the fullscreen element to 0 (fade it out)
		fullscreen.style.opacity = 0;

		// Set the transform property of the image to scale(0.7) (shrink it)
		imgElement.style.transform = 'scale(0.7)';

		fullscreen.removeEventListener("click", exitFullscreen);
		window.removeEventListener("popstate", exitFullscreen);
		document.removeEventListener("keydown", exitFullscreen);

		// Hide the fullscreen element from the DOM after the fade out transition
		// and remove child element
		setTimeout(() => {
			fullscreen.style.display = "none";
			fullscreen.removeChild(imgElement);
		}, 200);
		}

	fullscreen.addEventListener("click", exitFullscreen);
	window.addEventListener("popstate", exitFullscreen);
	document.addEventListener("keydown", function(event) {
		if (event.key === "Escape") {
			exitFullscreen();
		}
	});

	history.pushState(null, null, "");
}
