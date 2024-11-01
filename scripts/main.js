
window.addEventListener("scroll", function () {
    var header = document.querySelector(".site_heading");

    if (window.scrollY > 0) {
        header.classList.add("scrolled");
    } else {
        header.classList.remove("scrolled");
    }
});

var slideIndex = 0;
var seconds = 10;

showSlides();

function showSlides() {
    var i;
    var slides = document.getElementsByClassName("carousel-item");
    for (i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";
    }
    slideIndex++;
    if (slideIndex > slides.length) { slideIndex = 1 }

    slides[slideIndex - 1].style.display = "block";

    setTimeout(showSlides, seconds * 1000); // Change image every specified seconds in MS
}

// View album details
// document.querySelector(".banner.link").addEventListener("click", function () {
// });

const zoomContainers = document.querySelectorAll('.zoom_container');

// JavaScript code to display the popup when the page loads
document.addEventListener("DOMContentLoaded", function () {
    var delayInMilliseconds = 2000; // Delay in milliseconds before showing the popup (e.g., 3000 milliseconds = 3 seconds)

    var popup = document.getElementById("notice");
    var closeButton = document.getElementById("closePopup");

    if (popup) {
        setTimeout(function () {
            popup.classList.add("show");
        }, delayInMilliseconds);
    }

    // JavaScript code to close the popup when the close button is clicked
    if (closeButton) {
        closeButton.addEventListener("click", function () {
            if (popup) {
                popup.classList.remove("show");
            }
        });
    }
});