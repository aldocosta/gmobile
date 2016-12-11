"use strict";
ang.factory('DiceRoll', [function () {
    return {
        DiceRoll: {
            D6: {
                rollD6: function (time) {
                    var ret = '';
                    var count = 0;
                    var temp = 0;
                    for (var i = 0; i < time; i++) {
                        temp = Math.floor((Math.random() * 6) + 1);
                        ret += temp + ' - ';
                        count += temp;
                    }
                    ret = ret.substring(0, ret.length - 1);
                    return ret + " ( total: " + count + " ) ";
                }
            },
            D4: {
                rollD4: function (time) {
                    var ret = '';
                    var count = 0;
                    var temp = 0;
                    for (var i = 0; i < time; i++) {
                        temp = Math.floor((Math.random() * 4) + 1);
                        ret += temp + ' - ';
                        count += temp;
                    }
                    ret = ret.substring(0, ret.length - 1);
                    return ret + " ( total: " + count + " ) ";
                }
            },
            D10: {
                rollD10: function (time) {
                    var ret = '';
                    var count = 0;
                    var temp = 0;
                    for (var i = 0; i < time; i++) {
                        temp = Math.floor((Math.random() * 10) + 1);
                        ret += temp + ' - ';
                        count += temp;
                    }
                    ret = ret.substring(0, ret.length - 1);
                    return ret + " ( total: " + count + " ) ";
                }
            }
        }
    }
}]);