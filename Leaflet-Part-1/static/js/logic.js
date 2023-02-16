// Creating my initial map object:
// set the longitude, latitude, and starting zoom level.
// This gets inserted into the div with an id of "map".
var myMap = L.map("map", {
    center: [38.89511, -77.03637],
    zoom: 6
  });


// Adding a tile layer (the background map image) to our map:
// We use the addTo() method to add objects to our map. used public default api key.
L.tileLayer("https://api.mapbox.com/styles/v1/mapbox/light-v9/tiles/256/{z}/{x}/{y}?access_token={accessToken}", {
  attribution: "Map data &copy; <a href='https://www.openstreetmap.org/'>OpenStreetMap</a> contributors, <a href='https://creativecommons.org/licenses/by-sa/2.0/'>CC-BY-SA</a>, Imagery © <a href='https://www.mapbox.com/'>Mapbox</a>",
  maxZoom: 18,
  id: "mapbox.streets",
  accessToken: API_KEY
}).addTo(myMap);

// Store our API endpoint as queryUrl.
var queryUrl = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson"


//Perform a GET request to the query URL
d3.json(queryUrl).then(function(data) {

    // When data is returned, the marker will be styled in relation to the magnitude of the earthquake. 
  function styleInfo(feature) {
    return {
      opacity: 1,
      fillOpacity: 1,
      fillColor: colourSelector(feature.properties.mag),
      color: "#000000",
      radius: getRadius(feature.properties.mag),
      stroke: true,
      weight: 0.5
    };
  }

  // creates a key for the colour of the marker -  magnitude of the earthquake.
  function colourSelector(magnitude) {
    switch (true) {
      case magnitude > 5:
        return "#ea2c2c";
      case magnitude > 4:
        return "#ea822c";
      case magnitude > 3:
        return "#ee9c00";
      case magnitude > 2:
        return "#eecc00";
      case magnitude > 1:
        return "#d4ee00";
      default:
        return "#98ee00";
    }
  }

  // This function will decide the size of the earthquakes radius marker based on the magnitude.
 
  function getRadius(magnitude) {
    if (magnitude === 0) {
      return 1;
    }

    return magnitude * 4;
  }

  // create the GeoJSON layer to plot data

  L.geoJson(data, {

    //turning each feature into a circle marker  
    pointToLayer: function (feature, latlong) {
      return L.circleMarker(latlong);
    },

    style: styleInfo,

 // Binding a pop-up to each layer
    onEachFeature: function (feature, layer) {

      layer.bindPopup("Earthquake Magnitude: " + feature.properties.mag + "<br>Earthquake Location:<br>" + feature.properties.place);
    }
  }).addTo(myMap);

  //adding the legend on bottom right corner
  var legend = L.control({ position: 'bottomright' });

  legend.onAdd = function (map) {
    //Dom Utility that puts legend into DIV & Info Legend
    var div = L.DomUtil.create('div', 'info legend'),
      //Magnitude Grades, stops at 5 magnitude
      grades = [0, 1, 2, 3, 4, 5];

    //Legend Label Earthquake <break> Magnitude  
    div.innerHTML = 'Eathquake<br>Magnitude<br><hr>'

    // This will loop through the density intervals and generate a label with a coloured square for each interval
    for (var i = 0; i < grades.length; i++) {
      div.innerHTML +=
        //HTML code with nbs(non-breaking space) and ndash
        '<i style="background:' + colourSelector(grades[i] + 1) + '">&nbsp&nbsp&nbsp&nbsp</i> ' +
        grades[i] + (grades[i + 1] ? '&ndash;' + grades[i + 1] + '<br>' : '+');
    }

    return div;
  };
  //Adds Legend to myMap
  legend.addTo(myMap);


});
