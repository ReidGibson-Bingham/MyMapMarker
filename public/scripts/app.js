
// Client facing scripts here

$(document).ready(function() {

  ////////////
  count = 0;//
  ////////////

  console.log("client.js ready");

  //responsible for returning a new map
  const createDiv = function() {

    const $div =`<div id="map${count}" style="width:700px; height:500px; margin-left:80px;"></div>` ;

    return $div;

  }

  //////////////////
  let newMap = {};//
  //////////////////

  $("button").click(function() {

    alert( "Handler for .click() called." );
    $('#maps').prepend(createDiv());
    alert("div created");
    console.log(`count: ${count}`);


    newMap = new google.maps.Map(document.getElementById(`map${count}`), {
      zoom: 13,
      center: { lat: 49, lng: -123 }
    });

    console.log("new map: ", newMap);

    const centerMark = new google.maps.Marker({
      position: { lat: 49, lng: -123 },
      map: newMap
      //center marker when creating a new map
    });

    google.maps.event.addListener(newMap, "click", (event) => {
      if (event.latLng){
        addMarkerToMap(event.latLng, newMap);
        addMarkerToDB(event.latLng);
      }
    });

    //////////
    count++;//
    //////////

  });

  console.log("important test message", createDiv());

  $(document).on("click", ".button-save", (event) => {
    event.preventDefault();
    //console.log(newMarker);
    const text = $("#point-text").val();
    $.ajax({
      type: "post",
      url: "/api/routes/point",
      data: {
        description: text,
        title: newMarker.title,
        position: JSON.stringify(newMarker.position),
      },
      dataType: "json",
    }).done((data) => {
      loadInfowindow(event.target);
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

});

//infowindow texttopost/get

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
        addMarkerToMap(location, map);
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
  // const infowindow = new google.maps.InfoWindow();
  // ^^ this one may be redundant

  // The marker, positioned at richmond (the center point)
  const marker = new google.maps.Marker({
    position: richmond,
    map: map,
    title: `Lat:${richmond.lat}, Lng:${richmond.lng}`,
  });

  //This event listener calls addMarker() when the map is clicked.
  google.maps.event.addListener(map, "click", (event) => {
    if (event.latLng){
      addMarkerToMap(event.latLng, map);
      // addMarkerToDB(event.latLng);
    }
  });

  // marker.addListener("click", () => {
  //   //infowindow.close();
  //   infowindow.setContent(marker.title);
  //   //console.log("title is", marker.title);
  //   infowindow.open(marker.getMap(), marker);
  // });

  // for the center marker
  // google.maps.event.addListener(
  //   marker,
  //   "click",
  //   (function (marker, infowindow) {
  //     return function () {
  //       infowindow.setContent(marker.title);
  //       infowindow.open(map, marker);
  //     };
  //   })(marker, infowindow)
  //   );

    //Add a marker at the center of the map.
    //addMarker(richmond, map);
}

const labels = "123456789";
let labelIndex = 0;
let newMarker = [];
// Adds a marker to the map.
function addMarkerToMap(location, map) {
  // Add the marker at the clicked location, and add the next-available label
  // from the array of alphabetical characters.
  let newMarker = new google.maps.Marker({
    title: labels[labelIndex],
    position: location,
    label: location,
    map: map,
    //optimized: false,
    //`${JSON.stringify(location)}`,
  });

  console.log("newMarker.title:", newMarker.title);
  console.log("newMarker.label:", newMarker.label);
  console.log("lat and long: ", JSON.stringify(newMarker.position));

  const contentString =
  '<div id="content">' +
  '<div id="siteNotice">' +
  "</div>" +
  `<h1 id="firstHeading" class="firstHeading"> new point ${newMarker.title}</h1>` +
  '<div id="bodyContent">' +
  '<form id="point-form">'+
        '<label id = "text-label" for="point-text">'+
        "Description: "+
        "</label>"+
        '<textarea id="point-text" name="text">'+
        "  descriptions goes here   "+
        "</textarea>"+
        '<footer class="button-container">'+
          '<button id="button-save" type="submit">'+
          "Save"+
          "</button>"+
        "</footer>"+
  "</form>"+
  '<p id="time-stamp">'+
  "(last visited June 22, 2009).</p>" +
  "</div>" +
  "</div>";
  const infowindow = new google.maps.InfoWindow({
    content: contentString,
  });
  // ^^ this event listener is for the info window on the marker

  google.maps.event.addListener(
    newMarker,
    "click",
    (function (newMarker, infowindow) {
      return function () {
        // infowindow.setContent(newMarker.content);
        infowindow.open(map, newMarker);
      };
    })(newMarker, infowindow)
  );
}

function addMarkerToDB(pos) {

    $.ajax({
      type: "POST",
      url: "/api/routes/point/",
      data: {
        position: JSON.stringify(pos),
        map_id: centerLocation
      },
      // data: {message: "body"},
      success: () => {
        console.log("success");
      },
      dataType: "json"
    });

}






// dongs' code

// ///addd
// marker

// const labels = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
// let labelIndex = 0;
// // let newMarker = [];
// // Adds a marker to the map.
// function addMarker(location, map) {
//   // Add the marker at the clicked location, and add the next-available label
//   // from the array of alphabetical characters.
//   let currentLabel = labels[labelIndex++ % labels.length];

//   newMarker = new google.maps.Marker({
//     position: location,
//     label: currentLabel,
//     map: map,
//     //optimized: false,
//     title: currentLabel,
//   });
