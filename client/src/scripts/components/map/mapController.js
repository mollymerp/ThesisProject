;
(function() {
  'use strict';
  angular.module('app.map', [])
    .controller('MapController', ['$location','RouteService', function($location, RouteService) {
      var vm = this;
      vm.map = RouteService.map;gi
      var polyline;
      // functions for 3d map rotation
      vm.angle = 0;
      vm.xdrag = 0;
      vm.isDown = false;
      vm.xpos = 0;

      var mapRot = angular.element(document.querySelector('#maprotor'));
      var mapEl = angular.element(document.querySelector('#map'));

      vm.tiltCheck= false;
      var elevMarker;
      vm.mouseDown = function(e){
        if (vm.tiltCheck){
          vm.xpos = e.pageX;
          vm.isDown = true;
        }
      }

      vm.mouseMove = function(e){
        if (vm.tiltCheck) {
          if (vm.isDown) {
            elevMarker = angular.element(document.querySelectorAll('.elevmarker'));

            vm.xdrag = (vm.xpos - e.pageX) / 4;
            mapEl.attr('style', '-webkit-transform:rotateZ(' + (vm.angle + vm.xdrag) % 360 + 'deg)');
            elevMarker.attr('style', '-webkit-transform:rotateX(90deg) rotateY(' + (vm.angle + vm.xdrag) * (-1) % 360 + 'deg)');
          }
        }
      }

      vm.mouseUp = function(e){
        if (vm.tiltCheck){
          vm.isDown = false;
          vm.angle = vm.angle + vm.xdrag;
        }
      }

      // rotate (tilt) map
      vm.tiltMap = function() {
        RouteService.map.fitBounds(RouteService.map.featureLayer.setGeoJSON(RouteService.turfLine).getBounds()
        //   , {
        //   paddingTopLeft: [150, 50],
        //   paddingBottomRight: [150, 50]
        // }
        );

        vm.tiltCheck = true;
        RouteService.map.dragging.disable(); 
        mapRot.addClass("tilted");
      };

      vm.restoreMap = function (){
        elevMarker = angular.element(document.querySelectorAll('.elevmarker'));
        
        mapEl.attr('style', 'transition:all 0.25s');
        elevMarker.attr('style', '');

        vm.tiltCheck = false;
        mapRot.removeClass("tilted");
        RouteService.map.dragging.enable();
        vm.angle = 0;
      };
    }])
})();
