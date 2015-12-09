angular.module('djApp', ['ui.router','firebase'])
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
        console.log('hahaha home ');
        //do nothing
    })
    .controller('contactController', function($window, $scope, $timeout) {
        $scope.submit = false;
        $scope.saveMessage = function() {
            var rootRef = new Firebase('https://djbreezee.firebaseio.com/').child('message');
            var latestMessage = new Firebase('https://djbreezee.firebaseio.com/').child('message').child('latest');
            var newContact = {
                "first":$scope.contact.fname,
                "last": $scope.contact.lname,
                "email": $scope.contact.email,
                "message": $scope.contact.message,
                "createdAt": Firebase.ServerValue.TIMESTAMP
            };
            var push = rootRef.push(newContact);
            var newId = push.key();
            newContact.idNumber = newId;
            latestMessage.update(newContact);
            $scope.contact=null;
            $scope.contactForm.$setPristine();
            $scope.submit = true;
            $timeout(function(){
                $scope.submit = false;
            }, 5000);
        }
    })