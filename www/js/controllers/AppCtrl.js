"use strict";
ang.controller('AppCtrl', ['$scope', '$ionicModal', '$timeout', '$ionicActionSheet', '$rootScope', 'Users', 'Plugins', '$ionicPopup', '$ionicLoading',
    'Config', '$ionicScrollDelegate', '$http', 'CrudPlugin', '$ionicSideMenuDelegate', '$ionicHistory', 'DiceRoll',
function ($scope, $ionicModal, $timeout, $ionicActionSheet, $rootScope, Users, Plugins, $ionicPopup, $ionicLoading, Config, $ionicScrollDelegate,
    $http, CrudPlugin, $ionicSideMenuDelegate, $ionicHistory, DiceRoll) {

    Plugins.Sql.InitCharge();
    $scope.pericianova = { tipo: '', nome: '', nh: '', custo: '' }
    $scope.somacustopericias = 0;
    $scope.labelVantagemTotal = 0;
    $scope.labelDesVantagemTotal = 0;
    $scope.atributoscustonovaficha = 0;
    $scope.totalprecoficha = 0;

    // With the new view caching in Ionic, Controllers are only called
    // when they are recreated or on app start, instead of every page change.
    // To listen for when this page is active (for example, to refresh data),
    // listen for the $ionicView.enter event:
    //$scope.$on('$ionicView.enter', function(e) {
    //}); 

    init(true);

    $scope.user = Users.getUser();

    $scope.vantagem = {}

    $scope.desvantagem = {}

    $scope.pericia = {}

    Config.Config().then(function (d) {
        $scope.config = d;
        console.log(d);
    }, function (err) {
        console.log(err);
    });

    function vibrateAction(time) {
        if ($scope.config) {
            if ($scope.config.vibrate) {
                navigator.vibrate(time);
            }
        }
    }

    var showAlert = function (msg) {
        var alertPopup = $ionicPopup.alert({
            title: 'Informação',
            template: msg
        });
    };

    var windowConfig = Config.windowConfig;

    $scope.windowConfig = windowConfig;

    $scope.listapericias = [];
    $scope.listavantagens = [];
    $scope.listadesvantagens = [];

    var clearAll = function () {
        var canvas = document.getElementById('myCanvas');
        if (canvas) {
            canvas = canvas.getContext("2d");
            var img = document.createElement('img');
            img.src = '';
            var w = windowConfig.screenResolution.getIdealw();
            var h = windowConfig.screenResolution.getIdealh();
            canvas.clearRect(0, 0, w, h);
        }

        canvas = document.getElementById('myCanvas2').getContext("2d");

        if (canvas) {
            var w = Config.windowConfig.screenResolution.getIdealw();
            var h = Config.windowConfig.screenResolution.getIdealh();
            canvas.clearRect(0, 0, w, h);
        }

        $scope.pericia.nome = '';
        $scope.desvantagem.nome = '';
        $scope.vantagem.nome = '';
        $scope.user = Users.getUser();
        vibrateAction(100);
    }

    ///Carrega os usuários
    function init(flag) {
        try {
            $ionicLoading.show({
                template: 'Carregando Personagens...'
            });

            Users.returnUsers().then(function (u) {
                $scope.users = u;
                $scope.$digest();
                $ionicLoading.hide();
                if ($scope.user.id == "") {
                    if (flag) {
                        $ionicSideMenuDelegate.toggleLeft();
                    }
                    vibrateAction(100);
                }

            }, function (err) {
                $ionicLoading.hide();
                console.log(err);
                $scope.users = [];
                $ionicSideMenuDelegate.toggleLeft();
            });

        } catch (e) {
            showAlert(e);
        }
    }

    // Create the login modal that we will use later
    $ionicModal.fromTemplateUrl('templates/sobre.html', {
        scope: $scope
    }).then(function (modal) {
        $scope.modal = modal;
    });

    $ionicModal.fromTemplateUrl('templates/novo.html', {
        scope: $scope
    }).then(function (novo) {
        $scope.user = Users.getUser();
        $scope.novo = novo;
        $scope.imgurl = '';
    });

    $ionicModal.fromTemplateUrl('templates/cadpericias.html', {
        scope: $scope
    }).then(function (modal) {
        $scope.cadastros = modal;
    });

    $ionicModal.fromTemplateUrl('templates/cadvantagem.html', {
        scope: $scope
    }).then(function (modal) {
        $scope.cadvantagem = modal;
    });

    $ionicModal.fromTemplateUrl('templates/caddesvantagem.html', {
        scope: $scope
    }).then(function (modal) {
        $scope.caddesvantagem = modal;
    });

    $ionicModal.fromTemplateUrl('templates/config.html', {
        scope: $scope
    }).then(function (configuracoes) {
        $scope.configuracoes = configuracoes;
    });

    $ionicModal.fromTemplateUrl('templates/Dice.html', {
        scope: $scope
    }).then(function (dice) {
        $scope.dice = dice;
    });

    // Triggered in the login modal to close it
    $scope.closeLogin = function () {
        $scope.modal.hide();
    };

    $scope.closeModal = function (modal) {
        var canvas = document.getElementById('myCanvas');
        if (canvas) {
            canvas = canvas.getContext("2d");
            var w = windowConfig.screenResolution.getIdealw();
            var h = windowConfig.screenResolution.getIdealh();
            canvas.clearRect(0, 0, w, h);
        }

        $scope.listapericias = [];
        $scope.listavantagens = [];
        $scope.listadesvantagens = [];

        if (modal == 'novo') {
            $scope.totalprecoficha = 0;
            $scope.user = Users.getUser();
            $scope.novo.hide();
            vibrateAction(100);
        } else if (modal == 'sobre') {
            $scope.user = Users.getUser();
            $scope.modal.hide();
            vibrateAction(100);
        }
        else if (modal == 'configuracoes') {
            $scope.configuracoes.hide();
            vibrateAction(100);
        }

        else if (modal == 'cadastros') {
            $scope.cadastros.hide();
            vibrateAction(100);
        }

        else if (modal == 'vantagens') {
            $scope.cadvantagem.hide();
            vibrateAction(100);
        }

        else if (modal == 'desvantagens') {
            $scope.caddesvantagem.hide();
            vibrateAction(100);
        }

        else if (modal == 'equipamentos') {
            $scope.equipamentos.hide();
            vibrateAction(100);
        }

        else if (modal == 'tools') {
            $scope.dice.hide();
            vibrateAction(100);
        }
    };

    function loadAll(key) {
        var p = new Promise(function (resolve, reject) {

            if (key) {
                loadDesVantagens().then(function (d) {
                    loadVantagens().then(function (d) {
                        Config.getTabelaElementos().then(function (sucess) {
                            $scope.listapericias = sucess.sort(function (a, b) {
                                if (a.nome < b.nome) {
                                    return -1
                                }
                                if (a.nome > b.nome) {
                                    return 1
                                }
                                return 0;
                            });
                            resolve(true);
                        }, function (err) {
                            $scope.listapericias = err;
                            reject(false);
                        });
                    }).catch(function (err) {
                        reject(err);
                    });
                });
            } else {
                if ($scope.listadesvantagens == undefined || $scope.listadesvantagens.length <= 0) {
                    loadDesVantagens().then(function (d) {
                        loadVantagens().then(function (d) {
                            Config.getTabelaElementos().then(function (sucess) {
                                $scope.listapericias = sucess.sort(function (a, b) {
                                    if (a.nome < b.nome) {
                                        return -1
                                    }
                                    if (a.nome > b.nome) {
                                        return 1
                                    }
                                    return 0;
                                });;
                                resolve(true);
                            }, function (err) {
                                $scope.listapericias = err;
                                reject(false);
                            });
                        }).catch(function (err) {
                            reject(err);
                        });
                    });
                }
                else if ($scope.listavantagens == undefined || $scope.listavantagens.length <= 0) {
                    loadVantagens().then(function (d) {
                        Config.getTabelaElementos().then(function (sucess) {
                            $scope.listapericias = sucess.sort(function (a, b) {
                                if (a.nome < b.nome) {
                                    return -1
                                }
                                if (a.nome > b.nome) {
                                    return 1
                                }
                                return 0;
                            });
                            resolve(true);
                        }, function (err) {
                            $scope.listapericias = err;
                            reject(false);
                        });
                    }).catch(function (err) {
                        reject(err);
                    });
                }

                else if ($scope.listapericias = undefined || $scope.listapericias.length <= 0) {
                    Config.getTabelaElementos().then(function (sucess) {
                        $scope.listapericias = sucess.sort(function (a, b) {
                            if (a.nome < b.nome) {
                                return -1
                            }
                            if (a.nome > b.nome) {
                                return 1
                            }
                            return 0;
                        });;
                        resolve(true);
                    }, function (err) {
                        $scope.listapericias = err;
                        reject(false);
                    });
                } else {
                    resolve(true);
                }
            }
        });
        return p;
    }


    $scope.action = function () {
        var hideSheet = $ionicActionSheet.show({
            buttons: [
              { text: '<span class="ion-person-add positive biggo"></span>  <span class="positive">Novo Personagem</span> ' },
              { text: '<span class="ion-settings positive biggo"></span> <span class="positive">Ferramentas</span>' },
              { text: '<span class="ion-gear-b positive biggo"></span> <span class="positive">Configurações</span> ' },
              { text: '<span class="ion-plus-circled positive biggo"></span> <span class="positive">Pericias</span> ' },
              { text: '<span class="ion-plus-circled positive biggo"></span> <span class="positive">Vantagens</span> ' },
              { text: '<span class="ion-plus-circled positive biggo"></span> <span class="positive">Desvantages</span> ' },
              { text: '<span class="ion-information-circled positive biggo"></span> <span class="positive">Sobre</span>' }
            ],
            //destructiveText: 'Delete',
            titleText: '<span style="text-align:center" class="ion-ios-settings-strong assertive biggo"> Opções</span>',
            //cancelText: 'Cancel',
            //cancel: function () {
            //    // add cancel code..
            //},
            buttonClicked: function (index) {
                $ionicScrollDelegate.scrollTop();

                //novo personagem
                if (index == 0) {
                    clearAll();

                    if ($scope.config.firstRun) {
                        var ret = $ionicPopup.alert({
                            title: 'First Run',
                            template: 'Atenção, não esqueça de personalizar vantagens/desvantagens que ' +
                            ' contém itens que podem variar o custo de acordo com nt/narrador critérios!'
                        });
                        $scope.config.firstRun = false;
                        $scope.updateConfig($scope.config);
                        return;
                    }

                    $ionicLoading.show({
                        template: 'Atualizando tabelas...'
                    });

                    $scope.novo.show().then(function () {
                        //loadAll(false).then(function () {
                            $scope.limpar();
                            $ionicLoading.hide();
                            $scope.editando = false;
                        //});
                    });
                }

                if (index == 1) {
                    $scope.dice.show();
                }

                //configuracoes
                if (index == 2) {
                    Config.Config().then(function (d) {
                        $scope.config = d;
                        $scope.lblCamQuality = Config.Util.getLabelQualityFoto($scope.config.quality);
                    }, function (err) {
                        console.log(err);
                    });
                    $scope.configuracoes.show();
                }

                //pericias
                if (index == 3) {
                    $ionicLoading.show({
                        template: 'Atualizando tabelas...'
                    });
                    $scope.cadastros.show().then(function () {
                        loadPericias(false).then(function (data) {
                            $ionicLoading.hide();
                            $scope.listavantagens = [];
                            $scope.listadesvantagens = [];
                            $scope.pericianova.nome = '';
                        }, function () {
                            $scope.cadastros.show();
                        });
                    });
                }

                //vantagens
                if (index == 4) {
                    $ionicLoading.show({
                        template: 'Atualizando tabelas...'
                    });

                    $scope.cadvantagem.show().then(function () {
                        loadVantagens().then(function () {
                            $scope.listadesvantagens = [];
                            $scope.listapericias = [];
                            $ionicLoading.hide();
                        }).catch(function () {
                            $ionicLoading.hide();
                            console.log('fuuuu');
                        });
                    });
                }

                //desvantagens
                if (index == 5) {
                    $ionicLoading.show({
                        template: 'Atualizando tabelas...'
                    });

                    $scope.caddesvantagem.show().then(function () {
                        loadDesVantagens().then(function () {
                            $ionicLoading.hide();
                        }).catch(function (err) {
                            $ionicLoading.hide();
                            console.log('fuuuu: ' + err);
                        });
                    });
                }

                //sobre
                if (index == 6) {
                    $scope.modal.show();
                }

                return true;
            }
        });
    }

    $scope.eventoclick = function (key) {
        $rootScope.$emit('someEvent', key);
    }

    var calculoVantagensDesvantagens = function (Things) {
        var total = 0;

        for (var i = Things.length - 1; i >= 0; i--) {
            total += parseInt(Things[i].custo);
        }

        return total;
    }

    $scope.addVantagem = function (u) {
        $scope.user.vantagens = $scope.user.vantagens || [];
        var ret = $scope.user.vantagens.search({ key: 'nome', value: u.nome });

        if (!ret) {
            $scope.user.vantagens.unshift({ nome: u.nome, custo: u.custo, plus: 0 });
            $scope.labelVantagemTotal = calculoVantagensDesvantagens($scope.user.vantagens);
            $scope.totalprecoficha +=  calculoVantagensDesvantagens($scope.user.vantagens);
            vibrateAction(100);
        }
    }

    $scope.addDesvantagem = function (u) {
        $scope.user.desvantagens = $scope.user.desvantagens || [];
        var ret = $scope.user.desvantagens.search({ key: 'nome', value: u.nome });

        if (!ret) {
            $scope.user.desvantagens.unshift({ nome: u.nome, custo: u.custo, plus: 0 });
            $scope.labelDesVantagemTotal = calculoVantagensDesvantagens($scope.user.desvantagens);
            $scope.totalprecoficha += calculoVantagensDesvantagens($scope.user.desvantagens);
            vibrateAction(100);
        }
    }

    $scope.removeVantagem = function (v) {
        $scope.user.vantagens.remove({ key: 'nome', value: v.nome });
        $scope.labelVantagemTotal = calculoVantagensDesvantagens($scope.user.vantagens);
        $scope.totalprecoficha += calculoVantagensDesvantagens($scope.user.vantagens);
        vibrateAction(100);
    }

    $scope.removeDesvantagem = function (d) {
        $scope.user.desvantagens.remove({ key: 'nome', value: d.nome });
        $scope.labelDesVantagemTotal = calculoVantagensDesvantagens($scope.user.desvantagens);
        $scope.totalprecoficha += calculoVantagensDesvantagens($scope.user.desvantagens);
        vibrateAction(100);
    }

    $scope.addPericia = function (u) {
        $scope.user.pericias = $scope.user.pericias || [];
        var ret = $scope.user.pericias.search({ key: 'nome', value: u.nome });
        var sum = 0;        

        if (!ret) {
            $scope.user.pericias.unshift({ nome: u.nome, nh: u.nh, custo: u.custo, plus: 0 });
            if (u.custo == 'FACIL') {
                //sum++;
                sum += 1 ;
            }
            if (u.custo == 'MEDIO') {
                //sum = sum + 2;
                sum +=  2;
            }
            if (u.custo == 'DIFICIL') {
                //sum = sum + 4;
                sum += 4;
            }

            if (u.custo == 'MUITO DIFICIL') {
                //sum = sum + 8;
                sum +=  8;
            }

            $scope.somacustopericias += sum;
            $scope.totalprecoficha += sum;
            vibrateAction(100);
        }
    }

    $scope.removePericia = function (p) {
        $scope.user.pericias.remove({ key: 'nome', value: p.nome });
        var sum = 0;

        if (p.custo == 'FACIL') {
            //sum++;
            sum += -1 ;
        }
        if (p.custo == 'MEDIO') {
            //sum = sum + 2;
            sum +=  -2;
        }
        if (p.custo == 'DIFICIL') {
            //sum = sum + 4;
            sum += -4;
        }

        if (p.custo == 'MUITO DIFICIL') {
            //sum = sum + 8;
            sum +=  -8;
        }

        $scope.somacustopericias += sum;
        $scope.totalprecoficha +=sum;
        vibrateAction(100);        
    }

    $scope.clearForm = function () {
        $scope.user = Users.getUser();
        vibrateAction(100);
    }

    $scope.salvar = function () {
        if ($scope.user) {
            if (!$scope.user.nome || $scope.user.nome == undefined || $scope.user.nome == '') {
                vibrateAction(100);
                showAlert('Escolha o nome do personagem.')
                return;
            }

            if (!$scope.imgurl || $scope.imgurl == undefined) {
                vibrateAction(100);
                showAlert('Escolha a imagem do personagem.')
                return;
            }

            if ($scope.config.simetria) {
                var ttvantagens = parseInt(calculoVantagensDesvantagens($scope.user.vantagens));
                var ttdesvantagens = parseInt(calculoVantagensDesvantagens($scope.user.desvantagens));
                ttdesvantagens *= -1;
                if (ttvantagens != ttdesvantagens) {
                    showAlert('A configuração atual exige simetria das vantagens com as desvantagens.');
                    return;
                }
            }

            $ionicLoading.show({
                template: 'Aguarde...'
            });

            $scope.users = $scope.users || [];
            $scope.users.unshift($scope.user);//adicionando na lista do começo do app? nao lembro, creio q sim
            $scope.user.img = $scope.imgurl;//imagem aberta no usario, aqui é string base64

            $scope.user.atributos.von = $scope.user.atributos.dx;
            $scope.user.atributos.pf = $scope.user.atributos.ht;
            $scope.user.atributos.per = $scope.user.atributos.iq;
            $scope.user.atributos.pv = $scope.user.atributos.st;

            /*
                ATRIBUTOS ESPELHO
                NUNCA MUDAM, SERVEM PARA CALCULAR O AUMENTO DOS ATRIBUTOS NA EDIÇÃO
            */
            $scope.user.__atributos.st = $scope.user.atributos.st;
            $scope.user.__atributos.dx = $scope.user.atributos.dx;
            $scope.user.__atributos.iq = $scope.user.atributos.iq;
            $scope.user.__atributos.ht = $scope.user.atributos.ht;
            $scope.user.__atributos.von = $scope.user.atributos.dx;
            $scope.user.__atributos.pf = $scope.user.atributos.ht;
            $scope.user.__atributos.per = $scope.user.atributos.iq;
            $scope.user.__atributos.pv = $scope.user.atributos.st;

            //adequando os paraatributos

            //traz string para salvar
            var stringado = Users.returnUserToSave($scope.user);

            Plugins.Sql.executeQuery(stringado);
            //$ionicPopup.alert({
            //    title: 'Informação',
            //    template: 'Personagem Incluido'
            //});
            $ionicLoading.hide();
            init(false);
            $scope.novo.hide(function () {
                $scope.config.firsRun = false;
                vibrateAction(100);
            });
        } else {
            $ionicPopup.alert({
                title: 'Informação',
                template: 'Campo nome obrigatório.'
            });
        }

    }

    $scope.editarRegistro = function () {
        $scope.user.img = $scope.imgurl;

        var stringado = Users.returnUserToSave($scope.user);

        Plugins.Sql.executeQueryUpdate(stringado, $scope.user.id);
        init(false);
        $scope.novo.hide(function () {
            vibrateAction(100);
        });
    }

    $scope.excluir = function () {
        vibrateAction(100);
        var exclusao = $ionicPopup.confirm({
            title: 'Exclusão de personagem',
            template: 'Quer mesmo excluir este personagem?'
        });
        exclusao.then(function (res) {
            if (res) {
                Plugins.Sql.executeQueryExcluir($scope.user.id);

                Users.returnUsers().then(function (u) {
                    $scope.users = u;
                    $scope.$digest();
                    $ionicLoading.hide();
                    $scope.novo.hide();
                }, function (err) {
                    $ionicLoading.hide();
                    console.log(err);
                    $scope.users = [];
                    $scope.novo.hide();
                });
            }
        });

    }

    $scope.limpar = function () {
        $scope.user = Users.getUser();
        $scope.somacustopericias = 0;
        $scope.labelVantagemTotal = 0;
        $scope.labelDesVantagemTotal = 0;
        $scope.atributoscustonovaficha = 0;
        $scope.totalprecoficha = 0;
        $scope.custototaldaficha  = 0;
        vibrateAction(100);
    }

    /*CARREGANDO UMA IMAGEM NA TELA DE NOVO PERSONAGEM*/
    $scope.pic = function () {
        $ionicLoading.show({
            template: 'Aguarde...'
        });

        var st = 0;
        if ($scope.config) {
            st = $scope.config.camera_galeria ? 1 : 0;
        }

        navigator.camera.getPicture(function sucess(imgUrl) {
            var img = document.createElement('img');
            var image = "data:image/jpeg;base64," + imgUrl;
            var w = windowConfig.screenResolution.getIdealw();
            var h = windowConfig.screenResolution.getIdealh();

            img.src = image;
            $scope.imgurl = image;

            img.onload = function () {
                var canvas = document.getElementById('myCanvas').getContext("2d");

                canvas.drawImage(this, 0, 0, w, h);
                $ionicLoading.hide();
            }
        }, function fail(e) {
            console.log(e);
            $ionicLoading.hide();
        }, {
            quality: $scope.config.quality,
            encodingType: Camera.EncodingType.JPEG,
            destinationType: Camera.DestinationType.DATA_URL,
            sourceType: st,
            correctOrientation: false,
            allowEdit: false
        });
    }

    $rootScope.$on('eventoEditar', function (e, mass) {
        $ionicLoading.show({
            template: 'Carregando Personagem...'
        });
        $scope.totalprecoficha = 0;

        var myCanvas = document.getElementById('myCanvas');
        if (myCanvas) {
            myCanvas.focus();
        }

        $scope.editando = true;
        $ionicSideMenuDelegate.toggleLeft();
        $ionicScrollDelegate.scrollTop();
        $scope.novo.show();
        $scope.user = mass;
        var img = document.createElement('img');
        var image = mass.img;
        img.src = image;
        $ionicLoading.hide();

        $scope.imgurl = image;
        img.onload = function () {
            var canvas = document.getElementById('myCanvas').getContext("2d");
            var w = windowConfig.screenResolution.getIdealw();
            var h = windowConfig.screenResolution.getIdealh();
            canvas.drawImage(this, 0, 0, w, h);

            this.src = '';
        }

        /*loadAll(false).then(function () {
            $scope.editando = true;
            $ionicSideMenuDelegate.toggleLeft();
            $ionicScrollDelegate.scrollTop();

            $scope.novo.show();
            $scope.user = mass;
            var img = document.createElement('img');
            var image = mass.img;
            img.src = image;
            $ionicLoading.hide();

            $scope.imgurl = image;
            img.onload = function () {
                var canvas = document.getElementById('myCanvas').getContext("2d");
                var w = windowConfig.screenResolution.getIdealw();
                var h = windowConfig.screenResolution.getIdealh();
                canvas.drawImage(this, 0, 0, w, h);

                this.src = '';
            }
        });*/
    });

    $scope.updateConfig = function (config) {
        $scope.lblCamQuality = Config.Util.getLabelQualityFoto($scope.config.quality);
        Config.SetConfig(JSON.stringify(config));
        vibrateAction(100);
    }

    $scope.resetDados = function (config) {
        vibrateAction(100);
        var exclusao = $ionicPopup.confirm({
            title: 'Reset de dados',
            template: 'Todos os personagens e pericias/vantagens/desvantagens serão apagados, a app ficará como da 1ª vez que instalou, deseja continuar?'
        });
        exclusao.then(function (res) {
            if (res) {
                try {
                    Plugins.Sql.resetGeral().then(function (res) {
                        clearAll();
                        init(false);
                        var viewkey = document.getElementById('viewkey');
                        if (viewkey) {
                            viewkey.style.display = 'none';
                        }
                    });// executeQueryExcluir($scope.user.id);
                } catch (e) {
                    console.log(e);
                }
                //init();
                $scope.configuracoes.hide();
            } else {
                $scope.config.reset = res;
            }
        });
    }

    $scope.fill = function (u) {
        $scope.addPericia(u);
    }

    /*
    CASO TRUE, VALIDA SE É A PRIMEIRA VEZ QUE CARREGOU AS PERICIAS
    CASO FALSE, CARREGA DE QUALQUER JEITO
    */
    function loadPericias(key) {
        var p = new Promise(function (resolve, reject) {

            CrudPlugin.Crud.ExecuteQueryConsulta({
                query: 'select * from tbpericias',
                args: []
            }).then(function (pericias) {
                $scope.listapericias = pericias.sort(function (a, b) {
                    if (a.nome < b.nome) {
                        return -1
                    }
                    if (a.nome > b.nome) {
                        return 1
                    }
                    return 0;
                });;
                resolve();
            }, function (err) {
                console.log(err);
                reject();
            });
        });
        return p;
    }

    function loadVantagens() {
        var p = new Promise(function (r, f) {

            CrudPlugin.Crud.ExecuteQueryConsulta({
                query: 'select * from tbvantagens',
                args: []
            }).then(function (d) {
                $scope.listavantagens = d.sort(function (a, b) {
                    if (a.nome < b.nome) {
                        return -1
                    }
                    if (a.nome > b.nome) {
                        return 1
                    }
                    return 0;
                });
                r(true);
            }).catch(function (err) {
                f(err);
            });
        });
        return p;
    }

    function loadDesVantagens() {
        var p = new Promise(function (r, f) {

            CrudPlugin.Crud.ExecuteQueryConsulta({
                query: 'select * from tbdesvantagens',
                args: []
            }).then(function (d) {
                $scope.listadesvantagens = d.sort(function (a, b) {
                    if (a.nome < b.nome) {
                        return -1
                    }
                    if (a.nome > b.nome) {
                        return 1
                    }
                    return 0;
                });
                r(true);
            }).catch(function (err) {
                f(err);
            });
        });
        return p;
    }

    //cria novas pericias na lista de pericias
    $scope.criarPericias = function (periciaNova) {
        var db = window.sqlitePlugin.openDatabase({ name: 'gurps.db', location: 'default' });
        db.transaction(function (txIn) {

            $ionicLoading.show({
                template: 'Atualizando...'
            });

            try {
                db.executeSql('INSERT INTO tbpericias(data) VALUES (?)', [JSON.stringify(periciaNova)],
                function (resultSet) {
                    periciaNova.id = resultSet.insertId;
                    $scope.listapericias.unshift(periciaNova);
                    $ionicLoading.hide(function () {
                        vibrateAction(100);
                    });
                });
            } catch (e) {
                $ionicLoading.hide();
                console.log(e);
            }
        });
    }

    $scope.removerPericia = function (periciaNova) {
        vibrateAction(100);
        event.stopPropagation();
        var confirmPopup = $ionicPopup.confirm({
            title: 'Remover Pericia?',
            template: 'Deseja realmente remover esta pericia?'
        });

        confirmPopup.then(function (res) {
            if (res) {
                var db = window.sqlitePlugin.openDatabase({ name: 'gurps.db', location: 'default' });
                db.transaction(function (txIn) {
                    txIn.executeSql('delete from tbpericias where id = ?', [periciaNova.id]);
                    $scope.listapericias.remove({ key: 'nome', value: periciaNova.nome });
                    vibrateAction(100);
                    $scope.$digest();
                });
            }
        });
    }

    $scope.editandoPericia = function (pericia) {
        $scope.periciaeditando = pericia;
        $scope.editandopericia = true;
    }

    $scope.cancelarEditandoPericia = function () {
        $scope.editandopericia = false;
    }

    $scope.atualizarPericia = function () {
        $scope.cancelarEditandoPericia();
        var db = window.sqlitePlugin.openDatabase({ name: 'gurps.db', location: 'default' });
        db.transaction(function (tx) {
            tx.executeSql('update tbpericias set data=? where id=?', [JSON.stringify($scope.periciaeditando), $scope.periciaeditando.id]);
        }, function (err) {
            console.log('Transaction ERROR: ' + error.message);
        }, function () {
            console.log('Update na tbpericias OK');
        });
    }

    $scope.criarVantagem = function (vantagemNova) {
        var db = window.sqlitePlugin.openDatabase({ name: 'gurps.db', location: 'default' });

        db.transaction(function (txIn) {

            $ionicLoading.show({
                template: 'Atualizando...'
            });

            try {
                db.executeSql('INSERT INTO tbvantagens(data) VALUES (?)', [JSON.stringify(vantagemNova)],
                function (resultSet) {
                    vantagemNova.id = resultSet.insertId;
                    vantagemNova.tipo = 'vantagem';
                    $scope.listavantagens.unshift(vantagemNova);
                    vibrateAction(100);
                    $ionicLoading.hide();
                });
            } catch (e) {
                $ionicLoading.hide();
                console.log(e);
            }
        });
    }

    $scope.editandoVantagem = function (vantagem) {
        vantagem.custo = parseInt(vantagem.custo);
        $scope.vantagemnovaeditando = vantagem;
        $scope.editandovantagem = true;
    }

    $scope.atualizarVantagem = function () {
        $scope.cancelarEditandoVantagem();
        var db = window.sqlitePlugin.openDatabase({ name: 'gurps.db', location: 'default' });
        db.transaction(function (tx) {
            tx.executeSql('update tbvantagens set data=? where id=?', [JSON.stringify($scope.vantagemnovaeditando), $scope.vantagemnovaeditando.id]);
        }, function (err) {
            console.log('Transaction ERROR: ' + error.message);
        }, function () {
            console.log('Update na vantagemnovaeditando OK');
        });
    }

    $scope.removerVantagem = function (vantagem) {
        vibrateAction(100);
        event.stopPropagation();
        var confirmPopup = $ionicPopup.confirm({
            title: 'Remover Vantagem?',
            template: 'Deseja realmente remover esta vantagem?'
        });

        confirmPopup.then(function (res) {
            if (res) {
                var db = window.sqlitePlugin.openDatabase({ name: 'gurps.db', location: 'default' });
                db.transaction(function (txIn) {
                    txIn.executeSql('delete from tbvantagens where id = ?', [vantagem.id]);
                    $scope.listavantagens.remove({ key: 'nome', value: vantagem.nome });
                    vibrateAction(100);
                    $scope.$digest();
                });
            }
        });
    }

    $scope.cancelarEditandoVantagem = function () {
        $scope.editandovantagem = false;
    }

    $scope.editandoDesvantagem = function (desvantagem) {
        desvantagem.custo = parseInt(desvantagem.custo);
        $scope.desvantagemnovaeditando = desvantagem;
        $scope.editandodesvantagem = true;
    }

    $scope.cancelarEditandodesVantagem = function () {
        $scope.editandodesvantagem = false;
    }

    $scope.atualizardesVantagem = function () {
        $scope.cancelarEditandodesVantagem();
        var db = window.sqlitePlugin.openDatabase({ name: 'gurps.db', location: 'default' });
        db.transaction(function (tx) {
            tx.executeSql('update tbdesvantagens set data=? where id=?', [JSON.stringify($scope.desvantagemnovaeditando), $scope.desvantagemnovaeditando.id]);
        }, function (err) {
            console.log('Transaction ERROR: ' + error.message);
        }, function () {
            console.log('Update na vantagemnovaeditando OK');
        });
    }

    $scope.criardesVantagem = function (desvantagemNova) {
        var db = window.sqlitePlugin.openDatabase({ name: 'gurps.db', location: 'default' });
        db.transaction(function (txIn) {
            $ionicLoading.show({
                template: 'Atualizando...'
            });

            try {
                db.executeSql('INSERT INTO tbdesvantagens(data) VALUES (?)', [JSON.stringify(desvantagemNova)],
                function (resultSet) {
                    desvantagemNova.id = resultSet.insertId;
                    desvantagemNova.tipo = 'desvantagem';
                    $scope.listadesvantagens.unshift(desvantagemNova);
                    vibrateAction(100);
                    $ionicLoading.hide();
                });
            } catch (e) {
                $ionicLoading.hide();
                console.log(e);
            }
        });
    }

    $scope.removerDesvantagem = function (desvantagem) {
        vibrateAction(100);
        var confirmPopup = $ionicPopup.confirm({
            title: 'Remover Desvantagem?',
            template: 'Deseja realmente remover esta desvantagem?'
        });

        confirmPopup.then(function (res) {
            if (res) {
                var db = window.sqlitePlugin.openDatabase({ name: 'gurps.db', location: 'default' });
                db.transaction(function (txIn) {
                    txIn.executeSql('delete from tbdesvantagens where id = ?', [desvantagem.id]);
                    $scope.listadesvantagens.remove({ key: 'nome', value: desvantagem.nome });
                    vibrateAction(100);
                    $scope.$digest();
                });
            }
        });
    }


    $scope.contato = function () {
        window.plugins.socialsharing.shareViaEmail(
          '', // can contain HTML tags, but support on Android is rather limited:  http://stackoverflow.com/questions/15136480/how-to-send-html-content-with-image-through-android-default-email-client 
          'Gmobi',
          ['contato@aldocosta.com.br'], // TO: must be null or an array 
          null,//['cc@person1.com'], // CC: must be null or an array 
          null, // BCC: must be null or an array 
          null,//['https://www.google.nl/images/srpr/logo4w.png','www/localimage.png'], // FILES: can be null, a string, or an array 
          function () { }, // called when sharing worked, but also when the user cancelled sharing via email. On iOS, the callbacks' boolean result parameter is true when sharing worked, false if cancelled. On Android, this parameter is always true so it can't be used). See section "Notes about the successCallback" below. 
          function () { } // called when sh*t hits the fan 
        );
        vibrateAction(100);
    }

    $scope.rolarDados = function (d6times) {
        $scope.d6Result = DiceRoll.DiceRoll.D6.rollD6(d6times);
        vibrateAction(100);
    }

    $scope.shareResult= function(){
        window.plugins.socialsharing.shareViaWhatsApp('Gmobi: Rolagem: ' + $scope.d6Result, 
            null /* img */,
            null /* url */,
            function() {
                console.log('share ok');
            }, 
            function(errormsg){alert(errormsg)});
    }

    $scope.atributosCalc = function(){
        var ret = 0;
        if ($scope.user.atributos.st > 0) {
            ret += ($scope.user.atributos.st - 10) * 10;
        }
        if ($scope.user.atributos.dx > 0) {
            ret += ($scope.user.atributos.dx - 10) * 20;
        }
        if ($scope.user.atributos.iq > 0) {
            ret += ($scope.user.atributos.iq - 10) * 20;
        }
        if ($scope.user.atributos.ht > 0) {
            ret += ($scope.user.atributos.ht - 10) * 10;
        }
        $scope.atributoscustonovaficha = ret;
        $scope.totalprecoficha = ret;
    }    

    $scope.carregandoPericias = function(){
        $ionicLoading.show({
            template: 'Carregando perícias...'
        });
        
        loadPericias(false).then(function (data) {
            vibrateAction(100);
            $ionicLoading.hide();
            $scope.listavantagens = [];
            $scope.listadesvantagens = [];            
        }, function () {
            $ionicLoading.hide();
        });        
    }

    $scope.carregandoVantagens = function(){
        $ionicLoading.show({
            template: 'Carregando vantagens...'
        });
        
        loadVantagens().then(function () {
            vibrateAction(100);
            $scope.listadesvantagens = [];
            $scope.listapericias = [];
            $ionicLoading.hide();
        }).catch(function () {
            $ionicLoading.hide();                
        });        
    }

    $scope.carregandoDesvantagens = function(){
        $ionicLoading.show({
            template: 'Carregando desvantagens...'
        });
        
        loadDesVantagens().then(function () {
            vibrateAction(100);
            $scope.listapericias = [];
            $scope.listavantagens = [];
            $ionicLoading.hide();
        }).catch(function (err) {
            $ionicLoading.hide();            
        });    
    }

    $scope.calcularTotalPontosFicha = function(){
        var sum = 0;
        var pericias = $scope.user.pericias;
        $scope.custototaldaficha = 0;
        if(pericias){
            for (var i = 0; i < pericias.length; i++) {
                if (pericias[i].custo == 'FACIL') {
                    //sum++;
                    sum += 1 + (pericias[i].plus);
                }
                if (pericias[i].custo == 'MEDIO') {
                    //sum = sum + 2;
                    sum += (pericias[i].plus * 2) + 2;
                }
                if (pericias[i].custo == 'DIFICIL') {
                    //sum = sum + 4;
                    sum += (pericias[i].plus * 4) + 4;
                }

                if (pericias[i].custo == 'MUITO DIFICIL') {
                    //sum = sum + 8;
                    sum += (pericias[i].plus * 8) + 8;
                }
            }        
        }

        var vantagens = $scope.user.vantagens;

        if(vantagens){
            for (var i = 0; i < vantagens.length; i++) {
                sum += parseInt(vantagens[i].custo);
            }            
        }

        var desvantagens = $scope.user.desvantagens;

        if(desvantagens){
            for (var i = 0; i < desvantagens.length; i++) {
                sum += parseInt(desvantagens[i].custo);
            }            
        }


        var totalst = 0;

        if($scope.user.atributos.st > 10){
            totalst = ($scope.user.atributos.st - 10) * 10 ;
        }
        
        var totaldx = 0;

        if($scope.user.atributos.dx > 10){
            totaldx = ($scope.user.atributos.dx -10) * 20 ;            
        }
        
        var totaliq = 0;

        if($scope.user.atributos.iq > 10){
            totaliq = ($scope.user.atributos.iq -10) * 20 ;            
        }        
        
        var totalht = 0;

        if($scope.user.atributos.ht > 10){
            totalht = ($scope.user.atributos.ht -10) * 10 ;
        }       

        sum+= totalst + totaldx + totaliq + totalht;


        $scope.custototaldaficha += sum;    
    }


}]);
