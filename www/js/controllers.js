/**
 * Created by dmarkey on 9/22/15.
 */
angular.module('app.controllers', [])


    .controller('loginController', function ($scope, $ionicModal, $timeout, $http, $ionicPopup,
                                             $state, $ionicHistory, UnclaimedControllerService) {

        var permanentStorage = window.localStorage;
        var token = permanentStorage.getItem("auth_token");
        if (token != null) {
            $ionicHistory.nextViewOptions({
                historyRoot: true
            });
            $http.defaults.headers.common['Authorization'] = "Token " + token;

            UnclaimedControllerService.query(null, function () {
                $state.go("home", {}, {location: 'replace'});
            });


        }


        // With the new view caching in Ionic, Controllers are only called
        // when they are recreated or on app start, instead of every page change.
        // To listen for when this page is active (for example, to refresh data),
        // listen for the $ionicView.enter event:
        //$scope.$on('$ionicView.enter', function(e) {
        //});

        $scope.loginData = {};
        $scope.doLogin = function () {
            $http.defaults.headers.common['Authorization'] = null;
            $scope.isProcessing = true;
            console.log('Doing login', $scope.loginData);

            // Simulate a login delay. Remove this and replace with your login
            // code if using a login system
            $http.post(BASE_URL + 'api-token-auth/', $scope.loginData).
                then(function (response) {

                    permanentStorage.setItem("auth_token", response.data.token);
                    $http.defaults.headers.common['Authorization'] = "Token " + response.data.token;
                    $state.go("home", {}, {location: 'replace'});


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

    .controller("unclaimedControllersCtrl", function ($scope, $http, $cookies, $state, UnclaimedControllerService, $ionicModal, $ionicHistory) {
        $http.defaults.headers.post['X-CSRFToken'] = $cookies.csrftoken;
        $scope.controllers = UnclaimedControllerService.query();


        $ionicModal.fromTemplateUrl('modal.html', {
            scope: $scope,
            animation: 'slide-in-up'
        }).then(function (modal) {
            $scope.modal = modal;
        });

        $scope.controller_setup = function (controller) {
            $scope.selected_controller = controller;
            $scope.modal.show();
        };


        $scope.confirm = function () {
            $scope.selected_controller.$claim().then(function () {
                $scope.modal.hide().then(
                    $ionicHistory.nextViewOptions({
                        historyRoot: true
                    }));
                $state.go("mycontrollers", {}, {location: 'replace', reload: true});
            })


        }


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

    .controller('myControllersCtrl', function ($scope, myControllerService) {
        $scope.controllers = myControllerService.query();


    })

    .controller('controllerDetailCtrl', function ($scope, myControllerService, $stateParams) {
        var controller = myControllerService.get({"id":$stateParams.controllerId});
        $scope.controller = controller;


    });