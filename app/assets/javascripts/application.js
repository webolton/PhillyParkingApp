// This is a manifest file that'll be compiled into application.js, which will include all the files
// listed below.
//
// Any JavaScript/Coffee file within this directory, lib/assets/javascripts, vendor/assets/javascripts,
// or any plugin's vendor/assets/javascripts directory can be referenced here using a relative path.
//
// It's not advisable to add code directly here, but if you do, it'll appear at the bottom of the
// compiled file.
//
// Read Sprockets README (https://github.com/rails/sprockets#sprockets-directives) for details
// about supported directives.
//
//= require jquery
//= require jquery_ujs
//= require turbolinks
//= require_tree .

// Heatmaps
// ===================================================================================
var markers = [];
var map, heatmap;

function initMap() {
  map = new google.maps.Map(document.getElementById('map'), {
    zoom: 13,
    center: {lat: 39.9500, lng: -75.1667}
  });

  heatmap = new google.maps.visualization.HeatmapLayer({
    data: getPoints(),
    map: map
  });
};

function toggleHeatmap() {
  heatmap.setMap(heatmap.getMap() ? null : map);
};

function changeRadius() {
  heatmap.set('radius', heatmap.get('radius') ? null : 20);
};

function getPoints() {
  var pointsArr = []
  for (var i = 0; i < gon.cordinates.length; i++) {
    var point = new google.maps.LatLng(gon.cordinates[i].lat, gon.cordinates[i].lng);
    pointsArr.push(point)
  };
  return pointsArr
};

// Markers
// ====================================================================================

function addMarkerWithTimeout(position, timeout, infowindow) {
  window.setTimeout(function() {
    var marker = new google.maps.Marker({
      position: position,
      map: map
    });
    marker.addListener('click', function() {
      infowindow.open(map, marker);
    });
    markers.push(marker);
  }, timeout);
};


function clearMarkers() {
  for (var i = 0; i < markers.length; i++) {
    markers[i].setMap(null);
  };
  markers = [];
};

function drop() {
  clearMarkers();
  for (var i = 0; i < gon.cordinates.length; i++) {
    var contentString = '<div class="pop-up-info">' +
                        '<h3 id="markerHeading" class="markerHeading">Violation and Fine:</h3>' +
                        '<div id="bodyContent">' + 
                        gon.cordinates[i].description + "<br />$ " + gon.cordinates[i].fine +
                        '</div>'+
                        '</div>';
    var infowindow = new google.maps.InfoWindow({
      content: contentString
    });
    addMarkerWithTimeout(gon.cordinates[i], i, infowindow);
  };
};
