function showPreview(inputId, previewId) {
  const fileInput = document.getElementById(inputId);
  const file = fileInput.files[0];
  const preview = document.getElementById(previewId);

  if (file) {
    const reader = new FileReader();
    reader.onload = function (event) {
      const img = new Image();
      img.src = event.target.result;
      img.style.maxWidth = "200px";
      img.style.maxHeight = "200px";
      preview.innerHTML = "";
      preview.appendChild(img);
    };
    reader.readAsDataURL(file);
  } else {
    preview.innerHTML = "No file selected";
  }
}

document.getElementById("aadhar-card").addEventListener("change", function () {
  showPreview("aadhar-card", "aadhar-preview");
});

document
  .getElementById("driving-license")
  .addEventListener("change", function () {
    showPreview("driving-license", "driving-preview");
  });
