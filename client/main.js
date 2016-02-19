var myApp = angular.module('myApp', ['ngRoute',"ngAnimate"]);

myApp.config(function ($routeProvider, $locationProvider) {
   $routeProvider
   .when('/messages', {
                templateUrl: 'partials/messages.html',
                controller: 'MessagesController as msg'
            })
   .when('/', {templateUrl: 'partials/home.html'})
   .when('/login', {
      templateUrl: 'partials/login.html',
      controller: 'loginController',
   })
   .when('/logout', {
      controller: 'logoutController',
   })
   .when('/register', {
      templateUrl: 'partials/register.html',
      controller: 'registerController',
   })
   .when('/one', {
      template: '<h1>This is page one!</h1>',
   })
   .when('/home', {
      template: '<h1>This is page two!</h1>',
   })
   .otherwise({redirectTo: '/'});

   $locationProvider.html5Mode(true);
});

myApp.run(function ($rootScope, $location, $route, AuthService) {
   $rootScope.$on('$routeChangeStart', function (event, next, current) {
      if (next.access != null && next.access.restricted && AuthService.isLoggedIn() === false) {
         $location.path('/login');
         $route.reload();
      }
   });
});
