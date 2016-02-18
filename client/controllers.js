// ========================
// ========= MAIN =========
// ========================

angular.module('myApp').controller('mainController',
function ($scope, AuthService, $http) {
var _this = this;
   $http.get('/islogged')
   .then(function(res){
      if(res.data._id != undefined) {
         _this.connected = true;
         AuthService.setUser(res.data);
      }
   });
});


// =========================
// ========= LOGIN =========
// =========================

angular.module('myApp').controller('loginController',
['$scope', '$location', 'AuthService',
function ($scope, $location, AuthService) {

   console.log(AuthService.getUserStatus());

   $scope.login = function () {

      // initial values
      $scope.error = false;
      $scope.disabled = true;

      // call login from service
      AuthService.login($scope.loginForm.username, $scope.loginForm.password)
      // handle success
      .then(function () {
         $location.path('/');
         $scope.disabled = false;
         $scope.loginForm = {};
         $scope.main.connected = true;
      })
      // handle error
      .catch(function () {
         $scope.error = true;
         $scope.errorMessage = "Invalid username and/or password";
         $scope.disabled = false;
         $scope.loginForm = {};
      });
   };
}]);

// ==========================
// ========= LOGOUT =========
// ==========================
angular.module('myApp').controller('logoutController',
['$scope', '$location', 'AuthService',
function ($scope, $location, AuthService) {

   $scope.logout = function () {

      console.log(AuthService.getUserStatus());

      // call logout from service
      AuthService.logout()
      .then(function () {
         $scope.main.connected = false;
         $location.path('/login');
      });

   };

}]);

// ============================
// ========= REGISTER =========
// ============================
angular.module('myApp').controller('registerController',
['$scope', '$location', 'AuthService',
function ($scope, $location, AuthService) {

   console.log(AuthService.getUserStatus());

   $scope.register = function () {

      // initial values
      $scope.error = false;
      $scope.disabled = true;

      // call register from service
      AuthService.register($scope.registerForm.username, $scope.registerForm.password, $scope.registerForm.firstname, $scope.registerForm.lastname, $scope.registerForm.address, $scope.registerForm.email)
      // handle success
      .then(function () {
         $location.path('/login');
         $scope.disabled = false;
         $scope.registerForm = {};
      })
      // handle error
      .catch(function () {
         $scope.error = true;
         $scope.errorMessage = "Something went wrong!";
         $scope.disabled = false;
         $scope.registerForm = {};
      });

   };

}]);



angular.module('myApp').controller('messagesController', function($scope, $http){
   var _this = this;

   $scope.main.title = 'Messages';

   this.getMessages = function() {
      $http.get('/api/messages')
      .then(function(res) {
         _this.messages = res.data;
      });
   };

   this.getMessages();

   this.removeMessage = function(id) {
      $http.delete('/api/messages/' + id)
      .then(function() {
         _this.getMessages();
      });
   };

   this.sendMessage = function() {
      if (!this.newmsg || !this.newmsg.title || !this.newmsg.text)
      return ;
      $http.post('/api/messages', this.newmsg)
      .then(function() {
         _this.getMessages();
      });
      this.newmsg = {};
   };
})
