// Creating my initial map object:
// set the longitude, latitude, and starting zoom level.
// This gets inserted into the div with an id of "map".
var myMap = L.map("map", {
    center: [38.89511, -100.03637],
    zoom: 4
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
  console.log(data.features);


 // Function to determine marker size
 function markerSize(magnitude) {
   return magnitude * 2000;
 };

    
  function style (feature) {
    return {
      "color": colourSelector(feature.geometry.coordinates[2]),
		  "stroke": false,
    "fillOpacity": 0.95,
    "radius": feature.properties.mag * 3
	};
}

// Function to determine marker color by depth
function colourSelector(depth){
  if (depth < 10) return "#d4ee00";
  else if (depth < 30) return "#98ee00 ";
  else if (depth < 50) return "#eecc00";
  else if (depth < 70) return "#ee9c00";
  else if (depth < 90) return "#ea822c";
  else return "#ea2c2c";
}


  function pointToLayer(feature, latlng) {
    return L.circleMarker(latlng, style(feature));

  }


 // Binding a pop-up to each layer
 function onEachFeature(feature, layer) {
  return layer.bindPopup("Earthquake Magnitude: " + feature.properties.mag + "<br>Earthquake Location:<br>" + feature.properties.place + "<br>Earthquake Time:<br>" + feature.properties.time);
};


L.geoJson(data, {
        pointToLayer: pointToLayer,
  onEachFeature: onEachFeature
}).addTo(myMap);



  //adding the legend on bottom right corner
  var legend = L.control({ position: 'bottomright' });

  legend.onAdd = function () {
    //Dom Utility that puts legend into DIV & Info Legend
    var div = L.DomUtil.create('div', 'info legend');
      //depth grades 
      var grades = [-10, 10, 30, 50, 70, 90]
      var colours = ["#98ee00","#d4ee00","#eecc00","#ee9c00","#ea822c","#ea2c2c"]

    //Legend Label Earthquake <break> depth  
    div.innerHTML = 'Eathquake<br>Depth<br><hr>'

    // This will loop through the density intervals and generate a label with a coloured square for each interval
    for (var i = 0; i < grades.length; i++) {
      console.log(colours[i]);
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
