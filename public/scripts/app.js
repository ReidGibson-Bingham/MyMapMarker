// Client facing scripts here

// Initialize and add the map
function initMap() {

  $.ajax({
    type: "get",
    url: "/api/routes/map/",
    // data: {message: "body"},
    success: (result) => {

      result.forEach(coordinate => {
        let location = {
          lat: coordinate.latitude,
          lng: coordinate.longitude
        }
        addMarker(location, map);
      });
      console.log("result of success: ", result);
      return result;
    },
    dataType: "json"
  });

  // The location of Richmoind 49.16186001171447, -123.13926987802597
  const richmond = { lat: 49.16186001171447, lng: -123.13926987802597 };
  // The map, centered at richmond
  const map = new google.maps.Map(document.getElementById("map"), {
    zoom: 13,
    center: richmond,
  });

  // Create an info window to share between markers.
  const infowindow = new google.maps.InfoWindow();

  // The marker, positioned at richmond
  const marker = new google.maps.Marker({
    position: richmond,
    map: map,
    title: `Lat:${richmond.lat}, Lng:${richmond.lng}`,
  });

  //This event listener calls addMarker() when the map is clicked.
  google.maps.event.addListener(map, "click", (event) => {
    if (event.latLng){
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
  console.log("google location:", location);
  console.log("lat and long: ", JSON.stringify(newMarker.position));

  if (newMarker.position) {
    $.ajax({
      type: "POST",
      url: "/",
      data: {position: JSON.stringify(newMarker.position)},
      // data: {message: "body"},
      success: () => {
        console.log("success");
      },
      dataType: "json"
    });
  }


  const infowindow = new google.maps.InfoWindow();
  // this event listener is for the info window on the marker
  google.maps.event.addListener(
    newMarker,
    "click",
    (function (newMarker, infowindow) {
      return function () {
        infowindow.setContent(newMarker.title);
        infowindow.open(map, newMarker);
      };
    })(newMarker, infowindow)
  );
}

