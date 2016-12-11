var DataManager = DataManager || {};

DataManager.handle$HttpManager = DataManager.handle$HttpManager || {
    $http: null,
    init$Http: function (http) {
        this.$http = http;
    },
    getOrderedPericias: function () {
        var carga = null;
        var p = new Promise(function (resolve, reject) {
            try {
                DataManager.handle$HttpManager.$http.get('js/data/pericias.json')
                        .then(function (res) {
                            carga = res.data.sortByKey('nome');
                            resolve(carga);
                        });
            } catch (e) {
                reject(e);
            }
        });
        return p;
    },
    getOrderedVantagens: function () {
        var carga = null;
        var p = new Promise(function (resolve, reject) {
            try {
                DataManager.handle$HttpManager.$http.get('js/data/vantagens.json')
                        .then(function (res) {
                            carga = res.data;
                            resolve(carga);
                        });
            } catch (e) {
                reject(e);
            }
        });
        return p;
    },
    getOrderedDesvantagens: function () {
        var carga = null;
        var p = new Promise(function (resolve, reject) {
            try {
                DataManager.handle$HttpManager.$http.get('js/data/desvantanges.json')
                        .then(function (res) {
                            carga = res.data;
                            resolve(carga);
                        });
            } catch (e) {
                reject(e);
            }
        });
        return p;
    }
};


DataManager.handleDbConnection = DataManager.handleDbConnection || {
    $db: null,
    initDb: function (db) {
        this.$db = db;
    },
    handleDesvantagens: function (carga) {
        var p = new Promise(function (resolve, reject) {
            DataManager.handleDbConnection.$db.transaction(function (txIn) {
                txIn.executeSql("select * from tbdesvantagens;", [], function (tx, res) {
                    if (res.rows.length <= 0) {
                        carga.map(function (el) {
                            txIn.executeSql('INSERT INTO tbdesvantagens(data) VALUES (?)', [JSON.stringify(el)]);
                        });
                        resolve(true);
                    }
                    else {
                        resolve(true);
                    }
                });
            });
        });
        return p;
    },
    handlePericiasData: function (carga) {
        var p = new Promise(function (resolve, reject) {
            try {
                DataManager.handleDbConnection.$db.transaction(function (txIn) {
                    txIn.executeSql("select * from tbpericias;", [], function (tx, res) {
                        if (res.rows.length <= 0) {
                            carga.map(function (el) {
                                var parseado = JSON.parse(el.json);
                                txIn.executeSql('INSERT INTO tbpericias(data) VALUES (?)', [el.json]);
                            });
                            resolve(true);
                        }
                        else {
                            resolve(true);
                        }
                    });
                });
            } catch (e) {
                reject(e);
            }
        });
        return p;
    },
    handleVantagemData: function (carga) {
        var p = new Promise(function (resolve, reject) {
            try {
                DataManager.handleDbConnection.$db.transaction(function (txIn) {
                    txIn.executeSql("select * from tbvantagens;", [], function (tx, res) {
                        if (res.rows.length <= 0) {
                            carga.map(function (el) {
                                txIn.executeSql('INSERT INTO tbvantagens(data) VALUES (?)', [JSON.stringify(el)]);
                            });
                            resolve('tbvantagens ok');
                        }
                    });
                });
            } catch (e) {
                reject(e);
            }
        });
        return p;
    }
}