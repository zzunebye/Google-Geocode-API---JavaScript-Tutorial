//  call geocode()
//  geocode();

// Get Location form
const locationForm = document.getElementById('location-form');

// Listen for Submit
locationForm.addEventListener('submit', geocode);

function geocode(e) {
  // Prevent actual submit
  e.preventDefault();

  var location = document.getElementById('location-input').value;
  axios.get('https://maps.googleapis.com/maps/api/geocode/json', {
      params: {
        address: location,
        key: 'AIzaSyDOYJr7At-8assOQ-QddL2w5emwRH5LDFI'
      }
    })
    .then(function (response) {
      // Log full response
      console.log(response);

      //Formatted Address
      let formattedAddress = response.data.results[0].formatted_address;

      // Output to app  
      let formattedAddressOutput = `
      <ul class="list-group">
        <li class="list-group-item">${formattedAddress}</li>
      </ul>
    `;

      // Address Components
      let addressComponents = response.data.results[0].address_components;

      // Output to app
      let addressComponentsOutput = '<ul class="list-group">';
      for (let i = 0; i < addressComponents.length; i++) {
        addressComponentsOutput += `
        <li class="list-group-item"><strong>${addressComponents[i].types[0]}</strong>:
          ${addressComponents[i].long_name}
        </li>
      `;
      }
      addressComponentsOutput += '</ul>';

      // Geometry
      let lat = response.data.results[0].geometry.location.lat;
      let lng = response.data.results[0].geometry.location.lng;
      let geometryOutput = `
        <ul class="list-group">
          <li class="list-group-item"><strong>Latitude</strong>:${lat}</li>
          <li class="list-group-item"><strong>Longtitude</strong>:${lng}</li>
        </ul>
    `;

      // innerHTML Output
      document.getElementById('formatted-address').innerHTML = formattedAddressOutput;
      document.getElementById('address-components').innerHTML = addressComponentsOutput;
      document.getElementById('geometry').innerHTML = geometryOutput;

      // Init Map
      document.getElementById('map').style.visibility = "visible";
      initMap(location, lat, lng)
    })
    .catch(function (error) {
      console.log(error);
    })
}

function initMap(location, lat, lng) {
  // Map options
  var options = {
    zoom: 8,
    center: {
      lat: lat,
      lng: lng
    }
  }

  // New map
  var map = new google.maps.Map(document.getElementById('map'), options);
}

function openMap(location, lat, lng) {

}