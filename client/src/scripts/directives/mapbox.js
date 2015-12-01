;
(function() {
  'use strict';

  angular.module('app')
    .directive('mapbox', ['RouteService', function(RouteService) {
      var _mapboxMap;
      return {
        // restrict this directive to an html element ('E':element, 'A': attribute, 'C': component)
        restrict: 'E',
        replace: true,
        // create isolate scope for the mapbox directive element, bind the variable callback to itself
        scope: {
          callback: "="
        },
        
        template: '<div id="map">',
        // link function allows the directive to manipulate the DOM
        link: function(scope, element, attributes) {
          // molly's public token
          L.mapbox.accessToken = 'pk.eyJ1IjoibWxsb3lkIiwiYSI6Im9nMDN3aW8ifQ.mwiVAv4E-1OeaoR25QZAvw';
          var map = L.mapbox.map(element[0], 'mapbox.run-bike-hike', {
            tileSize: 5120,
            // zoomControl: false,
            maxZoom: 19,
            minZoom: 10
          });
          var getPxBounds = map.getPixelBounds;
          map.getPixelBounds = function() {
            var bounds = getPxBounds.call(this);
            // ... extend the bounds
            bounds.min.x = bounds.min.x - 1000;
            bounds.min.y = bounds.min.y - 1000;
            bounds.max.x = bounds.max.x + 1000;
            bounds.max.y = bounds.max.y + 1000;
            return bounds;
          };
          RouteService.initMap(map);
        }
      };
    }]);
})();
