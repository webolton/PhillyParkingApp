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
// $(document).ready(function() {

// Working PINDROPPER
// ===================================================================================
var markers = [];
var map;

function initMap() {
  map = new google.maps.Map(document.getElementById('map'), {
    zoom: 15,
    center: {lat: 39.9500, lng: -75.1667}
  });
}

function addMarkerWithTimeout(position, timeout, infowindow) {
  window.setTimeout(function() {
    var marker = new google.maps.Marker({
      position: position,
      map: map,
      animation: google.maps.Animation.DROP
    })
    marker.addListener('click', function() {
      infowindow.open(map, marker);
    });
    markers.push(marker);
  }, timeout);
}

function clearMarkers() {
  for (var i = 0; i < markers.length; i++) {
    markers[i].setMap(null);
  }
  markers = [];
}

function drop() {
  clearMarkers();
  for (var i = 0; i < gon.cordinates.length; i++) {
    var contentString = '<div id="content" class="pop-up-info">' +
                        '<div id="siteNotice">' +
                        '</div>' +
                        '<h1 id="firstHeading" class="firstHeading"></h1>' +
                        '<div id="bodyContent">' + 
                        gon.cordinates[i].description + "$" + gon.cordinates[i].fine +
                        '</div>'+
                        '</div>';
    var infowindow = new google.maps.InfoWindow({
      content: contentString
    });
    addMarkerWithTimeout(gon.cordinates[i], i * 5, infowindow);
  }
}


// ===================================================================================
// var map, heatmap;

// function initMap() {
//   map = new google.maps.Map(document.getElementById('map'), {
//     zoom: 13,
//     center: {lat: 39.9500, lng: -75.1667},
//     mapTypeId: google.maps.MapTypeId.SATELLITE
//   });

//   heatmap = new google.maps.visualization.HeatmapLayer({
//     data: getPoints(),
//     map: map
//   });
// }

// function toggleHeatmap() {
//   heatmap.setMap(heatmap.getMap() ? null : map);
// }

// function changeGradient() {
//   var gradient = [
//     'rgba(0, 255, 255, 0)',
//     'rgba(0, 255, 255, 1)',
//     'rgba(0, 191, 255, 1)',
//     'rgba(0, 127, 255, 1)',
//     'rgba(0, 63, 255, 1)',
//     'rgba(0, 0, 255, 1)',
//     'rgba(0, 0, 223, 1)',
//     'rgba(0, 0, 191, 1)',
//     'rgba(0, 0, 159, 1)',
//     'rgba(0, 0, 127, 1)',
//     'rgba(63, 0, 91, 1)',
//     'rgba(127, 0, 63, 1)',
//     'rgba(191, 0, 31, 1)',
//     'rgba(255, 0, 0, 1)'
//   ]
//   heatmap.set('gradient', heatmap.get('gradient') ? null : gradient);
// }

// function changeRadius() {
//   heatmap.set('radius', heatmap.get('radius') ? null : 20);
// }

// function changeOpacity() {
//   heatmap.set('opacity', heatmap.get('opacity') ? null : 0.2);
// }

// // Heatmap data: 500 Points
// function getPoints() {
//   var pointsArr = []
//   for (var i = 0; i < gon.cordinates.length; i++) {
//     var point = new google.maps.LatLng(gon.cordinates[i].lat, gon.cordinates[i].lng);
//     pointsArr.push(point)
//     console.log(gon.cordinates[i].fine)
//   }
//   return pointsArr
// }


