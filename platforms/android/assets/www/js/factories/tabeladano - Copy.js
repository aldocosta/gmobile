ang.factory('TabelaDano', [function () {
    return {
        returnTabela: function () {
            var t = {
                "valuegpd": 6,
                "valueged": 5,
                "dice": "1d",
                "tabeladano": {
                    "st": [
                      1,
                      2
                    ],
                    "gdp": "",
                    "geb": "",
                    "index": 0
                },
                getTabelaDanoPorSt: function (st) {
                    switch (st) {
                        case 1:
                            t.tabeladano.gdp = "1d-6";
                            t.tabeladano.geb = "1d-5";
                            break;
                        case 2:
                            t.tabeladano.gdp = "1d-6";
                            t.tabeladano.geb = "1d-5";
                            break;
                        case 3:
                            t.tabeladano.gdp = "1d-5";
                            t.tabeladano.geb = "1d-4";
                            break;
                        case 4:
                            t.tabeladano.gdp = "1d-5";
                            t.tabeladano.geb = "1d-4";
                            break;
                        case 5:
                            t.tabeladano.gdp = "1d-4";
                            t.tabeladano.geb = "1d-3";
                            break;
                        case 6:
                            t.tabeladano.gdp = "1d-4";
                            t.tabeladano.geb = "1d-3";
                            break;
                        case 7:
                            t.tabeladano.gdp = "1d-3";
                            t.tabeladano.geb = "1d-2";
                            break;
                        case 8:
                            t.tabeladano.gdp = "1d-3";
                            t.tabeladano.geb = "1d-2";
                            break;
                        case 9:
                            t.tabeladano.gdp = "1d-2";
                            t.tabeladano.geb = "1d-1";
                            break;
                        case 10:
                            t.tabeladano.gdp = "1d-2";
                            t.tabeladano.geb = "1d";
                            break;
                        case 11:
                            t.tabeladano.gdp = "1d-1";
                            t.tabeladano.geb = "1d+1";
                            break;
                        case 12:
                            t.tabeladano.gdp = "1d-1";
                            t.tabeladano.geb = "1d+2";
                            break;
                        case 13:
                            var key = 6;
                            t.tabeladano.gdp = "1d";
                            t.tabeladano.geb = "2d-1";
                            break;
                        case 14:
                            t.tabeladano.gdp = "1d";
                            t.tabeladano.geb = "2d";
                            break;
                        case 15:
                            t.tabeladano.gdp = "1d+1";
                            t.tabeladano.geb = "2d+1";
                            break;
                        case 16:
                            t.tabeladano.gdp = "1d+1";
                            t.tabeladano.geb = "2d+2";
                            break;
                        case 17:
                            t.tabeladano.gdp = "1d+2";
                            t.tabeladano.geb = "3d-1";
                            break;
                        case 18:
                            t.tabeladano.gdp = "1d+2";
                            t.tabeladano.geb = "3d";
                            break;
                        case 19:
                            t.tabeladano.gdp = "2d-1";
                            t.tabeladano.geb = "3d+1";
                            break;
                        case 20:
                            t.tabeladano.gdp = "2d-1";
                            t.tabeladano.geb = "3d+2";
                            break;
                        case 21:
                            t.tabeladano.gdp = "2d";
                            t.tabeladano.geb = "4d-1";
                            break;
                        case 22:
                            t.tabeladano.gdp = "2d";
                            t.tabeladano.geb = "4d";
                            break;
                        case 23:
                            t.tabeladano.gdp = "2d+1";
                            t.tabeladano.geb = "4d+1";
                            break;
                        case 24:
                            t.tabeladano.gdp = "2d+1";
                            t.tabeladano.geb = "4d+2";
                            break;
                        case 25:
                            t.tabeladano.gdp = "2d+2";
                            t.tabeladano.geb = "5d-1";
                            break;
                        case 26:
                            t.tabeladano.gdp = "2d+2";
                            t.tabeladano.geb = "5d";
                            break;
                        case 27:
                            t.tabeladano.gdp = "3d-1";
                            t.tabeladano.geb = "5d+1";
                            break;
                        case 28:
                            t.tabeladano.gdp = "3d-1";
                            t.tabeladano.geb = "5d+1";
                            break;
                        case 29:
                            t.tabeladano.gdp = "3d";
                            t.tabeladano.geb = "5d+2";
                            break;
                        case 30:
                            t.tabeladano.gdp = "3d";
                            t.tabeladano.geb = "5d+2";
                            break;
                        case 31:
                            t.tabeladano.gdp = "3d+1";
                            t.tabeladano.geb = "6d-1";
                            break;
                        case 32:
                            t.tabeladano.gdp = "3d+1";
                            t.tabeladano.geb = "6d-1";
                            break;
                        case 33:
                            t.tabeladano.gdp = "3d+2";
                            t.tabeladano.geb = "6d";
                            break;
                        case 34:
                            t.tabeladano.gdp = "3d+2";
                            t.tabeladano.geb = "6d";
                            break;
                        case 35:
                            t.tabeladano.gdp = "4d-1";
                            t.tabeladano.geb = "6d+1";
                            break;
                        case 36:
                            t.tabeladano.gdp = "4d-1";
                            t.tabeladano.geb = "6d+1";
                            break;
                        case 37:
                            t.tabeladano.gdp = "4d";
                            t.tabeladano.geb = "6d+2";
                            break;
                        case 38:
                            t.tabeladano.gdp = "4d";
                            t.tabeladano.geb = "6d+2";
                            break;
                        case 39:
                            t.tabeladano.gdp = "4d+1";
                            t.tabeladano.geb = "7d-1";
                            break;
                        case 40:
                            t.tabeladano.gdp = "4d+1";
                            t.tabeladano.geb = "7d-1";
                            break;
                        case 41:
                            t.tabeladano.gdp = "4d+1";
                            t.tabeladano.geb = "7d-1";
                            break;
                        case 42:
                            t.tabeladano.gdp = "4d+1";
                            t.tabeladano.geb = "7d-1";
                            break;
                        case 43:
                            t.tabeladano.gdp = "4d+1";
                            t.tabeladano.geb = "7d-1";
                            break;
                        case 44:
                            t.tabeladano.gdp = "4d+1";
                            t.tabeladano.geb = "7d-1";
                            break;
                        case 45:
                            t.tabeladano.gdp = "5d";
                            t.tabeladano.geb = "7d+1";
                            break;
                        case 46:
                            t.tabeladano.gdp = "5d";
                            t.tabeladano.geb = "7d+1";
                            break;
                        case 47:
                            t.tabeladano.gdp = "5d";
                            t.tabeladano.geb = "7d+1";
                            break;
                        case 48:
                            t.tabeladano.gdp = "5d";
                            t.tabeladano.geb = "7d+1";
                            break;
                        case 49:
                            t.tabeladano.gdp = "5d";
                            t.tabeladano.geb = "7d+1";
                            break;
                        case 50:
                            t.tabeladano.gdp = "5d+2";
                            t.tabeladano.geb = "8d-1";
                            break;
                        case 51:
                            t.tabeladano.gdp = "5d+2";
                            t.tabeladano.geb = "8d-1";
                            break;
                        case 52:
                            t.tabeladano.gdp = "5d+2";
                            t.tabeladano.geb = "8d-1";
                            break;
                        case 53:
                            t.tabeladano.gdp = "5d+2";
                            t.tabeladano.geb = "8d-1";
                            break;
                        case 54:
                            t.tabeladano.gdp = "5d+2";
                            t.tabeladano.geb = "8d-1";
                            break;
                        case 55:
                            t.tabeladano.gdp = "6d";
                            t.tabeladano.geb = "8d+1";
                            break;
                        case 56:
                            t.tabeladano.gdp = "6d";
                            t.tabeladano.geb = "8d+1";
                            break;
                        case 57:
                            t.tabeladano.gdp = "6d";
                            t.tabeladano.geb = "8d+1";
                            break;
                        case 58:
                            t.tabeladano.gdp = "6d";
                            t.tabeladano.geb = "8d+1";
                            break;
                        case 59:
                            t.tabeladano.gdp = "6d";
                            t.tabeladano.geb = "8d+1";
                            break;
                        case 60:
                            t.tabeladano.gdp = "7d-1"
                            t.tabeladano.geb = "9d";
                            break;
                        case 61:
                            t.tabeladano.gdp = "7d-1"
                            t.tabeladano.geb = "9d";
                            break;
                        case 62:
                            t.tabeladano.gdp = "7d-1"
                            t.tabeladano.geb = "9d";
                            break;
                        case 63:
                            t.tabeladano.gdp = "7d-1"
                            t.tabeladano.geb = "9d";
                            break;
                        case 64:
                            t.tabeladano.gdp = "7d-1"
                            t.tabeladano.geb = "9d";
                            break;
                        case 65:
                            t.tabeladano.gdp = "7d+1"
                            t.tabeladano.geb = "9d+2";
                            break;
                        case 66:
                            t.tabeladano.gdp = "7d+1"
                            t.tabeladano.geb = "9d+2";
                            break;
                        case 67:
                            t.tabeladano.gdp = "7d+1"
                            t.tabeladano.geb = "9d+2";
                            break;
                        case 68:
                            t.tabeladano.gdp = "7d+1"
                            t.tabeladano.geb = "9d+2";
                            break;
                        case 69:
                            t.tabeladano.gdp = "7d+1"
                            t.tabeladano.geb = "9d+2";
                            break;
                        case 70:
                            t.tabeladano.gdp = "8d"
                            t.tabeladano.geb = "10d";
                            break;
                        case 71:
                            t.tabeladano.gdp = "8d"
                            t.tabeladano.geb = "10d";
                            break;
                        case 72:
                            t.tabeladano.gdp = "8d"
                            t.tabeladano.geb = "10d";
                            break;
                        case 73:
                            t.tabeladano.gdp = "8d"
                            t.tabeladano.geb = "10d";
                            break;
                        case 74:
                            t.tabeladano.gdp = "8d"
                            t.tabeladano.geb = "10d";
                            break;
                        case 75:
                            t.tabeladano.gdp = "8d+2"
                            t.tabeladano.geb = "10d+2";
                            break;
                        case 76:
                            t.tabeladano.gdp = "8d+2"
                            t.tabeladano.geb = "10d+2";
                            break;
                        case 77:
                            t.tabeladano.gdp = "8d+2"
                            t.tabeladano.geb = "10d+2";
                            break;
                        case 78:
                            t.tabeladano.gdp = "8d+2"
                            t.tabeladano.geb = "10d+2";
                            break;
                        case 79:
                            t.tabeladano.gdp = "8d+2"
                            t.tabeladano.geb = "10d+2";
                            break;
                        case 80:
                            t.tabeladano.gdp = "9d"
                            t.tabeladano.geb = "11d";
                            break;
                        case 81:
                            t.tabeladano.gdp = "9d"
                            t.tabeladano.geb = "11d";
                            break;
                        case 82:
                            t.tabeladano.gdp = "9d"
                            t.tabeladano.geb = "11d";
                            break;
                        case 83:
                            t.tabeladano.gdp = "9d"
                            t.tabeladano.geb = "11d";
                            break;
                        case 84:
                            t.tabeladano.gdp = "9d"
                            t.tabeladano.geb = "11d";
                            break;
                        case 85:
                            t.tabeladano.gdp = "9d+2"
                            t.tabeladano.geb = "11d+2";
                            break;
                        case 86:
                            t.tabeladano.gdp = "9d+2"
                            t.tabeladano.geb = "11d+2";
                            break;
                        case 87:
                            t.tabeladano.gdp = "9d+2"
                            t.tabeladano.geb = "11d+2";
                            break;
                        case 88:
                            t.tabeladano.gdp = "9d+2"
                            t.tabeladano.geb = "11d+2";
                            break;
                        case 89:
                            t.tabeladano.gdp = "9d+2"
                            t.tabeladano.geb = "11d+2";
                            break;
                        case 90:
                            t.tabeladano.gdp = "10d"
                            t.tabeladano.geb = "12d";
                            break;
                        case 91:
                            t.tabeladano.gdp = "10d"
                            t.tabeladano.geb = "12d";
                            break;
                        case 92:
                            t.tabeladano.gdp = "10d"
                            t.tabeladano.geb = "12d";
                            break;
                        case 93:
                            t.tabeladano.gdp = "10d"
                            t.tabeladano.geb = "12d";
                            break;
                        case 94:
                            t.tabeladano.gdp = "10d"
                            t.tabeladano.geb = "12d";
                            break;
                        case 95:
                            t.tabeladano.gdp = "10d+2"
                            t.tabeladano.geb = "12d+2";
                            break;
                        case 96:
                            t.tabeladano.gdp = "10d+2"
                            t.tabeladano.geb = "12d+2";
                            break;
                        case 97:
                            t.tabeladano.gdp = "10d+2"
                            t.tabeladano.geb = "12d+2";
                            break;
                        case 98:
                            t.tabeladano.gdp = "10d+2"
                            t.tabeladano.geb = "12d+2";
                            break;
                        case 99:
                            t.tabeladano.gdp = "10d+2"
                            t.tabeladano.geb = "12d+2";
                            break;
                        case 100:
                            t.tabeladano.gdp = "11d"
                            t.tabeladano.geb = "13d";
                            break;
                        default:
                            throw "Erro ao escolher GDP E BALANÇO";
                    }

                    return t.tabeladano;
                }
            }

            return t;
        }
    }
}]);