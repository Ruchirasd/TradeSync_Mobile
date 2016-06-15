angular.module('app.controllers', ['ui.router'])

  .controller('myStocksCtrl', function ($scope,$state,$ionicModal,sessionService) {
    
    sessionService.persist("mystocks",[{code:"MBSL",price:"2.5"}]);
    sessionService.persist("exchanges",[{code:"CSE",name:"CSE"},{lme:"LME",name:"LME"}]);

    $scope.exchangeObjs = sessionService.get("exchanges");

    // Initialize the dialog window
    $ionicModal.fromTemplateUrl('templates/addStock.html', {
      scope: $scope,
      animation: 'slide-in-up'
    }).then(function(modal) {
      $scope.modal = modal;
    });

    $scope.addStock = function($state) {
      alert("working");
      var newStock = {
        title: '',
        description: '',
        isComplete: null
      };

      $scope.newStock = newStock;
      $scope.modal.show();
    };
  })

  .controller('myAccountCtrl', function ($scope) {

  })

  .controller('statisticsCtrl', function ($scope) {

  })

  /* This controller is for developing purposes*/
  .controller('developerCtrl', function ($scope, $http) {

    //this function is triggered when user click for to get a list of exchanges
    $scope.getExchangeList = function () {
      // $http.get('http://edu.wearetrying.info/srucheez/web/app.php/request/exchange/query').then(function (response) {
      $http.get('http://localhost:80/SymfonyProjects/TradeSync_Server/web/request/exchange/query').then(function (response) {
        //the response from the server is now contained in 'response'
        //it displays as an alert
        alert(JSON.stringify(response.data));
      }, function (error) {
        //there was an error fetching from the server
      });
    }

    //this function is triggered when user wants to get a list of stocks for given exchange
    $scope.getStockList = function (id) {
      $http.get('http://edu.wearetrying.info/srucheez/web/app.php/request/stock/query/' + id).then(function (response) {
        //the response from the server is now contained in 'response'
        //it displays as an alert
        alert(JSON.stringify(response.data));
      }, function (error) {
        //there was an error fetching from the server
      });
    }

    //this function is triggered when user wants to subscribe for a selected stock
    $scope.subscribe = function (user, exchange, stock) {
      $http.get('http://edu.wearetrying.info/srucheez/web/app.php/request/user/subscribe/' + user + '/' + exchange + '/' + stock).then(function (response) {
        //the response from the server is now contained in 'response'
        alert(JSON.stringify(response.data));
      }, function (error) {
        //there was an error fetching from the server
      });
    }

    //this function is triggered when user wants to unsubscribe a subscribed stock
    $scope.unsubscribe = function (user, exchange, stock) {
      $http.get('http://edu.wearetrying.info/srucheez/web/app.php/request/user/unsubscribe/' + user + '/' + exchange + '/' + stock).then(function (response) {
        //the response from the server is now contained in 'response'
        alert(JSON.stringify(response.data));
      }, function (error) {
        //there was an error fetching from the server
      });
    }

    //this function is triggered when new user is registering in the system
    $scope.signup = function (name) {
      $http.get('http://edu.wearetrying.info/srucheez/web/app.php/request/user/register/' + name + '/' + name + '@example.com/1234').then(function (response) {
        //the response from the server is now contained in 'response'
        alert(JSON.stringify(response.data));
      }, function (error) {
        //there was an error fetching from the server
      });
    }


  })

  .controller('loginCtrl', function ($scope) {

  })

  .controller('signupCtrl', function ($scope) {

  })

  .controller('pageCtrl', function ($scope) {

  })
