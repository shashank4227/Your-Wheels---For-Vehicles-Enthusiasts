const search = document.querySelector(".search");
const panels = document.querySelectorAll(".panel");

search.addEventListener("input", () => {
  // If the search bar isn't empty
  if (search.value !== "") {
    //Loop through all panels
    panels.forEach((panel) => {
      // Get the panel heading
      const panelHeading = panel.querySelector("h2");
      // Convert input value to lowercase letters
      const panelHeadingText = panelHeading.innerHTML.toLowerCase();
      // Convert input value to lowercase letters
      // This will make the search case Unsensitive
      const inputText = search.value.toLowerCase();
      // If the heading text DOESN'T(!) contain what is in the search bar
      if (!panelHeadingText.includes(inputText)) {
        // Hide that panel
        panelHeading.parentElement.style.display = "none";
      } else {
        // But if it does then make sure to show that panel
        panelHeading.parentElement.style.display = "block";
      }
    });
  } else {
    // If the search bar is empty
    // Show all of the panels
    panels.forEach((panel) => {
      panel.style.display = "block";
    });
  }
});
