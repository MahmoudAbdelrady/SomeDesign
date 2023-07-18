import { backgroundOption } from "./settings.js";
// Select Landing Page element
let landingPage = document.querySelector(".landing-page");
// Get array of imgs
let imgsArray = [];
for (let i = 0; i < 5; i++) {
  imgsArray.push(`0${i + 1}.jpg`);
}

let backgroundInterval;
// Function to randomise imgs
function randomiseImgs() {
  if (backgroundOption) {
    backgroundInterval = setInterval(() => {
      // Get random number
      let randomNumber = Math.floor(Math.random() * imgsArray.length);
      // Change background image url
      landingPage.style.backgroundImage = `url("imgs/${imgsArray[randomNumber]}")`;
    }, 8000);
  }
}

function clearBackInt() {
  clearInterval(backgroundInterval);
}

export { randomiseImgs, clearBackInt };

// Select skills selector
let skills = document.querySelector(".skills");
window.onscroll = function () {
  if (window.scrollY >= skills.offsetTop - 559) {
    let allSkills = document.querySelectorAll(
      ".skill-box .skill-progress span"
    );
    allSkills.forEach((skill) => {
      skill.style.width = skill.dataset.progress;
      skill.innerHTML = skill.dataset.progress;
    });
  }
};

// Create Popup with the image
let gallery = document.querySelectorAll(".gallery img");
gallery.forEach((img) => {
  img.addEventListener("click", (e) => {
    // Create overlay element
    let overlay = document.createElement("div");
    // Add class to overlay
    overlay.className = "popup-overlay";
    // Append overlay to the body
    document.body.appendChild(overlay);
    // Create the popup
    let popupBox = document.createElement("div");
    // Add class to the popup box
    popupBox.className = "popup-box";
    if (img.alt !== null) {
      // Create Heading
      let imgHeading = document.createElement("h3");
      // Create text for heading
      let imgText = document.createTextNode(img.alt);
      imgHeading.appendChild(imgText);
      // Append heading to popup box
      popupBox.appendChild(imgHeading);
    }
    // Create the image
    let popupImage = document.createElement("img");
    popupImage.src = img.src;
    // Add image to popup box
    popupBox.appendChild(popupImage);
    document.body.appendChild(popupBox);
    // Create close span
    let closeButton = document.createElement("span");
    // Create the close button text
    let closeButtonText = document.createTextNode("X");
    // Append text to close button
    closeButton.appendChild(closeButtonText);
    // Add class to close button
    closeButton.className = "close-button";
    // Add close button to pop up box
    popupBox.appendChild(closeButton);
  });
});

// Close popup
document.addEventListener("click", (e) => {
  if (e.target.className == "close-button") {
    // Remove the current popup
    e.target.parentNode.remove();
    // Remove overlay
    document.querySelector(".popup-overlay").remove();
  }
});

// Select all bullets
let allBullets = document.querySelectorAll(".nav-bullets .bullet");
// Select all Links
let allLinks = document.querySelectorAll(".links a");

function scrollToSection(elements) {
  elements.forEach((element) => {
    element.addEventListener("click", (e) => {
      e.preventDefault();
      document.querySelector(e.target.dataset.section).scrollIntoView({
        behavior: "smooth",
      });
    });
  });
}

scrollToSection(allBullets);
scrollToSection(allLinks);

// Toggle Menu
let menuBtn = document.querySelector(".toggle-menu");
let tLinks = document.querySelector(".links");

menuBtn.addEventListener("click", function (e) {
  e.stopPropagation();
  this.classList.toggle("active");
  tLinks.classList.toggle("opened");
});

// Click anywhere oustide menu and toggle button
document.addEventListener("click", (e) => {
  if (e.target !== menuBtn && e.target !== tLinks) {
    if (tLinks.classList.contains("opened")) {
      menuBtn.classList.remove("active");
      tLinks.classList.remove("opened");
    }
  }
});

// Stop Propagaion on menu
tLinks.onclick = function (e) {
  e.stopPropagation();
};
