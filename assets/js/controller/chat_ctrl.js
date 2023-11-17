angular.module('angularchat').controller("chat_ctrl", function($scope, $http, $timeout, $rootScope, cfpLoadingBar, $firebase) {

    $scope.person_choosed = 1;
    $scope.choose_person = function (id) {
      $scope.person_choosed = id;
    }
    
    var bar = document.getElementById('js-progressbar');

    var config = {
        apiKey: '<your-api-key>',
        authDomain: '<your-auth-domain>',
        databaseURL: '<your-database-url>',
        storageBucket: '<your-storage-bucket>'
      };
    
    firebase.initializeApp(config);

    var ref = new Firebase("https://alpha-db.firebaseio.com/");
  
    $scope.messages = $firebase(ref);
  
    $scope.addMessage = function(e) {
        if (e.keyCode != 13) return;
        $scope.messages.$add({from: $scope.name, body: $scope.msg});
        $scope.msg = "";
    }
  
  });