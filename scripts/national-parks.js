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
    "Parkway"
  ];

  // Helper function to determine park type from LocationName
  function getParkType(locationName) {
    for (const keyword of parkTypeKeywords) {
      if (locationName.includes(keyword)) {
        return keyword;
      }
    }
    return "Unknown Type"; 
  }

  // Populate location dropdown
  locationsArray.forEach(location => {
    const option = document.createElement("option");
    option.value = location;
    option.textContent = location;
    locationSelect.appendChild(option);
  });

  // Populate park type dropdown
  parkTypesArray.forEach(type => {
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
      filteredParks = filteredParks.filter(park => park.State === selectedLocation);
    }

    // Filter by inferred type if selected
    if (selectedType) {
      filteredParks = filteredParks.filter(park => getParkType(park.LocationName) === selectedType);
    }

    displayParks(filteredParks);
  });

  
  viewAllButton.addEventListener("click", () => {
    displayParks(nationalParksArray);  // Display parks without filters
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

    parks.forEach(park => {
      const row = document.createElement("tr");

      
      const nameCell = document.createElement("td");
      nameCell.textContent = park.LocationName || "N/A";
      row.appendChild(nameCell);

      
      const locationCell = document.createElement("td");
      locationCell.textContent = park.State || "N/A";
      row.appendChild(locationCell);

       
      const typeCell = document.createElement("td");
      typeCell.textContent = getParkType(park.LocationName);
      row.appendChild(typeCell);

      
      const descriptionCell = document.createElement("td");
      descriptionCell.textContent = park.Address ? `Address: ${park.Address}, ${park.City}, ${park.State}` : "No description available";
      row.appendChild(descriptionCell);

      // Append the row to the table body
      parksTableBody.appendChild(row);
    });
  }
}


document.addEventListener("DOMContentLoaded", loadParks);

