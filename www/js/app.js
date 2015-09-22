// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.controllers' is found in controllers.js
angular.module('app', ['ionic', 'app.controllers', "ngResource", "ngCookies"])

    .run(function ($ionicPlatform) {
        $ionicPlatform.ready(function () {
            // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
            // for form inputs)
            if (window.cordova && window.cordova.plugins.Keyboard) {
                cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
                cordova.plugins.Keyboard.disableScroll(true);

            }
            if (window.StatusBar) {
                // org.apache.cordova.statusbar required
                StatusBar.styleDefault();
            }
        });
    })
    .factory('SocketService', function ($resource) {
        return $resource('http://dmarkey.com:8080/api/sockets/:id/', {id: '@id'},
            {
                'update': {method: 'PUT'}
            });


    })
    .run(['$http', '$cookies', function ($http, $cookies) {
        $http.defaults.headers.post['X-CSRFToken'] = $cookies.csrftoken;
    }])

    .config(function ($stateProvider, $urlRouterProvider, $resourceProvider, $httpProvider) {
        $stateProvider


            .state('page2', {
                url: '/login',
                templateUrl: 'page2.html',
                controller: "loginController"
            })

            .state('page4', {
                url: '/newcontroller',
                templateUrl: 'page4.html'
            })

            .state('modal3', {
                url: '/modal',
                templateUrl: 'modal3.html'
            })

            .state('mycontrollers', {
                url: '/mycontrollers',
                templateUrl: 'page6.html'
            })

            .state('page7', {
                url: '/controller_detail/:1',
                templateUrl: 'page7.html'
            })
        ;

        // if none of the above states are matched, use this as the fallback

        $urlRouterProvider.otherwise('/login');

        // if none of the above states are matched, use this as the fallback

        $resourceProvider.defaults.stripTrailingSlashes = false;
        // Django default name
        /*csrfCD.setHeaderName('X-CSRFToken');
         csrfCD.setCookieName('CSRFToken');
         // You can even configure HTTP methods to set csrf
         csrfCD.setAllowedMethods(['GET', 'POST', 'HEAD']);*/
        $httpProvider.defaults.xsrfCookieName = 'csrftoken';
        $httpProvider.defaults.xsrfHeaderName = 'X-CSRFToken';

    });
