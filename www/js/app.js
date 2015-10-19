// Ionic Starter App
var BASE_URL = "http://localhost:8081/";
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
        return $resource(BASE_URL + 'localhost:8001/api/sockets/:id/', {id: '@id'},
            {
                'update': {method: 'PUT'}
            });


    })
    .factory('UnclaimedControllerService', function ($resource) {
        return $resource(BASE_URL + 'api/unclaimed_controllers/:id/', {id: '@id'},
            {
                'claim': {method: 'POST', url:BASE_URL + "api/unclaimed_controllers/:id/claim/"}
            });
    })
    .factory('myControllerService', function ($resource) {
        return $resource(BASE_URL + 'api/my_controllers/:id/', {id: '@id'})
    })
    .run(['$http', '$cookies', function ($http, $cookies) {
        $http.defaults.headers.post['X-CSRFToken'] = $cookies.csrftoken;
    }])

    .config(function ($stateProvider, $urlRouterProvider, $resourceProvider, $httpProvider) {
        $stateProvider


            .state('login', {
                url: '/login',
                templateUrl: 'page2.html',
                controller: "loginController"
            })
            .state("home", {
                url:"/home",
                templateUrl: 'home.html'
            })
            .state('mycontrollers', {
                url: '/controllers',
                controller: "myControllersCtrl",
                templateUrl: 'page6.html'
            })
            .state("mycontrollers_detail", {
                url: '/controllers/:controllerId',
                controller: "controllerDetailCtrl",
                templateUrl: 'controllerDetail.html'
            })
            .state('newcontroller', {
                url: '/newcontroller',
                templateUrl: 'page4.html',
                controller: "unclaimedControllersCtrl"
            })
        ;

        // if none of the above states are matched, use this as the fallback

        $urlRouterProvider.otherwise('/login');
        $httpProvider.defaults.useXDomain = true;
        delete $httpProvider.defaults.headers.common['X-Requested-With'];

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
