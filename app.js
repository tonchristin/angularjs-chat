/*
|--------------------------------------------------------------------------
| ANGULAR | ng-app : tp_questionaire
|--------------------------------------------------------------------------
*/

var app = angular.module('angularchat', ['firebase', 'angular-loading-bar', 'ngRoute'],);
app.controller('main_ctrl', function($scope, $http, $timeout, $rootScope, cfpLoadingBar, $window, $firebaseObject) {

  /* ANGULAR : Active Route
	-------------------------------------------------------------*/

  $scope.active_route = 'login';

  $rootScope.$on('$routeChangeSuccess', function (e, current, pre) {
     $scope.active_route = current.$$route.originalPath.substring(1);
  });
  
  /* ANGULAR : Loading Bar
	-------------------------------------------------------------*/

  cfpLoadingBar.start();
	
    setTimeout( function() {
        cfpLoadingBar.complete();
    }, 30);


  /* FIREBASE Connecting
	-------------------------------------------------------------*/

        const firebaseConfig = {
          apiKey: "AIzaSyAw59CoQUutNRAzDLStKnZwpX8aGwhn-CE",
          authDomain: "moronlinetestchat.firebaseapp.com",
          projectId: "moronlinetestchat",
          storageBucket: "moronlinetestchat.appspot.com",
          messagingSenderId: "844275988709",
          appId: "1:844275988709:web:d858702f8562273f59bc0c",
          databaseURL: "https://moronlinetestchat-default-rtdb.firebaseio.com/",
        }

        if (!firebase.apps.length) {
          firebase.initializeApp(firebaseConfig);
        }
    

  /* Chat
	-------------------------------------------------------------*/

    $scope.client_name = '';
    const chats = firebase.database().ref();

    $("input[name=client_name]").focus();

    if (!localStorage.getItem('client_name')) {
      window.location.href = '/#!/';
    }
    else {
      window.location.href = '/#!/chat';
    }

    $scope.login_action = function (name) {

      if ($scope.client_name.length == 0) {
        UIkit.modal.alert('<span class="uk-text-danger">Please enter your name and click enter to join the chat room!</span>').then(function () {
          
        });
      }
      else {

        localStorage.setItem('client_name', name);

        UIkit.modal.confirm('<span class="uk-text-success">Welcome <strong>' + name + '</strong>, click "Ok" to going the chat room</span>').then(function () {
          window.location.href = '/#!/chat';
        }, function () {});
      }
    }
    
    chats.on('value', function (data) {
      $scope.messages = [];
      data.forEach(function (message) {

        $scope.messages.push(message.val());
        $scope.$evalAsync();

      });
    });

    $scope.add_message = function (msg) {

      if (msg.length > 0) {
        
        chats.push({
          client_name : localStorage.getItem('client_name'),
          message : msg
        });

        $scope.message = '';

      }
    }

    $scope.firstLetter = function (string) {
      return string.charAt(0)
    }

});


app.config(['cfpLoadingBarProvider', function(cfpLoadingBarProvider) {
  cfpLoadingBarProvider.latencyThreshold = 0;
  cfpLoadingBarProvider.includeSpinner = false;
  cfpLoadingBarProvider.includeBar = true;
}]);

app.filter('reverse', function() {
  return function(items) {
    return items.slice().reverse();
  };
});