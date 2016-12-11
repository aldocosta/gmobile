"use strict";
ang.factory('Config', ['Plugins', function (Plugins) {
    return {
        Config: function () {
            var configPromise = new Promise(function (s, r) {
                function populateConfig() {
                    var promise = new Promise(function (resolve, reject) {
                        try {
                            document.addEventListener('deviceready', function () {
                                Plugins.Sql.Init().then(function (db) {
                                    db.transaction(function (tx) {
                                        tx.executeSql("select data from tbconfig where id=1;", [], function (tx, res) {
                                            if (res.rows.length > 0) {
                                                for (var i = 0; i < res.rows.length; i++) {
                                                    var _data = JSON.parse(res.rows.item(i).data);
                                                    resolve(_data);
                                                }
                                            } else {
                                                resolve({
                                                    camera_galeria: false,
                                                    vibrate: true,
                                                    simetria: true,
                                                    firstRun: true
                                                });
                                                console.log('Retornando as configurações.')
                                            }

                                        });
                                    });
                                });
                            });
                        } catch (e) {
                            reject(e);
                        }
                    });
                    return promise;
                }
                populateConfig().then(function (data) {
                    s(data);
                }, function (err) {
                    console.log(err);
                    r(err);
                });
            });

            return configPromise;
        },
        SetConfig: function (config) {
            var promise = new Promise(function (resolve, reject) {
                document.addEventListener('deviceready', function () {
                    Plugins.Sql.Init().then(function (db) {
                        db.transaction(function (tx) {
                            tx.executeSql('update tbconfig set data =? where id=?', [config, 1]);
                        }, function (error) {
                            console.log('Transaction ERROR: ' + error.message);
                        }, function () {
                            console.log('Update na tbconfig OK');
                        });
                    });
                });
            });
        },
        getTabelaElementos: function () {
            return new Promise(function (resolve, reject) {
                Plugins.Sql.Init().then(function (db) {
                    db.transaction(function (tx) {
                        try {
                            tx.executeSql("select * from tbpericias;", [], function (tx, res) {
                                if (res.rows.length > 0) {
                                    var arr = [];
                                    for (var i = 0; i < res.rows.length; i++) {
                                        var _data = JSON.parse(res.rows.item(i).data);
                                        arr.push(_data);
                                    }
                                    if (arr.length > 0) {
                                        resolve(arr);
                                    } else {
                                        reject(null);
                                    }
                                } else {
                                    reject(null);
                                }
                            });
                        } catch (e) {
                            reject(e.message);
                        }
                    });
                });
            });
        },
        windowConfig: {
            screenResolution: {
                w: Math.floor(window.innerWidth),
                h: Math.floor(window.innerHeight),
                getIdealw: function () {
                    var perc = (this.w / 100) * 95;
                    return Math.floor(perc);
                },
                getIdealh: function () {
                    var perc = (this.h / 100) * 70;
                    return Math.floor(perc);
                },
                getIdealUsersListHeight: function () {
                    var perc = (this.h / 100) * 66;
                    return Math.floor(perc);
                }
            }
        },
        Util: {
            getLabelQualityFoto: function (valor) {
                var retorno = '';
                if (valor <= 10) {
                    retorno = 'Baixa qualidade ( Carrega rápido )';
                } else if (valor > 10 && valor <= 50) {
                    retorno = 'Qualidade ideal ( Carrega normal )';
                } else if (valor > 50 && valor <= 80) {
                    retorno = 'Qualidade Alta ( Carrega um pouco lento )';
                } else {
                    retorno = 'Qualidade Máxima ( Carrega lento )';
                }

                return retorno;
            }
        }
    }

}]);