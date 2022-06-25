// Hamburger button
const hamburgerBtn = document.querySelector(".hamburger-btn");

hamburgerBtn.addEventListener("click", () => {
  hamburgerBtn.classList.toggle("open");
});

// Image Carousel
const slider = document.querySelector(".client-portrait");
const firstImage = document.querySelector("#client-1");
const secondImage = document.querySelector("#client-2");
const thirdImage = document.querySelector("#client-3");

function AutomatedImageSlider() {}

setTimeout(AutomatedImageSlider, 3000);
