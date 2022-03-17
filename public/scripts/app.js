// Client facing scripts here
$(document).ready(function () {
  console.log("ready");
  $(document).on("click", "#button-save", (event) => {
    event.preventDefault();
    console.log(newMarker);
    const text = $("#point-text").val();
    $.ajax({
      type: "post",
      url: "/api/routes/point",
      data: {
        description: text,
        title: newMarker.title,
        position: JSON.stringify(newMarker.position),
      },
      success: () => {
        console.log("success");
      },
      dataType: "json",
    });
  });
});
// Initialize and add the map
function initMap() {
  $.ajax({
    type: "get",
    url: "/api/routes/map/",
    // data: {message: "body"},
    success: (result) => {
      result.forEach((coordinate) => {
        let location = {
          lat: coordinate.latitude,
          lng: coordinate.longitude,
        };
        addMarker(location, map);
      });
      console.log("result of success: ", result);
      return result;
    },
    dataType: "json",
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
    if (event.latLng) {
      addMarker(event.latLng, map);
      // if (newMarker.position) {
      //   $.ajax({
      //     type: "POST",
      //     url: "/api/routes/point",
      //     data: {
      //       position: JSON.stringify(newMarker.position),
      //       title: newMarker.label,
      //       markerId: newMarker.markerId,
      //       //label: JSON.stringify(newMarker.internalPosition),
      //     },
      //     // data: {message: "body"},
      //     success: () => {
      //       console.log("success");
      //     },
      //     dataType: "json",
      //   });
      // }
    }
  });

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
  // const generateRandomString = () => {
  //   return Math.random().toString(36).replace("0.", "").substring(0, 6);
  // };
  let currentLabel = labels[labelIndex++ % labels.length];
  const text = $("#point-text").val();
  //let markerId = generateRandomString();
  console.log("text inside infowindow", text);
  newMarker = new google.maps.Marker({
    position: location,
    label: currentLabel,
    map: map,
    //optimized: false,
    title: currentLabel,
    //markerId: markerId,
    //html: document.getElementById("point-form"),
  });
  //console.log("google location:", JSON.stringify(location));
  //console.log("lat and long: ", JSON.stringify(newMarker.position));

  // if (newMarker.position) {
  //   $.ajax({
  //     type: "POST",
  //     url: "/api/routes/point",
  //     data: {
  //       position: JSON.stringify(newMarker.position),
  //       title: currentLabel,
  //       markerId: markerId
  //       //label: JSON.stringify(newMarker.internalPosition),
  //     },
  //     // data: {message: "body"},
  //     success: () => {
  //       console.log("success");
  //     },
  //     dataType: "json",
  //   });
  // }
  //setup infowindow for more content

  const contentString =
    '<div id="content">' +
    '<div id="siteNotice">' +
    "</div>" +
    '<h1 id="firstHeading" class="firstHeading">Intersting Point</h1>' +
    '<div id="bodyContent">' +
    '<form class = "tag_form" id="point-form" >' +
    '<label id = "text-label" for="point-text">' +
    "Description: " +
    "</label>" +
    '<textarea id="point-text" name="text">' +
    "   hello  " +
    "</textarea>" +
    '<footer class="button-container">' +
    '<button id="button-save" type="button">' +
    "Save" +
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

        console.log("newMarker is ", newMarker);
        infowindow.open(map, newMarker);
      };
    })(newMarker, infowindow)
  );

  // const savePtText = function (text, marker) {
  //   $.post("/api/point/text", text)
  //     .then((data) => {
  //       //console.log("load data:", data)
  //     })
  //     .catch((error) => {
  //       alert("error:" + error);
  //     });
  // };
}
