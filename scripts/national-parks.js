"use strict";

function loadParks() {
  const locationSelect = document.getElementById("locationSelect");
  const typeSelect = document.getElementById("typeSelect");
  const parksTableBody = document.getElementById("parksTable").querySelector("tbody");
  const searchParksButton = document.getElementById("searchParksButton");
  const viewAllButton = document.getElementById("viewAllButton");

  // Defining park types through keyword search
  const parkTypeKeywords = [
    "National Park",
    "National Monument",
    "National Historic Site",
    "Recreation Area",
    "Scenic Trail",
    "Battlefield",
    "Historic",
    "Memorial",
    "Preserve",
    "Island",
    "River",
    "Seashore",
    "Trail",
    "Parkway",
  ];

  // function to help find park type from LocationName
  function getParkType(locationName) {
    for (const keyword of parkTypeKeywords) {
      if (locationName.includes(keyword)) {
        return keyword;
      }
    }
    return "Unknown Type";
  }

  // populate the location dropdown menu
  locationsArray.forEach((location) => {
    const option = document.createElement("option");
    option.value = location;
    option.textContent = location;
    locationSelect.appendChild(option);
  });

  // populate the park type dropdown menu
  parkTypesArray.forEach((type) => {
    const option = document.createElement("option");
    option.value = type;
    option.textContent = type;
    typeSelect.appendChild(option);
  });

  // Event listener for Search button
  searchParksButton.addEventListener("click", () => {
    const selectedLocation = locationSelect.value;
    const selectedType = typeSelect.value;

    // Filter national parks based on location and type selections
    let filteredParks = nationalParksArray;

    if (selectedLocation) {
      filteredParks = filteredParks.filter((park) => park.State === selectedLocation);
    }

    // Filter by inferred type if selected
    if (selectedType) {
      filteredParks = filteredParks.filter((park) => getParkType(park.LocationName) === selectedType);
    }

    displayParks(filteredParks);
  });

  viewAllButton.addEventListener("click", () => {
    displayParks(nationalParksArray); // Displays all parks, with no filters
  });

  function displayParks(parks) {
    parksTableBody.innerHTML = "";

    if (parks.length === 0) {
      const noDataRow = document.createElement("tr");
      const noDataCell = document.createElement("td");
      noDataCell.colSpan = 4;
      noDataCell.textContent = "No parks found with the selected criteria.";
      noDataRow.appendChild(noDataCell);
      parksTableBody.appendChild(noDataRow);
      return;
    }

    parks.forEach((park) => {
      const row = document.createElement("tr");

      // name cell
      const nameCell = document.createElement("td");
      nameCell.textContent = park.LocationName || "N/A";
      row.appendChild(nameCell);

      // location cell
      const locationCell = document.createElement("td");
      locationCell.textContent = park.State || "N/A";
      row.appendChild(locationCell);

      // type cell
      const typeCell = document.createElement("td");
      typeCell.textContent = getParkType(park.LocationName);
      row.appendChild(typeCell);

      // address cell
      const descriptionCell = document.createElement("td");
      descriptionCell.textContent = park.Address
        ? `Address: ${park.Address}, ${park.City}, ${park.State}`
        : "No description available";
      row.appendChild(descriptionCell);

      // adding each row to the table
      parksTableBody.appendChild(row);
    });
  }
}

// Call loadParks when the DOM content is fully loaded
document.addEventListener("DOMContentLoaded", loadParks);
