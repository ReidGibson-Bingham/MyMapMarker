// Client facing scripts here

// Initialize and add the map
function initMap() {
  // The location of Richmoind 49.16186001171447, -123.13926987802597
  const richmond = { lat: 49.16186001171447, lng: -123.13926987802597 };
  // The map, centered at richmond
  const map = new google.maps.Map(document.getElementById("map"), {
    zoom: 13,
    center: richmond,
  });
  // The marker, positioned at richmond
  const marker = new google.maps.Marker({
    position: richmond,
    map: map,
    //title: "Hello World!",
  });

  // Create an info window to share between markers.
  const infoWindow = new google.maps.InfoWindow({
    content: `i am infoWindow`,
  });

  // Add a click listener for each marker, and set up the info window.
  marker.addListener("click", () => {
    infoWindow();
    //infoWindow.setContent(`hello`);
    //infoWindow.open(marker.getMap(), marker);
  });

  //This event listener calls addMarker() when the map is clicked.
  google.maps.event.addListener(map, "click", (event) => {
    addMarker(event.latLng, map);
  });
  //Add a marker at the center of the map.
  addMarker(richmond, map);
}

const labels = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
let labelIndex = 0;
// Adds a marker to the map.
function addMarker(location, map) {
  // Add the marker at the clicked location, and add the next-available label
  // from the array of alphabetical characters.
  new google.maps.Marker({
    position: location,
    label: labels[labelIndex++ % labels.length],
    map: map,
  });
}
