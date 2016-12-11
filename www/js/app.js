// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.controllers' is found in controllers.js
angular.module('starter', ['ionic', 'starter.controllers', 'starter.services'])

.run(function ($ionicPlatform) {
    $ionicPlatform.ready(function () {
        // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
        // for form inputs)

        if (cordova.platformId === 'ios' && window.cordova && window.cordova.plugins.Keyboard) {
            cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
            cordova.plugins.Keyboard.disableScroll(true);
        }

        var deviceInformation = ionic.Platform.device();

        if (deviceInformation.platform == 'windows') {
            document.getElementById('bar').className = 'bar bar-footer bar-royal fixbarwindows';
            //windowModalFix
            var css = '.modal{top:2px;height:100%;border:1px solid double;}';

            head = document.head || document.getElementsByTagName('head')[0],
            style = document.createElement('style');

            style.type = 'text/css';
            if (style.styleSheet) {
                style.styleSheet.cssText = css;
            } else {
                style.appendChild(document.createTextNode(css));
            }

            head.appendChild(style);

        }

        if (window.StatusBar) {
            // org.apache.cordova.statusbar required
            StatusBar.styleDefault();
        }
        console.log(cordova.file);
    });
})

.config(function ($stateProvider, $urlRouterProvider) {
    $stateProvider

      .state('app', {
          url: '/app',
          abstract: true,
          templateUrl: 'templates/menu.html',
          controller: 'AppCtrl'
      })

    .state('app.search', {
        url: '/search',
        views: {
            'menuContent': {
                templateUrl: 'templates/search.html'
            }
        }
    })

    //.state('app.dice', {
    //    url: '/browse',
    //    views: {
    //        'menuContent': {
    //            templateUrl: 'templates/dice.html',
    //            controller:'DiceCtrl'
    //        }
    //    }
    //})
      .state('app.playlists', {
          url: '/playlists',
          views: {
              'menuContent': {
                  templateUrl: 'templates/playlists.html',
                  controller: 'PlaylistsCtrl'
              }
          }
      })

    .state('app.single', {
        url: '/playlists/:playlistId',
        views: {
            'menuContent': {
                templateUrl: 'templates/playlist.html',
                controller: 'PlaylistCtrl'
            }
        }
    });

    // if none of the above states are matched, use this as the fallback
    $urlRouterProvider.otherwise('/app/playlists');
});

//
Array.prototype.search = function (a) { return this[this.map(function (b) { return b[a.key] }).indexOf(a.value)] }, Array.prototype.remove = function (a) { return this.splice(this.map(function (b) { return b[a.key] }).indexOf(a.value), 1) }, Array.prototype.sortByKey = function (a) { return this.sort(function (b, c) { if ("object" != typeof b) { var d = b.json || b, e = c.json || c; b = JSON.parse(d), c = JSON.parse(e) } return b[a] < c[a] ? -1 : b[a] > c[a] ? 1 : 0 }) };