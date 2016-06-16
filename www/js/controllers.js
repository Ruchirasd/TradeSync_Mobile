angular.module('app.controllers', ['ui.router'])

  .controller('loadingCtrl', function ($scope, sessionService, $http, $state, $rootScope) {
    $http.get($rootScope.requestURI + '/request/exchange/query').then(function (response) {
      //the response from the server is now contained in 'response'
      //it displays as an alert

      $exdata = JSON.stringify(response.data);
      sessionService.persist("exchanges", JSON.stringify(response.data));

      var user = sessionService.get("user");
      $http.get($rootScope.requestURI + '/request/user/query/' + user.id).then(function (response) {
          sessionService.persist("myStocks", response.data);
          //alert(JSON.stringify(response.data));
          $state.go('tabsController.myStocks');
        }
      );
    })
  })

  .controller('myStocksCtrl', function ($scope, $state, $ionicModal, sessionService, $http, $rootScope, $ionicPopup) {

    //sessionService.persist("mystocks",[{code:"MBSL",price:"2.5"}]);
    //sessionService.persist("exchanges",[{code:"CSE",name:"CSE"},{lme:"LME",name:"LME"}]);

    $scope.exchangeObjs = sessionService.get("exchanges");
    $scope.stockObjs = {};
    $scope.myStocks = sessionService.get("myStocks");
    // Initialize the dialog window
    $ionicModal.fromTemplateUrl('templates/addStock.html', {
      scope: $scope,
      animation: 'slide-in-up'
    }).then(function (modal) {
      $scope.modal = modal;
    });

    $scope.addStock = function ($state) {
      var newStock = {
        title: '',
        description: '',
        isComplete: null
      };

      $scope.newStock = newStock;
      $scope.modal.show();
      $scope.closeModal = function () {
        $scope.modal.hide();
      };
    };
    //this function is triggered when user wants to subscribe for a selected stock
    $scope.subscribe = function (exchange, stock) {

      var user = sessionService.get("user");

      $http.get($rootScope.requestURI + '/request/user/subscribe/' + user.id + '/' + exchange + '/' + stock).then(function (response) {
        //the response from the server is now contained in 'response'
        var user = sessionService.get("user");
        $state.go('app.loading', {}, {reload: true});
        $http.get($rootScope.requestURI + '/request/user/query/' + user.id).then(
          function (response) {
            sessionService.persist("myStocks", response.data);
            $state.go('tabsController.myStocks', {}, {reload: true});
          });
      }, function (error) {
        //there was an error fetching from the server
        var alertPopup = $ionicPopup.alert({
          title: 'Subscribe failed!',
          template: 'Error occurred while accessing server.'
        });
      });

      $scope.closeModal();

    };

    //this function is triggered when user wants to unsubscribe for a selected stock
    $scope.unsubscribe = function (exchange, stock) {

      var user = sessionService.get("user");
      //alert(user.id+exchange+stock);
      $state.go('app.loading', {}, {reload: true});

      $http.get($rootScope.requestURI + '/request/user/unsubscribe/' + user.id + '/' + exchange + '/' + stock).then(function (response) {
        //the response from the server is now contained in 'response'
        var user = sessionService.get("user");
        $http.get($rootScope.requestURI + '/request/user/query/' + user.id).then(function (response) {
          sessionService.persist("myStocks", response.data);
          $state.go('tabsController.myStocks', {}, {reload: true});
          //alert(JSON.stringify(response.data));
        });
      }, function (error) {
        //there was an error fetching from the server
        var alertPopup = $ionicPopup.alert({
          title: 'Subscribe failed!',
          template: 'Error occurred while accessing server.'
        });
      });


    };
    //this function is triggered when user wants to get a list of stocks for given exchange
    $scope.getStockList = function (id) {
      $http.get($rootScope.requestURI + '/request/stock/query/' + id).then(function (response) {
        //the response from the server is now contained in 'response'
        //it displays as an alert
        //alert(JSON.stringify(response.data));
        $scope.stockObjs = response.data;
      }, function (error) {
        //there was an error fetching from the server
      });
    };

  })

  .controller('myAccountCtrl', function ($scope) {

  })

  .controller('statisticsCtrl', function ($scope, sessionService) {
    $scope.options = {
      chart: {
        type: 'lineWithFocusChart',
        height: 450,
        margin : {
          top: 20,
          right: 20,
          bottom: 60,
          left: 40
        },
        duration: 500,
        useInteractiveGuideline: true,
        xAxis: {
          axisLabel: 'X Axis',
          tickFormat: function(d){
            return d3.format(',f')(d);
          }
        },
        x2Axis: {
          tickFormat: function(d){
            return d3.format(',f')(d);
          }
        },
        yAxis: {
          axisLabel: 'Y Axis',
          tickFormat: function(d){
            return d3.format(',.2f')(d);
          },
          rotateYLabel: false
        },
        y2Axis: {
          tickFormat: function(d){
            return d3.format(',.2f')(d);
          }
        }

      }
    };
    var s=sessionService.get("myStocks");
    $scope.data = [{
      key: "Cumulative Return",
      values: s[0]
    }]

    /* Random Data Generator (took from nvd3.org) */

    $scope.myStocks = sessionService.get("myStocks");
  })

  /* This controller is for developing purposes*/
  .controller('developerCtrl', function ($scope, $http, $rootScope) {

    //this function is triggered when user click for to get a list of exchanges
    $scope.getExchangeList = function () {
      $http.get($rootScope.requestURI + '/request/exchange/query').then(function (response) {
        //the response from the server is now contained in 'response'
        //it displays as an alert
        // alert(JSON.stringify(response.data));
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

    }
    //this function is triggered when user wants to subscribe for a selected stock
    $scope.subscribe = function (exchange, stock) {

      var user = sessionService.get("user");
      alert(exchange + stock + user.id);
      $http.get($rootScope.requestURI + '/request/user/subscribe/' + user.id + '/' + exchange + '/' + stock).then(function (response) {
        //the response from the server is now contained in 'response'
        // alert(JSON.stringify(response.data));
      }, function (error) {
        //there was an error fetching from the server
      });
    }
    //this function is triggered when user wants to unsubscribe a subscribed stock
    $scope.unsubscribe = function (user, exchange, stock) {
      $http.get($rootScope.requestURI + '/request/user/unsubscribe/' + user + '/' + exchange + '/' + stock).then(function (response) {
        //the response from the server is now contained in 'response'
        alert(JSON.stringify(response.data));
      }, function (error) {
        //there was an error fetching from the server
      });
    }


  })

  .controller('loginCtrl', function ($scope, $http, $ionicPopup, $ionicHistory, sessionService, $state, $rootScope) {

    $scope.loginSubmit = function (email, password) {
      document.loginPending = 1;
      sessionService.persist("pw", password);
      sessionService.persist("em", email);
      $http.get($rootScope.requestURI + '/request/user/validate/' + email + '/' + password).then(function (response) {
        //the response from the server is now contained in 'response'
        if (document.loginPending == 0) {
          return;
        }
        document.loginPending = 0;
        if (response.data.toString().indexOf("ERROR") > -1) {
          var alertPopup = $ionicPopup.alert({
            title: 'Login failed!',
            template: 'Invalid login details. Please provide TradeSync credentials.'
          });
          sessionService.persist("user", undefined);

        } else {
          //alert(JSON.stringify(response.data));
          var obj = response.data;
          sessionService.persist("user", obj);
          var pw = sessionService.get('pw');
          var em = sessionService.get('em');
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

  .controller('signupCtrl', function ($scope, $http, $ionicPopup, $state, sessionService, $rootScope) {
    //this function is triggered when new user is registering in the system
    $scope.signup = function (name, email, password) {
      document.loginPending = 1;
      $http.get($rootScope.requestURI + '/request/user/register/' + name + '/' + email + '/' + password).then(function (response) {
        //the response from the server is now contained in 'response'
        //the response from the server is now contained in 'response'
        if (document.loginPending == 0) {
          return;
        }
        document.loginPending = 0;
        if (response.data.toString().indexOf("ERROR") > -1) {
          var alertPopup = $ionicPopup.alert({
            title: 'Login failed!',
            template: 'Server couldn\'t sign up with your details. Please try with another email.'
          });
          sessionService.persist("user", undefined);
        } else {
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
