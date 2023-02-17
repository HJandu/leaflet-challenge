# <p align="center"> <ins>Leaflet Challenge</ins> 
## <p align="center"> <ins>Module 15 Mapping</ins> 


## <ins>Background</ins>

The United States Geological Survey, or USGS for short, is responsible for providing scientific data about natural hazards, the health of our ecosystems and environment, and the impacts of climate and land-use change. Their scientists develop new methods and tools to supply timely, relevant, and useful information about the Earth and its processes.

The USGS is interested in building a new set of tools that will allow them to visualize their earthquake data. They collect a massive amount of data from all over the world each day, but they lack a meaningful way of displaying it. In this challenge, I have been tasked with developing a way to visualize USGS data that will allow them to better educate the public and other government organizations (and hopefully secure more funding) on issues facing our planet.

<ins>Creating the Earthquake Visualization</ins>

My task was to visualize an earthquake dataset. To do this, I completed the following steps:

1. I got the dataset from the USGS GeoJSON page - https://earthquake.usgs.gov/earthquakes/feed/v1.0/geojson.php

When you click a dataset (such as "All Earthquakes from the Past 7 Days"), you will be given a JSON representation of that data. I used the URL of this JSON to pull in the data for the visualization. The following image is a sampling of earthquake data in JSON format:

![Screen Shot 2023-02-16 at 23 56 51](https://user-images.githubusercontent.com/116304118/219514755-6d06ecab-185b-4859-838a-71994d5869bb.png)


2. Import and visualize the data by doing the following:

- Using Leaflet, I created a map that plots all the earthquakes from my dataset based on their longitude and latitude.

- My data markers reflect the magnitude of the earthquake by their size and the depth of the earthquake by color. Earthquakes with higher magnitudes should appear larger, and earthquakes with greater depth should appear darker in color.


- I included popups that provide additional information about the earthquake when its associated marker is clicked.

- I created a legend that will provide context for my map data.

See image of the map below (zoomed out). 

![Screen Shot 2023-02-17 at 00 02 59](https://user-images.githubusercontent.com/116304118/219515419-bb579ba2-643d-45c6-a412-1f7481b66611.png)

