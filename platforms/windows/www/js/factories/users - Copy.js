"use strict";
ang.factory('Users', ['TabelaDano', 'Plugins',
    function (TabelaDano, Plugins) {
        return {
            returnUsers: function () {
                var users = [];
                try {
                    var promise = new Promise(function (resolve, reject) {
                        document.addEventListener('deviceready', function () {
                            Plugins.Sql.Init().then(function (db) {
                                db.transaction(function (tx) {
                                    tx.executeSql("select id,data from tbpersonagens;", [], function (tx, res) {
                                        for (var i = 0; i < res.rows.length; i++) {
                                            var user = JSON.parse(res.rows.item(i).data);
                                            var id = res.rows.item(i).id;
                                            user.id = id;

                                            var ex = {
                                                getVelBas: function () {
                                                    return (this.atributos.ht + this.atributos.dx) / 4;
                                                },
                                                getDesBas: function () {
                                                    return Math.round((this.atributos.ht + this.atributos.dx) / 4);
                                                },
                                                getGdp: function () {
                                                    return TabelaDano.returnTabela().getTabelaDanoPorSt(this.atributos.st).gdp;
                                                },
                                                getGeb: function () {
                                                    return TabelaDano.returnTabela().getTabelaDanoPorSt(this.atributos.st).geb;
                                                },
                                                getEsquiva: function () {
                                                    return (Math.round(this.atributos.ht + this.atributos.dx) / 4) + 3;
                                                },
                                                /*
                                                    CALCULA BASE DE CARGA, DESCOLAMENTO E ESQUIVA DE ACORDO COM OS LEVEIS
                                                    NENHUMA(0),LEVE(1),MEDIA(2),PESADA(3),MUITO PESADA(4)
                                                */
                                                getNenhuma: function () {
                                                    return {
                                                        bc: Math.floor((this.atributos.st * this.atributos.st) / 10),
                                                        db: Math.floor((this.atributos.ht + this.atributos.dx) / 4),
                                                        es: (Math.floor((this.atributos.ht + this.atributos.dx) / 4) + 3)
                                                    }
                                                },
                                                getLeve: function () {
                                                    return {
                                                        bc: Math.floor((this.atributos.st * this.atributos.st) / 10) * 2,
                                                        db: Math.floor(((this.atributos.ht + this.atributos.dx) / 4) * 0.8),
                                                        es: (Math.floor((this.atributos.ht + this.atributos.dx) / 4) + 3) - 1
                                                    }
                                                },
                                                getMedia: function () {
                                                    return {
                                                        bc: Math.floor((this.atributos.st * this.atributos.st) / 10) * 3,
                                                        db: Math.floor(((this.atributos.ht + this.atributos.dx) / 4) * 0.6),
                                                        es: (Math.floor((this.atributos.ht + this.atributos.dx) / 4) + 3) - 2
                                                    }
                                                },
                                                getPesada: function () {
                                                    return {
                                                        bc: Math.floor((this.atributos.st * this.atributos.st) / 10) * 6,
                                                        db: Math.floor(((this.atributos.ht + this.atributos.dx) / 4) * 0.4),
                                                        es: (Math.floor((this.atributos.ht + this.atributos.dx) / 4) + 3) - 3
                                                    }
                                                },
                                                getMuitoPesada: function () {
                                                    return {
                                                        bc: Math.floor((this.atributos.st * this.atributos.st) / 10) * 10,
                                                        db: Math.floor(((this.atributos.ht + this.atributos.dx) / 4) * 0.2),
                                                        es: (Math.floor((this.atributos.ht + this.atributos.dx) / 4) + 3) - 4
                                                    }
                                                },
                                                //Pega o preço original da ficha quando foi criada
                                                getPrecoFicha: function () {
                                                    var stpreco = 0;
                                                    var dxpreco = 0;
                                                    var iqpreco = 0;
                                                    var htpreco = 0;


                                                    if (this.__atributos.st > 0) {
                                                        stpreco = (this.__atributos.st - 10) * 10;
                                                    }
                                                    if (this.__atributos.dx > 0) {
                                                        dxpreco = (this.__atributos.dx - 10) * 20;
                                                    }
                                                    if (this.__atributos.iq > 0) {
                                                        iqpreco = (this.__atributos.iq - 10) * 20;
                                                    }
                                                    if (this.__atributos.ht > 0) {
                                                        htpreco = (this.__atributos.ht - 10) * 10;
                                                    }
                                                    return parseInt(stpreco) + parseInt(dxpreco) + parseInt(iqpreco) + parseInt(htpreco);
                                                },
                                                getPrecoFichaReal: function () {
                                                    var total = this.getPrecoFicha() + this.getCustoPericias() + this.getCustoVantagens() + this.getCustoDesVantagens()
                                                    var totalpv = ((this.atributos.pv - this.__atributos.pv ) * 2);
                                                    var totalpf = ((this.atributos.pf - this.__atributos.pf ) * 3);
                                                    var totalper = ((this.atributos.per - this.__atributos.per ) * 5);
                                                    var totalvon = ((this.atributos.von - this.__atributos.von ) * 5);
                                                    var totalst = (this.atributos.st - this.__atributos.st) * 10 ;
                                                    var totaldx = (this.atributos.dx - this.__atributos.dx) * 20 ;
                                                    var totaliq = (this.atributos.iq - this.__atributos.iq) * 20 ;
                                                    var totalht = (this.atributos.ht - this.__atributos.ht) * 10 ;
                                                    

                                                    total += (totalpv + totalpf + totalper + totalvon 
                                                        + totalst + totaldx + totaliq + totalht);

                                                    return total;
                                                },
                                                getCustoPericias: function () {
                                                    var sum = 0;
                                                    for (var i = 0; i < this.pericias.length; i++) {
                                                        if (this.pericias[i].custo == 'FACIL') {
                                                            //sum++;
                                                            sum += 1 + (this.pericias[i].plus);
                                                        }
                                                        if (this.pericias[i].custo == 'MEDIO') {
                                                            //sum = sum + 2;
                                                            sum += (this.pericias[i].plus * 2) + 2;
                                                        }
                                                        if (this.pericias[i].custo == 'DIFICIL') {
                                                            //sum = sum + 4;
                                                            sum += (this.pericias[i].plus * 4) + 4;
                                                        }

                                                        if (this.pericias[i].custo == 'MUITO DIFICIL') {
                                                            //sum = sum + 8;
                                                            sum += (this.pericias[i].plus * 8) + 8;
                                                        }
                                                    }
                                                    return parseInt(sum);
                                                },
                                                getCustoVantagens: function () {
                                                    var sum = 0;
                                                    for (var i = 0; i < this.vantagens.length; i++) {
                                                        sum += parseInt(this.vantagens[i].custo);
                                                    }
                                                    return parseInt(sum);
                                                },
                                                getCustoDesVantagens: function () {
                                                    var sum = 0;
                                                    for (var i = 0; i < this.desvantagens.length; i++) {
                                                        sum += parseInt(this.desvantagens[i].custo);
                                                    }
                                                    return parseInt(sum);
                                                },
                                                getVantagemValor: function (vantagem) {
                                                    return parseInt(vantagem.custo);
                                                },
                                                getdesvantagemValor: function (desvantagem) {
                                                    return parseInt(desvantagem.custo);
                                                },
                                                getPericiaValor: function (pericia) {
                                                    var ret = '';
                                                    if (pericia.nh == 'DX') {
                                                        ret = this.atributos.dx;
                                                    }

                                                    if (pericia.nh == 'VON') {
                                                        ret = this.atributos.von;
                                                    }

                                                    if (pericia.nh == 'IQ') {
                                                        ret = this.atributos.iq;
                                                    }

                                                    if (pericia.nh == 'PER') {
                                                        ret = this.atributos.per;
                                                    }

                                                    if (pericia.nh == 'HT') {
                                                        ret = this.atributos.ht;
                                                    }

                                                    if (pericia.nh == 'PF') {
                                                        ret = this.atributos.pf;
                                                    }

                                                    if (pericia.nh == 'PV') {
                                                        ret = this.atributos.pv;
                                                    }

                                                    if (pericia.nh == 'ST') {
                                                        ret = this.atributos.st;
                                                    }
                                                    return parseInt(ret);
                                                }
                                            }
                                            angular.extend(user, ex);
                                            users.push(user);
                                        }
                                        if (users.length > 0) {
                                            resolve(users);
                                        } else {
                                            reject([]);
                                        }

                                    });
                                });
                            });
                        });
                    });

                    return promise;
                } catch (e) {
                    throw e;
                }
            },
            getUser: function () {
                return {
                    "id": "",
                    "nome": "",
                    "jogador": "",
                    "mote": "",
                    "background": "",
                    "img": "",
                    "atributos": {
                        "st": "",
                        "dx": "",
                        "iq": "",
                        "ht": "",
                        "pv": "",
                        "per": "",
                        "von": "",
                        "fad": ""
                    },
                    "__atributos": {
                        "st": "",
                        "dx": "",
                        "iq": "",
                        "ht": "",
                        "pv": "",
                        "per": "",
                        "von": "",
                        "fad": ""
                    },
                    "pericias": [
                    ],
                    "vantagens": [
                    ],
                    "desvantagens": [
                    ],
                    "equipamentos": [
                    ],
                    getVelBas: function () {
                        return '';
                    },
                    getDesBas: function () {
                        return '';
                    },
                    getGdp: function () {
                        return '';
                    },
                    getGeb: function () {
                        return '';
                    },
                    getEsquiva: function () {
                        return '';
                    }
                }
            },
            returnUserToSave: function (user) {
                var fixAtributo = function (attr) {
                    var ret = 0;

                    if (attr > 100) {
                        ret = 100;
                    }
                    else if (attr < 1) {
                        ret = 1;
                    } else {
                        ret = attr;
                    }

                    return ret;
                }

                var fixTexts = function (text, limite) {
                    var ret = '';
                    if (text.length > limite) {
                        ret = text.substr(0, limite);
                    } else {
                        ret = text;
                    }
                    return ret;
                }

                user.atributos.st = fixAtributo(user.atributos.st);
                user.atributos.dx = fixAtributo(user.atributos.dx);
                user.atributos.iq = fixAtributo(user.atributos.iq);
                user.atributos.ht = fixAtributo(user.atributos.ht);
                user.mote = fixTexts(user.mote, 100);
                user.background = fixTexts(user.background, 21);

                return JSON.stringify(user);
            }
        }
    }]);