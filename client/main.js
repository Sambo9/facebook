var myApp = angular.module('myApp', ['ngRoute',"ngAnimate"]);

myApp.config(function ($routeProvider) {
   $routeProvider
   .when('/', {templateUrl: 'partials/home.html'})
   .when('/login', {
      templateUrl: 'partials/login.html',
      controller: 'loginController',
      access: {restricted: false}
   })
   .when('/logout', {
      controller: 'logoutController',
      access: {restricted: true}
   })
   .when('/register', {
      templateUrl: 'partials/register.html',
      controller: 'registerController',
      access: {restricted: false}
   })
   .when('/one', {
      template: '<h1>This is page one!</h1>',
      access: {restricted: true}
   })
   .when('/home', {
      template: '<h1>This is page two!</h1>',
      access: {restricted: true}
   })
   .otherwise({redirectTo: '/'});
});

myApp.run(function ($rootScope, $location, $route, AuthService) {
   $rootScope.$on('$routeChangeStart', function (event, next, current) {
      if (next.access != null && next.access.restricted && AuthService.isLoggedIn() === false) {
         $location.path('/login');
         $route.reload();
      }
   });
});
