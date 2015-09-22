/**
 * Created by dmarkey on 9/22/15.
 */
angular.module('app.controllers', [])


    .controller('loginController', function ($scope, $ionicModal, $timeout, $http, $ionicPopup, $state, $ionicHistory) {

        var permanentStorage = window.localStorage;
        var token = permanentStorage.getItem("auth_token");
        if(token != null){
            $ionicHistory.nextViewOptions({
                historyRoot: true
            });
            $state.go("mycontrollers", {}, {location:'replace'});
        }


        // With the new view caching in Ionic, Controllers are only called
        // when they are recreated or on app start, instead of every page change.
        // To listen for when this page is active (for example, to refresh data),
        // listen for the $ionicView.enter event:
        //$scope.$on('$ionicView.enter', function(e) {
        //});

        $scope.loginData = {};
        $scope.doLogin = function () {
            $scope.isProcessing = true;
            console.log('Doing login', $scope.loginData);

            // Simulate a login delay. Remove this and replace with your login
            // code if using a login system
            $http.post('http://dmarkey.com:8080/api-token-auth/', $scope.loginData).
                then(function (response) {

                    permanentStorage.setItem("auth_token", response.data.token);

                    // this callback will be called asynchronously
                    // when the response is available
                }, function (response) {

                    var alertPopup = $ionicPopup.alert({
                        title: 'Login failed!',
                        template: 'Please check your credentials!'
                    });
                    $scope.isProcessing = false;

                    // called asynchronously if an error occurs
                    // or server returns response with an error status.
                });


        };
    })

    .controller('SocketsCtrl', function ($scope, $http, $cookies, SocketService) {
        $http.defaults.headers.post['X-CSRFToken'] = $cookies.csrftoken;
        $scope.sockets = SocketService.query();
        $scope.onSocketChange = function (socket_changed) {
            if (socket_changed.human_name == "") {
                socket_changed.human_name = "Not set"
            }
            socket_changed.$update()
        }
    })

    .controller('SocketCtrl', function ($scope, $stateParams) {
    });