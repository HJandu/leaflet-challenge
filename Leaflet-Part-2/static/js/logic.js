//adding the legend on bottom right corner
var legend = L.control({ position: 'bottomright' });

legend.onAdd = function (map) {
  //Dom Utility that puts legend into DIV & Info Legend
  var div = L.DomUtil.create('div', 'info legend'),
    //depth grades 
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
