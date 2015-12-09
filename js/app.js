angular.module('djApp', ['ui.router'])
    .config(function($stateProvider, $urlRouterProvider) {
        'use strict'; //strict mode

        //routing
        $stateProvider
            .state('home', {
                url: '/',
                templateUrl: 'views/home.html',
                controller: 'homeController'
            })
            .state('bio', {
                url: '/bio',
                templateUrl: 'views/bio.html',
                controller: ''
            })
            .state('soundcloud', {
                url: '/soundcloud',
                templateUrl: 'views/soundcloud.html',
                controller: ''
            })
            .state('contact', {
                url: '/contact',
                templateUrl: 'views/contact.html',
                controller: 'contactController'
            });
        $urlRouterProvider.otherwise('/');
    })
    .controller('homeController', function() {
        //do nothing
    })
    .controller('contactController', function($window, $scope) {



    })