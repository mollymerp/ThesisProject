var angular = require('angular');
require('angular-ui-router');
require('mapbox');
require('./directives/mapbox');
require('./components/home/home');

var app = angular.module('app', [
  'ui.router',
  'app.home'
]);

app.directive('mapbox', require('./directives/mapbox'));

app.config(['$stateProvider', "$urlRouteProvider", function($stateProvider, $urlRouteProvider) {
  $urlRouteProvider.otherwise('/');

  $stateProvider
  .state('home', {
    templateUrl: 'src/scripts/components/home/home.html',
    controller: "HomeController",
    url: '/'
  })
}])

