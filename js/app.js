angular.module('djApp', ['ui.router'])
    .config(function($stateProvider, $urlRouterProvider) {
        'use strict'; //strict mode

        //routing
        $stateProvider
            .state('home', {
                url: '/',
                templateUrl: 'views/home.html',
                controller: 'homeController'
            });
        $urlRouterProvider.otherwise('/');
    })
    .controller('homeController', function() {
        //do nothing
    });