ang.factory('Plugins', ['$http', function ($http) {
    var obj = {
        Camera: {
            getPicture: function (obj) {
                var p1 = new Promise(function (resolve, reject) {
                    navigator.camera.getPicture(function sucess(imgUrl) {
                        resolve(imgUrl);
                    }, function (e) {
                        reject(e + ': Erro');
                    }, {
                        quality: obj.quality,
                        encodingType: Camera.EncodingType.JPEG,
                        destinationType: Camera.DestinationType.DATA_URL,
                        sourceType: obj.sourceType
                    });
                });

                return p1;
            }
        },
        Sql: {
            /*COMEÇA INICIANDO A BASE DE DADOS*/
            InitCharge: function () {
                var p = new Promise(function (r, f) {
                    var db = null;
                    try {
                        document.addEventListener('deviceready', function () {
                            db = window.sqlitePlugin.openDatabase({ name: 'gurps.db', location: 'default' });
                            db.transaction(function (tx) {
                                tx.executeSql('CREATE TABLE IF NOT EXISTS tbpersonagens (id integer primary key, data text)');

                                tx.executeSql('CREATE TABLE IF NOT EXISTS tbconfig (id integer primary key, data text)');

                                tx.executeSql("select * from tbconfig where id=1;", [], function (tx, res) {
                                    if (res.rows.length <= 0) {
                                        var obj = JSON.stringify({ camera_galeria: false, vibrate: true ,simetria : true, firstRun : true});
                                        tx.executeSql('INSERT INTO tbconfig(data) VALUES (?)', [obj]);
                                        console.log('Insert na tbconfig OK');
                                    }
                                });

                                tx.executeSql('CREATE TABLE IF NOT EXISTS tbpericias (id integer primary key, data text)');
                                tx.executeSql('CREATE TABLE IF NOT EXISTS tbvantagens (id integer primary key, data text)');
                                tx.executeSql('CREATE TABLE IF NOT EXISTS tbdesvantagens (id integer primary key, data text)');

                                DataManager.handle$HttpManager.init$Http($http);
                                DataManager.handleDbConnection.initDb(db);

                                DataManager.handle$HttpManager.getOrderedPericias().then(function (data) {
                                    return DataManager.handleDbConnection.handlePericiasData(data);
                                }).then(function (d) {
                                    return DataManager.handle$HttpManager.getOrderedVantagens();
                                }).then(function (d) {
                                    return DataManager.handleDbConnection.handleVantagemData(d);
                                }).then(function (d) {
                                    return DataManager.handle$HttpManager.getOrderedDesvantagens();
                                }).then(function (d) {
                                    return DataManager.handleDbConnection.handleDesvantagens(d);
                                }).then(function (d) {
                                    console.log(d);
                                });



                            });
                            r(db);
                        });
                    } catch (e) {
                        f(null);
                    }

                });
                return p;

            },
            Init: function () {
                return new Promise(function (r, f) {
                    document.addEventListener('deviceready', function () {
                        var db = window.sqlitePlugin.openDatabase({ name: 'gurps.db', location: 'default' });
                        r(db);
                    });
                });
            },
            executeQuery: function (val) {
                var db = window.sqlitePlugin.openDatabase({ name: 'gurps.db', location: 'default' });
                db.transaction(function (tx) {
                    tx.executeSql('INSERT INTO tbpersonagens(data) VALUES (?)', [val]);
                }, function (error) {
                    console.log('Transaction ERROR: ' + error.message);
                }, function () {
                    console.log('Insert na tbpersonagem OK');
                });
            },
            executeQueryUpdate: function (val, id) {
                var db = window.sqlitePlugin.openDatabase({ name: 'gurps.db', location: 'default' });
                db.transaction(function (tx) {
                    tx.executeSql('update tbpersonagens set data =? where id=?', [val, id]);
                }, function (error) {
                    console.log('Transaction ERROR: ' + error.message);
                }, function () {
                    console.log('Update na tbpersonagem OK');
                });
            },
            executeQueryExcluir: function (id) {
                var db = window.sqlitePlugin.openDatabase({ name: 'gurps.db', location: 'default' });
                db.transaction(function (tx) {
                    tx.executeSql('delete from tbpersonagens where id=?', [id]);
                }, function (error) {
                    console.log('Transaction ERROR: ' + error.message);
                }, function () {
                    console.log('Delete na tbpersonagem OK');
                });
            },
            resetGeral: function () {
                var p = new Promise(function (resolve, reject) {
                    var db = window.sqlitePlugin.openDatabase({ name: 'gurps.db', location: 'default' });
                    db.transaction(function (tx) {
                        tx.executeSql('delete from tbpersonagens', []);
                        tx.executeSql('delete from tbpersonagens', []);
                        tx.executeSql('delete from tbpericias', []);
                        tx.executeSql('delete from tbvantagens', []);
                        tx.executeSql('delete from tbdesvantagens', []);
                        obj.Sql.InitCharge();
                        resolve(true);
                    }, function (error) {
                        console.log('Transaction ERROR: ' + error.message);
                        reject(false);
                    }, function () {
                        console.log('Delete na tbpersonagem OK');
                    });
                });
                return p
            }
        }
    }
    return obj;
}]);