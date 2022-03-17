function initMap() {
  // Map options
  const options = {
    zoom: 13,
    center: { lat: latitude, lng: longtitude }
  }

  
  map = new google.maps.Map(document.getElementById('existingMap'), options);

}
