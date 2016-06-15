angular.module('app.controllers', ['ui.router'])

  .controller('loadingCtrl', function ($scope, sessionService, $http,$state, $rootScope) {
    $http.get($rootScope.requestURI+'/request/exchange/query').then(function (response) {
      //the response from the server is now contained in 'response'
      //it displays as an alert
      alert(JSON.stringify(response.data));
      $exdata=JSON.stringify(response.data);
      sessionService.persist("exchanges",JSON.stringify(response.data));

      $state.go('tabsController.myStocks');
    })
    })

  .controller('myStocksCtrl', function ($scope,$state,$ionicModal,sessionService,$http,$rootScope) {

    //sessionService.persist("mystocks",[{code:"MBSL",price:"2.5"}]);
    //sessionService.persist("exchanges",[{code:"CSE",name:"CSE"},{lme:"LME",name:"LME"}]);

    $scope.exchangeObjs = sessionService.get("exchanges");
    $scope.stockObjs = {};

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

    //this function is triggered when user wants to get a list of stocks for given exchange
    $scope.getStockList = function (id) {
      alert(id);
      $http.get($rootScope.requestURI+'/request/stock/query/' + id).then(function (response) {
        //the response from the server is now contained in 'response'
        //it displays as an alert
        alert(JSON.stringify(response.data));
        $scope.stockObjs=response.data;
      }, function (error) {
        //there was an error fetching from the server
      });
    }

  })

  .controller('myAccountCtrl', function ($scope) {

  })

  .controller('statisticsCtrl', function ($scope) {

  })

  /* This controller is for developing purposes*/
  .controller('developerCtrl', function ($scope, $http,$rootScope) {

    //this function is triggered when user click for to get a list of exchanges
    $scope.getExchangeList = function () {
      $http.get($rootScope.requestURI + '/request/exchange/query').then(function (response) {
        //the response from the server is now contained in 'response'
        //it displays as an alert
        alert(JSON.stringify(response.data));
      }, function (error) {
        //there was an error fetching from the server
      });


      /*

       //this function is triggered when user wants to get a list of stocks for given exchange
       $scope.getStockList = function (id) {
       $http.get($rootScope.requestURI+'/request/stock/query/' + id).then(function (response) {
       //the response from the server is now contained in 'response'
       //it displays as an alert
       alert(JSON.stringify(response.data));
       sessionService.persist("stocks",JSON.stringify(response.data));
       }, function (error) {
       //there was an error fetching from the server
       });
       }
       */


      //this function is triggered when user wants to subscribe for a selected stock
      $scope.subscribe = function (user, exchange, stock) {
        $http.get($rootScope.requestURI + '/request/user/subscribe/' + user + '/' + exchange + '/' + stock).then(function (response) {
          //the response from the server is now contained in 'response'
          alert(JSON.stringify(response.data));
        }, function (error) {
          //there was an error fetching from the server
        });
      }
    }
    //this function is triggered when user wants to unsubscribe a subscribed stock
    $scope.unsubscribe = function (user, exchange, stock) {
      $http.get($rootScope.requestURI+'/request/user/unsubscribe/' + user + '/' + exchange + '/' + stock).then(function (response) {
        //the response from the server is now contained in 'response'
        alert(JSON.stringify(response.data));
      }, function (error) {
        //there was an error fetching from the server
      });
    }




  })

  .controller('loginCtrl', function ($scope,$http,$ionicPopup,$ionicHistory,sessionService,$state,$rootScope) {

    $scope.loginSubmit = function(email,password) {
      document.loginPending=1;
      sessionService.persist("pw", password);
      sessionService.persist("em", email);
      $http.get($rootScope.requestURI+'/request/user/validate/' + email + '/' + password).then(function (response) {
        //the response from the server is now contained in 'response'
        if(document.loginPending==0){
          return;
        }
        document.loginPending=0;
        if(response.data.toString().indexOf("ERROR")>-1){
          var alertPopup = $ionicPopup.alert({
            title: 'Login failed!',
            template: 'Invalid login details. Please provide TradeSync credentials.'
          });
          sessionService.persist("user", undefined);

        }else{
          alert(JSON.stringify(response.data));
          var obj = response.data;
          sessionService.persist("user", obj);
          var pw=sessionService.get('pw');
          var em=sessionService.get('em');
          /*
          // execute INSERT statement with parameter
          $cordovaSQLite.execute(db, 'INSERT INTO user_data (email,pw) VALUES (?,?)', [em,pw])
            .then(function (result) {
              alert("Message saved successful, cheers!");
            }, function (error) {
              alert("Error on saving: " + error.message);
            });
*/

          $ionicHistory.nextViewOptions({
            disableBack: true
          });
          $state.go('app.loading');
        }

      }, function (error) {
        sessionService.persist("user", undefined);
      });
    }

    // Execute SELECT statement to load message from database.
/*
    var db = $cordovaSQLite.openDB({name: "ts.db", location: 'default'});
    $cordovaSQLite.execute(db, "SELECT * FROM user_data");
*/


  })

  .controller('signupCtrl', function ($scope,$http,$ionicPopup,$state,sessionService, $rootScope) {
    //this function is triggered when new user is registering in the system
    $scope.signup = function (name,email,password) {
      document.loginPending=1;
      $http.get($rootScope.requestURI+'/request/user/register/' + name + '/' + email +'/' + password).then(function (response) {
        //the response from the server is now contained in 'response'
        //the response from the server is now contained in 'response'
        if(document.loginPending==0){
          return;
        }
        document.loginPending=0;
        if(response.data.toString().indexOf("ERROR")>-1){
          var alertPopup = $ionicPopup.alert({
            title: 'Login failed!',
            template: 'Server couldn\'t sign up with your details. Please try with another email.'
          });
          sessionService.persist("user", undefined);
        }else{
          var obj = response.data;
          sessionService.persist("user", obj);
          $state.go('app.loading');
        }
      }, function (error) {
        sessionService.persist("user", undefined);
        //there was an error fetching from the server
      });
    }
  })

  .controller('pageCtrl', function ($scope) {

  })
