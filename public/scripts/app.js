// Client facing scripts here
$(document).ready(function () {
  console.log("ready");

  $(document).on("click", ".button-save", (event) => {
    event.preventDefault();
    //console.log(newMarker);
    const text = $("#point-text").val();
    const mapTitle = $("#map_title").val();
    $.ajax({
      type: "post",
      url: "/api/routes/point",
      data: {
        maptitle: mapTitle,
        description: text,
        title: newMarker.title,
        position: JSON.stringify(newMarker.position),
      },
      dataType: "json",
    }).done((data) => {
      loadInfowindow(event.target);
    });
  });
});

const loadInfowindow = function (window) {
  $.ajax({
    method: "GET",
    url: "/api/routes/point",
    data: {
      title: newMarker.title,
    },
  }).then((description) => {
    const form = $(window).parent().parent();
    //add text after save
    form.after(`
      <div>
        description: ${description}
      </div>
    `);
    //remove form only keep description
    form.remove();
  });
};

// Initialize and add the map
function initMap() {
  $.ajax({
    type: "get",
    url: "/api/routes/map/",
    success: (result) => {
      result.forEach((coordinate) => {
        let location = {
          lat: coordinate.latitude,
          lng: coordinate.longitude,
        };
        addMarker(location, map);
      });
      return result;
    },
    dataType: "json",
  });

  const richmond = { lat: 49.16186001171447, lng: -123.13926987802597 };
  const map = new google.maps.Map(document.getElementById("map"), {
    zoom: 13,
    center: richmond,
  });

  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function (p) {
      const latLng = new google.maps.LatLng(
        p.coords.latitude,
        p.coords.longitude
      );

      const lat = p.coords.latitude;
      const lng = p.coords.longitude;
      document.getElementById("latitude").value = lat;
      document.getElementById("longitude").value = lng;
      // Set the map center on user location
      map.setCenter(latLng);
      new google.maps.Marker({
        position: latLng,
        map,
        title: "you are here",
      });
    });
  } else {
    alert("Geo Location feature is not supported in this browser.");
  }

  //This event listener calls addMarker() when the map is clicked.
  google.maps.event.addListener(map, "click", (event) => {
    if (event.latLng) {
      addMarker(event.latLng, map);
    }
  });
  //Add a marker at the center of the map.
  //addMarker(richmond, map);
}

const labels = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
let labelIndex = 0;
// let newMarker = [];
// Adds a marker to the map.
function addMarker(location, map) {
  // Add the marker at the clicked location, and add the next-available label
  // from the array of alphabetical characters.
  let currentLabel = labels[labelIndex++ % labels.length];

  newMarker = new google.maps.Marker({
    position: location,
    label: currentLabel,
    map: map,
    //optimized: false,
    title: currentLabel,
  });

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
    "" +
    "</textarea>" +
    '<footer class="button-container">' +
    '<button class="button-save" type="button">' +
    "Save" +
    "</button>" +
    "</footer>" +
    "</form>" +
    '<p id="time-stamp">' +
    "(last visited Mar 17, 2022).</p>" +
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
        infowindow.close();
        //console.log("newMarker is ", newMarker);
        infowindow.open(map, newMarker);
      };
    })(newMarker, infowindow)
  );
}
