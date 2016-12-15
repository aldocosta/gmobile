ang.controller('PlaylistsCtrl', ['$scope', '$ionicActionSheet', '$ionicSideMenuDelegate', '$rootScope', 'Users', '$ionicLoading', '$ionicPopup',
    '$ionicModal', '$ionicScrollDelegate', 'Config',
    function ($scope, $ionicActionSheet, $ionicSideMenuDelegate, $rootScope, Users, $ionicLoading, $ionicPopup, $ionicModal, $ionicScrollDelegate,
        Config) {

        var showAlert = function (msg) {
            var alertPopup = $ionicPopup.alert({
                title: 'Informação',
                template: msg
            });
        };
        var viewkey = document.getElementById('viewkey');
        if (viewkey) {
            viewkey.style.display = 'none';
        }

        var clearAll = function () {
            var canvas = document.getElementById('myCanvas2').getContext("2d");
            var w = Config.windowConfig.screenResolution.getIdealw();
            var h = Config.windowConfig.screenResolution.getIdealh();
            canvas.clearRect(0, 0, w, h);
            $scope.editando = false;
            $scope.personagem = Users.getUser();
            $scope.value = '';
            
            viewkey = document.getElementById('viewkey');
            if (viewkey) {
                viewkey.style.display = 'none';
            }
        }

        $scope.showMote = function (msg) {
            var alertPopup = $ionicPopup.alert({
                title: 'Frase do personagem',
                template: msg
            });
        }

        $scope.windowConfig = Config.windowConfig;

        $scope.playlists = [
          { title: 'Atributos', id: 1 },
          { title: 'Pericias', id: 2 },
          { title: 'Vantagens', id: 3 },
          { title: 'Desvantagens', id: 4 },
          { title: 'Equipamentos', id: 5 }
        ];

        $rootScope.$on('someEvent', function (e, mass) {
            $ionicLoading.show({
                template: 'Aguarde...'
            });

            $scope.value = mass.nome;
            
            Users.returnUsers().then(function (u) {
                viewkey = document.getElementById('viewkey');
                if (viewkey) {
                    viewkey.style.display = 'block';
                }

                $ionicScrollDelegate.scrollTop();
                $scope.editando = true;
                users = u;
                $scope.personagem = users.search({ key: 'id', value: mass.id });
                var img = document.getElementById('imgAt');
                img.style.width = 200;
                img.style.height = 300;
                img.src = $scope.personagem.img;

                img.onload = function () {
                    var canvas = document.getElementById('myCanvas2').getContext("2d");
                    var w = Config.windowConfig.screenResolution.getIdealw();
                    var h = Config.windowConfig.screenResolution.getIdealh();
                    canvas.drawImage(this, 0, 0, w, h);
                    this.src = '';
                    $ionicLoading.hide();
                }
            });
        });


        $scope.editar = function (p) {
            //var canvas = document.getElementById('myCanvas2').getContext("2d");
            //var w = Config.windowConfig.screenResolution.getIdealw();
            //var h = Config.windowConfig.screenResolution.getIdealh();
            //canvas.clearRect(0, 0, w, h);
            //$scope.editando = false;
            //$scope.personagem = Users.getUser();
            //$scope.value = '';
            clearAll();
            $rootScope.$emit('eventoEditar', p);
        }


    }]);