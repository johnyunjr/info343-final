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
                controller: 'bioController'
            })
            .state('music', {
                url: '/music',
                templateUrl: 'views/music.html',
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
        // do nothing
    })
    .controller('bioController', function() {
        // rotate images
        var images = ["img/bio.jpg", "img/bio2.jpg", "img/bio3.jpg"];

        window.setInterval(rotateImage, 5000);

        function rotateImage() {
            if ($("#bioImg").attr("src") == images[0]) {
                $("#bioImg").attr("src", images[1]);
            } else if ($("#bioImg").attr("src") == images[1]) {
                $("#bioImg").attr("src", images[2]);
            } else {
                $("#bioImg").attr("src", images[0]);
            }
        }
    })
    .controller('contactController', function($window, $scope, $timeout) {
        $scope.submit = false;

        // send message to firebase
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

            // reset form and show success message
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