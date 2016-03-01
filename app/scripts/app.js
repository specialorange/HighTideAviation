'use strict';

/**
 * @ngdoc overview
 * @name highTideAviationApp
 * @description
 * # highTideAviationApp
 *
 * Main module of the application.
 */
angular
  .module('highTideAviationApp', [
    'ngAnimate',
    'ngCookies',
    'ngMessages',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch'
  ])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl',
        controllerAs: 'main'
      })
      .otherwise({
        redirectTo: '/'
      });
  });
