angular.module('app.routes', ['ionicUIRouter'])

  .config(function ($stateProvider, $urlRouterProvider) {

    // Ionic uses AngularUI Router which uses the concept of states
    // Learn more here: https://github.com/angular-ui/ui-router
    // Set up the various states which the app can be in.
    // Each state's controller can be found in controllers.js
    $stateProvider
      .state('tabsController.myStocks', {
        url: '/page2',
        views: {
          'tab1': {
            templateUrl: 'templates/myStocks.html',
            controller: 'myStocksCtrl'
          }
        }
      })
      .state('app', {
        abstract: true,
        templateUrl: "index.html"
      })

      .state('tabsController.myAccount', {
        url: '/page4',
        views: {
          'tab3': {
            templateUrl: 'templates/statistics.html',
            controller: 'statisticsCtrl'
          }
        }
      })

      .state('tabsController.statistics', {
        url: '/page3',
        views: {
          'tab2': {
            templateUrl: 'templates/myAccount.html',
            controller: 'myAccountCtrl'
          }
        }
      })

      .state('tabsController.developer', {
        url: '/page5',
        views: {
          'tab4': {
            templateUrl: 'templates/developer.html',
            controller: 'developerCtrl'
          }
        }
      })

      .state('tabsController', {
        url: '/page1',
        templateUrl: 'templates/tabsController.html',
        abstract: true
      })

      .state('login', {
        url: '/page6',
        templateUrl: 'templates/login.html',
        controller: 'loginCtrl'
      })

      .state('signup', {
        url: '/page7',
        templateUrl: 'templates/signup.html',
        controller: 'signupCtrl'
      })

      .state('app.loading', {
      url: '/page9',
      templateUrl: 'templates/loading.html',
      controller: 'loadingCtrl'
    })

    $urlRouterProvider.otherwise('/page6');

  });
