//let z = document.querySelector(".z-index");

function openNav() {
  document.getElementById("mySidebar").style.width = "250px";
  // z.style.zIndex = "-1";
}

function closeNav() {
  document.getElementById("mySidebar").style.width = "0";

  //z.style.zIndex = "0";
}

let bgimage = document.querySelector(".hero");
let btn1 = document.querySelector(".btn");

function toggleIcon() {
  var icon = document.getElementById("icon");
  if (icon.classList.contains("fa-motorcycle")) {
    icon.classList.remove("fa-motorcycle");
    icon.classList.add("fa-car-side");
    bgimage.style.backgroundImage = "url(img/bike.jpg)";
  } else {
    icon.classList.remove("fa-car-side");
    icon.classList.add("fa-motorcycle");
    bgimage.style.backgroundImage = "url(img/bg.jpg)";
  }
  document.querySelector(".vehicle").classList.toggle("flipped");
}
function flipIcon() {
  document.querySelector(".vehicle").classList.toggle("flipped");
}
// Get the popup element
const notificationPopup = document.getElementById("notificationPopup");

// Function to toggle popup visibility
function togglePopup() {
  notificationPopup.style.display =
    notificationPopup.style.display === "none" ? "block" : "none";
}

// Add event listener to the notifications icon
document.querySelector(".fa-bell").addEventListener("click", togglePopup);
