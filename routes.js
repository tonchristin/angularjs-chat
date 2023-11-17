/*
|--------------------------------------------------------------------------
| ANGULAR | Route
|--------------------------------------------------------------------------
*/

app.config(["$routeProvider",function($route) {
  
  $route.when("/", { 
    templateUrl : "template/inc.login.html",
    controller: 'main_ctrl',
  })

  /* Chat */
  .when("/chat", { 
    templateUrl : "template/inc.chat.html",
    controller: 'main_ctrl',
  })

}]);
