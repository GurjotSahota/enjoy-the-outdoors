"use strict";
document.addEventListener("DOMContentLoaded", function () {
  const mountainDropdown = document.getElementById("mountainDropdown");
  const mountainInfo = document.getElementById("mountainInfo");
  const mountainName = document.getElementById("mountainName");
  const mountainImage = document.getElementById("mountainImage");
  const mountainDesc = document.getElementById("mountainDesc");
  const mountainElevation = document.getElementById("mountainElevation");

  mountainsArray.forEach((mountain, index) => {
    const option = document.createElement("option");
    option.value = index;
    option.textContent = mountain.name;
    mountainDropdown.appendChild(option);
  });

  mountainDropdown.addEventListener("change", function () {
    const selectedIndex = mountainDropdown.value;
    const selectedMountain = mountainsArray[selectedIndex];

    if (selectedMountain) {
      mountainName.textContent = selectedMountain.name;
      mountainDesc.textContent = selectedMountain.desc;
      mountainElevation.textContent = `${selectedMountain.elevation} ft`;
      mountainImage.src = `images/${selectedMountain.img}`;
      mountainImage.alt = `Image of ${selectedMountain.name}`;
      mountainInfo.style.display = "block";
    } else {
      mountainInfo.style.display = "none";
    }
  });
});
