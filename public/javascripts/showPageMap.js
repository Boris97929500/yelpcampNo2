mapboxgl.accessToken = 'pk.eyJ1IjoiaGNoZW5nMjgiLCJhIjoiY2ttcmFxcnQ2MDV6YjJ1bXAxMnRwN3JjYiJ9.9B_Zmvxu0TcG5mvOTpoTTA' ;
const map = new mapboxgl.Map({
  container: 'map',
  style: 'mapbox://styles/mapbox/streets-v11',//style sheet location
  center:campground.geometry.coordinates,//starting location
  zoom: 9
});

new mapboxgl.Marker()
  .setLngLat(campground.geometry.coordinates)
  .setPopup(
    new mapboxgl.Popup({offset: 25})
    .setHTML(
      `<h6>${campground.title}</h6>`
    )
  )
  .addTo(map)
//add navigation control
map.addControl(new mapboxgl.NavigationControl());
