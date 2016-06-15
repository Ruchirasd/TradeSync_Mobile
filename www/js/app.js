// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.services' is found in services.js
// 'starter.controllers' is found in controllers.js
var db;
angular.module('app', ['ionic', 'app.controllers', 'app.routes', 'app.services', 'app.directives'])

  .run(function ($ionicPlatform, $rootScope) {
    $ionicPlatform.ready(function () {
      // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
      // for form inputs)
      if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
        cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
        cordova.plugins.Keyboard.disableScroll(true);
      }
      if (window.StatusBar) {
        // org.apache.cordova.statusbar required
        StatusBar.styleDefault();
      }
      /*
      try {
        db = $cordovaSQLite.openDB({name: "ts.db", location: 'default'});
      } catch (error) {
        alert(error);
      }

      $cordovaSQLite.execute(db, 'CREATE TABLE IF NOT EXISTS user_data (id INTEGER PRIMARY KEY AUTOINCREMENT, email TEXT, pw TEXT)');
      */
    });
    var localRoot = "localhost:80/SymfonyProjects/TradeSync_Server/web";
    var remoteRoot = "edu.wearetrying.info/srucheez/web/app.php";
    $rootScope.requestURI = "http://" + localRoot;




  });
