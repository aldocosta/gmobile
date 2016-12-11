"use strict";
ang.controller('PlaylistCtrl', ['$scope', '$stateParams', '$rootScope', '$location', 'Users', '$ionicLoading', '$ionicScrollDelegate', 'Plugins',
'$ionicModal','$ionicPopup',
    function ($scope, $stateParams, $rootScope, $location, Users, $ionicLoading, $ionicScrollDelegate, Plugins,$ionicModal
        ,$ionicPopup) {
        var users = [];

        $ionicModal.fromTemplateUrl('templates/equipamentos.html', {
            scope: $scope
        }).then(function (modal) {
            $scope.equipamentos = modal;
        });

        if ($location.search().v != 0) {
            $ionicLoading.show({
                template: 'Aguarde...'
            });
            Users.returnUsers().then(function (u) {
                users = u;
                $scope.personagem = users.search({ key: 'nome', value: $location.search().v });

                for (var i = 0; i < $scope.personagem.equipamentos.length; i++) {
                    delete $scope.personagem.equipamentos[i]['$$hashKey'];
                }

                $ionicLoading.hide();
                $ionicScrollDelegate.scrollTop();
            });
        }

        /*verificando qual aba da ficha é para mostrar*/
        $scope.parametro = $stateParams.playlistId;
        if ($scope.parametro == 'Atributos') {
            $scope.atributos = true;
        }

        if ($scope.parametro == 'Pericias') {
            $scope.pericias = true;
        }

        if ($scope.parametro == 'Vantagens') {
            $scope.vantagens = true;
        }

        if ($scope.parametro == 'Desvantagens') {
            $scope.desvantagens = true;
        }

        if ($scope.parametro == 'Equipamentos') {
            $scope.equipament = true;
        }


        $scope.plus = function (p) {
            p.plus++;
            var stringado = Users.returnUserToSave($scope.personagem);

            Plugins.Sql.executeQueryUpdate(stringado, $scope.personagem.id);
        }

        $scope.less = function (p) {
            p.plus--;
            var stringado = Users.returnUserToSave($scope.personagem);

            Plugins.Sql.executeQueryUpdate(stringado, $scope.personagem.id);
        }

        $scope.plusVantagem = function (v) {
            v.plus++;
            var stringado = Users.returnUserToSave($scope.personagem);

            Plugins.Sql.executeQueryUpdate(stringado, $scope.personagem.id);
        }

        $scope.lessVantagem = function (v) {
            v.plus--;
            var stringado = Users.returnUserToSave($scope.personagem);

            Plugins.Sql.executeQueryUpdate(stringado, $scope.personagem.id);
        }

        $scope.plusdesvantagem = function (v) {
            v.plus++;
            var stringado = Users.returnUserToSave($scope.personagem);

            Plugins.Sql.executeQueryUpdate(stringado, $scope.personagem.id);
        }

        $scope.lessdesvantagem = function (v) {
            v.plus--;
            var stringado = Users.returnUserToSave($scope.personagem);

            Plugins.Sql.executeQueryUpdate(stringado, $scope.personagem.id);
        }

        $scope.addEquipamentos = function () {
            if ($scope.equipamento) {
                $scope.equipamento.nome = '';
                $scope.equipamento.descricao = '';
            }

            $scope.edit = false;
            $scope.equipamentos.show();
        }

        $scope.salvarEquipamento = function (equipamento) {
            var obj = { nome: equipamento.nome, descricao: equipamento.descricao }

            if (obj.nome != '') {

                for (var i = $scope.personagem.equipamentos.length - 1; i >= 0; i--) {
                    delete $scope.personagem.equipamentos[i].$$hashKey; 
                }

                $scope.personagem.equipamentos.push(obj);
                var stringado = Users.returnUserToSave($scope.personagem);
                Plugins.Sql.executeQueryUpdate(stringado, $scope.personagem.id);
                
                $scope.equipamentos.hide().then(function(){                    
                    equipamento.nome = '';
                    equipamento.descricao = '';
                });                
            }
        }

        $scope.editarEquipamento = function(eq){
            $scope.equipamentoedit = eq;
            $scope.edit = true;
            $scope.equipamentos.show();        
        }


        $scope.editarEquipamentoUsuario = function () {
            var stringado = Users.returnUserToSave($scope.personagem);
            Plugins.Sql.executeQueryUpdate(stringado, $scope.personagem.id);
            $scope.equipamentos.hide();
        }

         $scope.removerEquipamento = function (equipamento) {
            $ionicPopup.confirm({
                title: 'Remover Equipamento?',
                template: 'Deseja realmente remover este equipamento?'
            }).then(function (res) {
                if (res) {                    
                    $scope.personagem.equipamentos.remove({ key: 'nome', value: equipamento.nome });
                    var stringado = Users.returnUserToSave($scope.personagem);
                    Plugins.Sql.executeQueryUpdate(stringado, $scope.personagem.id);                    
                }
            });
        }

        $scope.removerEquipamentos = function () {
            $ionicPopup.confirm({
                title: 'Remover Equipamentos?',
                template: 'Deseja realmente remover todos equipamentos?'
            }).then(function (res) {
                if (res) {
                    $scope.personagem.equipamentos = [];
                    var stringado = Users.returnUserToSave($scope.personagem);
                    Plugins.Sql.executeQueryUpdate(stringado, $scope.personagem.id);
                }
            });        
        }        

        $scope.closeModal = function (modal) {
            if(modal=='equipamentos'){
                $scope.equipamentos.hide();
            }
        }; 

        $scope.$on('eventoResetDados', function () {
            $scope.personagem = null;
        });
        //var oldSoftBack = $rootScope.$ionicGoBack;

        //$rootScope.$ionicGoBack = function () {

        //    var stringado = Users.returnUserToSave($scope.personagem);

        //    Plugins.Sql.executeQueryUpdate(stringado, $scope.personagem.id);
        //    $ionicLoading.hide();
        //    oldSoftBack();
        //};

    }]);