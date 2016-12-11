ang.factory('CrudPlugin', [function () {
    var DataBase = {
        Crud: {
            CrudPLugin: {
                Init: function () {
                    return new Promise(function (resolve, reject) {
                        var db = null;
                        document.addEventListener('deviceready', function () {
                            try {
                                db = window.sqlitePlugin.openDatabase({ name: 'gurps.db', location: 'default' });
                                if (db) {
                                    resolve(db);
                                } else {
                                    reject({ erro: 'Sqllite não instanciado' })
                                }
                            } catch (e) {
                                reject(e.message);
                            }
                        });
                    });
                }
            },
            ExecuteQueryConsulta: function (config) {
                var p = new Promise(function (r, f) {
                    var arr = [];
                    DataBase.Crud.CrudPLugin.Init().then(function (db) {
                        db.transaction(function (txIn) {
                            txIn.executeSql(config.query, config.args, function (txIn, res) {
                                if (res.rows.length > 0) {
                                    try {
                                        for (var i = 0; i < res.rows.length; i++) {
                                            var obj = JSON.parse(res.rows.item(i).data);
                                            obj.id = res.rows.item(i).id;
                                            arr.push(obj);
                                        }
                                    } catch (e) {
                                        f(e);
                                    }
                                    r(arr);
                                }
                                else {
                                      r([]);
                                }
                            });
                        });
                    });
                });
                return p;
            }            
        }
    }
    return DataBase;
}]);