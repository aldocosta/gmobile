"use strict";
ang.controller('cadastroCtrl', ['$scope', '$ionicModal', '$timeout', '$ionicActionSheet', '$rootScope', 'Users', 'Plugins', '$ionicPopup', '$ionicLoading',
    'Config', '$ionicScrollDelegate', '$http',
function ($scope, $ionicModal, $timeout, $ionicActionSheet, $rootScope, Users, Plugins, $ionicPopup, $ionicLoading, Config, $ionicScrollDelegate,
    $http) {

    $scope.listapericias = [];

    var showAlert = function (msg, title) {
        var alertPopup = $ionicPopup.alert({
            title: title,
            template: msg
        });
    };

    function load() {
        $ionicLoading.show({
            template: 'Atualizando tabelas...'
        });

        if ($scope.listapericias.length == 0) {
            Config.getTabelaElementos().then(function (sucess) {
                $scope.listapericias = sucess;
                $ionicLoading.hide();
                $scope.novo.show();
            }, function (err) {
                $scope.listapericias = err;
                $ionicLoading.hide();
                $scope.novo.show();
            });
        } else {
            $ionicLoading.hide();
            $scope.novo.show();
        }
    }
    
    load();

    var windowConfig = Config.windowConfig;

    $scope.windowConfig = windowConfig;
    Config.Config().then(function (d) {
        $scope.config = d;
        console.log(d);
    }, function (err) {
        console.log(err);
    });
    
}]);