import { randomiseImgs, clearBackInt } from "./master.js";
// Check if there's local storage color option
let mainColors = localStorage.getItem("color_option");
if (mainColors !== null) {
  document.documentElement.style.setProperty(
    "--main-color",
    localStorage.getItem("color_option")
  );
  document.querySelectorAll(".colors-list li").forEach((el) => {
    el.classList.remove("active");
    if (el.dataset.color === mainColors) {
      el.classList.add("active");
    }
  });
}

// Random background option
export let backgroundOption = true;

// Check for random background option
let randomBackground = localStorage.getItem("random_background");
if (randomBackground !== null) {
  document.querySelectorAll(".random-backgrounds span").forEach((sp) => {
    sp.classList.remove("active");
    if (sp.dataset.background === randomBackground) {
      sp.classList.add("active");
      if (sp.dataset.background === "yes") {
        backgroundOption = true;
        randomiseImgs();
      } else {
        backgroundOption = false;
        clearBackInt();
      }
    }
  });
}

// Toggle Spin Class On Icon
document.querySelector(".toggle-settings .fa-gear").onclick = function () {
  this.classList.toggle("fa-spin");
  document.querySelector(".settings-box").classList.toggle("opened");
};

// Switch Colors
const colorsLi = document.querySelectorAll(".colors-list li");
colorsLi.forEach((li) => {
  li.addEventListener("click", (e) => {
    // Set color on root
    document.documentElement.style.setProperty(
      "--main-color",
      e.target.dataset.color
    );
    localStorage.setItem("color_option", e.target.dataset.color);
    handleActive(e);
  });
});

// Switch random background option
const randomBackgroundsSpan = document.querySelectorAll(
  ".random-backgrounds span"
);
randomBackgroundsSpan.forEach((sp) => {
  sp.addEventListener("click", (e) => {
    localStorage.setItem("random_background", e.target.dataset.background);
    handleActive(e);
    if (e.target.dataset.background === "yes") {
      backgroundOption = true;
      randomiseImgs();
    } else {
      backgroundOption = false;
      clearBackInt();
    }
  });
});

// Show Bullets Option
let bulletsContainer = document.querySelector(".nav-bullets");
let bulletsSpan = document.querySelectorAll(".site-bullets span");
let bulletsLocalStorage = localStorage.getItem("bullets_option");

if (bulletsLocalStorage !== null) {
  bulletsSpan.forEach((span) => {
    span.classList.remove("active");
  });

  if (bulletsLocalStorage === "block") {
    bulletsContainer.style.display = "block";
    document.querySelector(".site-bullets .yes").classList.add("active");
  } else {
    bulletsContainer.style.display = "none";
    document.querySelector(".site-bullets .no").classList.add("active");
  }
}

bulletsSpan.forEach((span) => {
  span.addEventListener("click", (e) => {
    if (span.dataset.bullets === "yes") {
      bulletsContainer.style.display = "block";
      localStorage.setItem("bullets_option", "block");
    } else {
      bulletsContainer.style.display = "none";
      localStorage.setItem("bullets_option", "none");
    }
    handleActive(e);
  });
});

// Handle active function
function handleActive(ev) {
  ev.target.parentElement
    .querySelectorAll(".active")
    .forEach((el) => el.classList.remove("active"));
  ev.target.classList.add("active");
}

// Reset Button
document.querySelector(".reset-options").onclick = function () {
  // localStorage.clear();
  localStorage.removeItem("bullets_option");
  localStorage.removeItem("color_option");
  localStorage.removeItem("random_background");
  // Reload window
  window.location.reload();
};
