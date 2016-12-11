﻿ang.factory("TabelaDano", [function () { return { returnTabela: function () { var a = { valuegpd: 6, valueged: 5, dice: "1d", tabeladano: { st: [1, 2], gdp: "", geb: "", index: 0 }, getTabelaDanoPorSt: function (b) { switch (b) { case 1: a.tabeladano.gdp = "1d-6", a.tabeladano.geb = "1d-5"; break; case 2: a.tabeladano.gdp = "1d-6", a.tabeladano.geb = "1d-5"; break; case 3: a.tabeladano.gdp = "1d-5", a.tabeladano.geb = "1d-4"; break; case 4: a.tabeladano.gdp = "1d-5", a.tabeladano.geb = "1d-4"; break; case 5: a.tabeladano.gdp = "1d-4", a.tabeladano.geb = "1d-3"; break; case 6: a.tabeladano.gdp = "1d-4", a.tabeladano.geb = "1d-3"; break; case 7: a.tabeladano.gdp = "1d-3", a.tabeladano.geb = "1d-2"; break; case 8: a.tabeladano.gdp = "1d-3", a.tabeladano.geb = "1d-2"; break; case 9: a.tabeladano.gdp = "1d-2", a.tabeladano.geb = "1d-1"; break; case 10: a.tabeladano.gdp = "1d-2", a.tabeladano.geb = "1d"; break; case 11: a.tabeladano.gdp = "1d-1", a.tabeladano.geb = "1d+1"; break; case 12: a.tabeladano.gdp = "1d-1", a.tabeladano.geb = "1d+2"; break; case 13:; a.tabeladano.gdp = "1d", a.tabeladano.geb = "2d-1"; break; case 14: a.tabeladano.gdp = "1d", a.tabeladano.geb = "2d"; break; case 15: a.tabeladano.gdp = "1d+1", a.tabeladano.geb = "2d+1"; break; case 16: a.tabeladano.gdp = "1d+1", a.tabeladano.geb = "2d+2"; break; case 17: a.tabeladano.gdp = "1d+2", a.tabeladano.geb = "3d-1"; break; case 18: a.tabeladano.gdp = "1d+2", a.tabeladano.geb = "3d"; break; case 19: a.tabeladano.gdp = "2d-1", a.tabeladano.geb = "3d+1"; break; case 20: a.tabeladano.gdp = "2d-1", a.tabeladano.geb = "3d+2"; break; case 21: a.tabeladano.gdp = "2d", a.tabeladano.geb = "4d-1"; break; case 22: a.tabeladano.gdp = "2d", a.tabeladano.geb = "4d"; break; case 23: a.tabeladano.gdp = "2d+1", a.tabeladano.geb = "4d+1"; break; case 24: a.tabeladano.gdp = "2d+1", a.tabeladano.geb = "4d+2"; break; case 25: a.tabeladano.gdp = "2d+2", a.tabeladano.geb = "5d-1"; break; case 26: a.tabeladano.gdp = "2d+2", a.tabeladano.geb = "5d"; break; case 27: a.tabeladano.gdp = "3d-1", a.tabeladano.geb = "5d+1"; break; case 28: a.tabeladano.gdp = "3d-1", a.tabeladano.geb = "5d+1"; break; case 29: a.tabeladano.gdp = "3d", a.tabeladano.geb = "5d+2"; break; case 30: a.tabeladano.gdp = "3d", a.tabeladano.geb = "5d+2"; break; case 31: a.tabeladano.gdp = "3d+1", a.tabeladano.geb = "6d-1"; break; case 32: a.tabeladano.gdp = "3d+1", a.tabeladano.geb = "6d-1"; break; case 33: a.tabeladano.gdp = "3d+2", a.tabeladano.geb = "6d"; break; case 34: a.tabeladano.gdp = "3d+2", a.tabeladano.geb = "6d"; break; case 35: a.tabeladano.gdp = "4d-1", a.tabeladano.geb = "6d+1"; break; case 36: a.tabeladano.gdp = "4d-1", a.tabeladano.geb = "6d+1"; break; case 37: a.tabeladano.gdp = "4d", a.tabeladano.geb = "6d+2"; break; case 38: a.tabeladano.gdp = "4d", a.tabeladano.geb = "6d+2"; break; case 39: a.tabeladano.gdp = "4d+1", a.tabeladano.geb = "7d-1"; break; case 40: a.tabeladano.gdp = "4d+1", a.tabeladano.geb = "7d-1"; break; case 41: a.tabeladano.gdp = "4d+1", a.tabeladano.geb = "7d-1"; break; case 42: a.tabeladano.gdp = "4d+1", a.tabeladano.geb = "7d-1"; break; case 43: a.tabeladano.gdp = "4d+1", a.tabeladano.geb = "7d-1"; break; case 44: a.tabeladano.gdp = "4d+1", a.tabeladano.geb = "7d-1"; break; case 45: a.tabeladano.gdp = "5d", a.tabeladano.geb = "7d+1"; break; case 46: a.tabeladano.gdp = "5d", a.tabeladano.geb = "7d+1"; break; case 47: a.tabeladano.gdp = "5d", a.tabeladano.geb = "7d+1"; break; case 48: a.tabeladano.gdp = "5d", a.tabeladano.geb = "7d+1"; break; case 49: a.tabeladano.gdp = "5d", a.tabeladano.geb = "7d+1"; break; case 50: a.tabeladano.gdp = "5d+2", a.tabeladano.geb = "8d-1"; break; case 51: a.tabeladano.gdp = "5d+2", a.tabeladano.geb = "8d-1"; break; case 52: a.tabeladano.gdp = "5d+2", a.tabeladano.geb = "8d-1"; break; case 53: a.tabeladano.gdp = "5d+2", a.tabeladano.geb = "8d-1"; break; case 54: a.tabeladano.gdp = "5d+2", a.tabeladano.geb = "8d-1"; break; case 55: a.tabeladano.gdp = "6d", a.tabeladano.geb = "8d+1"; break; case 56: a.tabeladano.gdp = "6d", a.tabeladano.geb = "8d+1"; break; case 57: a.tabeladano.gdp = "6d", a.tabeladano.geb = "8d+1"; break; case 58: a.tabeladano.gdp = "6d", a.tabeladano.geb = "8d+1"; break; case 59: a.tabeladano.gdp = "6d", a.tabeladano.geb = "8d+1"; break; case 60: a.tabeladano.gdp = "7d-1", a.tabeladano.geb = "9d"; break; case 61: a.tabeladano.gdp = "7d-1", a.tabeladano.geb = "9d"; break; case 62: a.tabeladano.gdp = "7d-1", a.tabeladano.geb = "9d"; break; case 63: a.tabeladano.gdp = "7d-1", a.tabeladano.geb = "9d"; break; case 64: a.tabeladano.gdp = "7d-1", a.tabeladano.geb = "9d"; break; case 65: a.tabeladano.gdp = "7d+1", a.tabeladano.geb = "9d+2"; break; case 66: a.tabeladano.gdp = "7d+1", a.tabeladano.geb = "9d+2"; break; case 67: a.tabeladano.gdp = "7d+1", a.tabeladano.geb = "9d+2"; break; case 68: a.tabeladano.gdp = "7d+1", a.tabeladano.geb = "9d+2"; break; case 69: a.tabeladano.gdp = "7d+1", a.tabeladano.geb = "9d+2"; break; case 70: a.tabeladano.gdp = "8d", a.tabeladano.geb = "10d"; break; case 71: a.tabeladano.gdp = "8d", a.tabeladano.geb = "10d"; break; case 72: a.tabeladano.gdp = "8d", a.tabeladano.geb = "10d"; break; case 73: a.tabeladano.gdp = "8d", a.tabeladano.geb = "10d"; break; case 74: a.tabeladano.gdp = "8d", a.tabeladano.geb = "10d"; break; case 75: a.tabeladano.gdp = "8d+2", a.tabeladano.geb = "10d+2"; break; case 76: a.tabeladano.gdp = "8d+2", a.tabeladano.geb = "10d+2"; break; case 77: a.tabeladano.gdp = "8d+2", a.tabeladano.geb = "10d+2"; break; case 78: a.tabeladano.gdp = "8d+2", a.tabeladano.geb = "10d+2"; break; case 79: a.tabeladano.gdp = "8d+2", a.tabeladano.geb = "10d+2"; break; case 80: a.tabeladano.gdp = "9d", a.tabeladano.geb = "11d"; break; case 81: a.tabeladano.gdp = "9d", a.tabeladano.geb = "11d"; break; case 82: a.tabeladano.gdp = "9d", a.tabeladano.geb = "11d"; break; case 83: a.tabeladano.gdp = "9d", a.tabeladano.geb = "11d"; break; case 84: a.tabeladano.gdp = "9d", a.tabeladano.geb = "11d"; break; case 85: a.tabeladano.gdp = "9d+2", a.tabeladano.geb = "11d+2"; break; case 86: a.tabeladano.gdp = "9d+2", a.tabeladano.geb = "11d+2"; break; case 87: a.tabeladano.gdp = "9d+2", a.tabeladano.geb = "11d+2"; break; case 88: a.tabeladano.gdp = "9d+2", a.tabeladano.geb = "11d+2"; break; case 89: a.tabeladano.gdp = "9d+2", a.tabeladano.geb = "11d+2"; break; case 90: a.tabeladano.gdp = "10d", a.tabeladano.geb = "12d"; break; case 91: a.tabeladano.gdp = "10d", a.tabeladano.geb = "12d"; break; case 92: a.tabeladano.gdp = "10d", a.tabeladano.geb = "12d"; break; case 93: a.tabeladano.gdp = "10d", a.tabeladano.geb = "12d"; break; case 94: a.tabeladano.gdp = "10d", a.tabeladano.geb = "12d"; break; case 95: a.tabeladano.gdp = "10d+2", a.tabeladano.geb = "12d+2"; break; case 96: a.tabeladano.gdp = "10d+2", a.tabeladano.geb = "12d+2"; break; case 97: a.tabeladano.gdp = "10d+2", a.tabeladano.geb = "12d+2"; break; case 98: a.tabeladano.gdp = "10d+2", a.tabeladano.geb = "12d+2"; break; case 99: a.tabeladano.gdp = "10d+2", a.tabeladano.geb = "12d+2"; break; case 100: a.tabeladano.gdp = "11d", a.tabeladano.geb = "13d"; break; default: throw "Erro ao escolher GDP E BALANÇO" } return a.tabeladano } }; return a } } }]);