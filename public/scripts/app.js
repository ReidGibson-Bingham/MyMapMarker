// Client facing scripts here

// Initialize and add the map
/*
if (navigator.geolocation) {
  console.log('geolocation available');
  navigator.geolocation.getCurrentPosition(function(position) {
    const lat = position.coords.latitude;
    const lng = position.coords.longitude;
    document.getElementById('latitude').textContent = lat;
    document.getElementById('longitude').textContent = lng;
    console.log(position);
  });
}
*/

function initMap() {

  // The location of Richmoind 49.16186001171447, -123.13926987802597
  const richmond = { lat: 49.16186001171447, lng: -123.13926987802597 };
  // The map, centered at richmond
  const map = new google.maps.Map(document.getElementById("map"), {
    zoom: 13,
    center: richmond
  });

  // Create an info window to share between markers.
  const infowindow = new google.maps.InfoWindow();


  // The marker, positioned at richmond
  const marker = new google.maps.Marker({
    position: richmond,
    map: map,
    title: `Lat:${richmond.lat}, Lng:${richmond.lng}`,
  });

  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function(p) {
      const latLng = new google.maps.LatLng(p.coords.latitude, p.coords.longitude);
      //console.log(p.coords.latitude);
      //console.log(p.coords.longitude);
      const lat = p.coords.latitude;
      const lng = p.coords.longitude;
     document.getElementById('latitude').textContent = lat;
     document.getElementById('longitude').textContent = lng;
      // Set the map center on user location
      map.setCenter(latLng);
      new google.maps.Marker({
        position: latLng,
        map,
        title: "you are here",
      });
    });
  } else {
    alert('Geo Location feature is not supported in this browser.');
  }


  //This event listener calls addMarker() when the map is clicked.
  google.maps.event.addListener(map, "click", (event) => {
    if (event.latLng) {
      addMarker(event.latLng, map);
    }
  });

  // marker.addListener("click", () => {
  //   //infowindow.close();
  //   infowindow.setContent(marker.title);
  //   //console.log("title is", marker.title);
  //   infowindow.open(marker.getMap(), marker);
  // });
  google.maps.event.addListener(
    marker,
    "click",
    (function (marker, infowindow) {
      return function () {
        infowindow.setContent(marker.title);
        infowindow.open(map, marker);
      };
    })(marker, infowindow)
  );

  //Add a marker at the center of the map.
  //addMarker(richmond, map);
}

const labels = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
let labelIndex = 0;
let newMarker = [];
// Adds a marker to the map.
function addMarker(location, map) {
  // Add the marker at the clicked location, and add the next-available label
  // from the array of alphabetical characters.
  let newMarker = new google.maps.Marker({
    position: location,
    label: labels[labelIndex++ % labels.length],
    map: map,
    //optimized: false,
    title: `${JSON.stringify(location)}`,
  });
  //console.log("google location:", JSON.stringify(location));
  console.log("lat and long: ", JSON.stringify(newMarker.position));

  if (newMarker.position) {
    $.ajax({
      type: "POST",
      url: "/",
      data: { position: JSON.stringify(newMarker.position) },
      // data: {message: "body"},
      success: () => {
        console.log("success");
      },
      dataType: "json",
    });
  }

  //setup infowindow for more content

  const contentString =
    '<div id="content">' +
    '<div id="siteNotice">' +
    "</div>" +
    '<h1 id="firstHeading" class="firstHeading">Intersting Point</h1>' +
    '<div id="bodyContent">' +
    '<form id="point-form">' +
    '<label id = "text-label" for="point-text">' +
    "Description: " +
    "</label>" +
    '<textarea id="point-text" name="text">' +
    "  descriptions goes here   " +
    "</textarea>" +
    '<footer class="button-container">' +
    '<button id="button-save" type="submit">' +
    "Save" +
    "</button>" +
    '<button id="button-edit" type="submit">' +
    "edit" +
    "</button>" +
    '<button id="button-delete" type="submit">' +
    "Delete" +
    "</button>" +
    "</footer>" +
    "</form>" +
    '<p id="time-stamp">' +
    "(last visited June 22, 2009).</p>" +
    "</div>" +
    "</div>";
  const infowindow = new google.maps.InfoWindow({
    content: contentString,
  });


  google.maps.event.addListener(
    newMarker,
    "click",
    (function (newMarker, infowindow) {
      return function () {
        //infowindow.setContent(newMarker.title);
        infowindow.open(map, newMarker);
      };
    })(newMarker, infowindow)
  );

}
