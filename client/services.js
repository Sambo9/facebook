angular.module('myApp').factory('AuthService',
['$q', '$timeout', '$http',
function ($q, $timeout, $http) {

   // create user variable
   var user = null;

   // return available functions for use in controllers
   return ({
      isLoggedIn: isLoggedIn,
      getUserStatus: getUserStatus,
      login: login,
      logout: logout,
      register: register,
      setUser: setUser
   });

   function setUser(user) {
      window.user = user;
   }

   function isLoggedIn() {
      if(user) {
         return true;
      } else {
         return false;
      }
   }
   function getUserStatus() {
      return user;
   }
   function login(username, password) {

      // create a new instance of deferred
      var deferred = $q.defer();

      // send a post request to the server
      $http.post('/login', {username: username, password: password})
      // handle success
      .success(function (data, status) {
         if(status === 200 && data.status){
            user = true;
            deferred.resolve();
         } else {
            user = false;
            deferred.reject();
         }
      })
      // handle error
      .error(function (data) {
         user = false;
         deferred.reject();
      });

      // return promise object
      return deferred.promise;

   }
   function logout() {

      // create a new instance of deferred
      var deferred = $q.defer();

      // send a get request to the server
      $http.get('/logout')
      // handle success
      .success(function (data) {
         user = false;
         deferred.resolve();
      })
      // handle error
      .error(function (data) {
         user = false;
         deferred.reject();
      });

      // return promise object
      return deferred.promise;

   }
   function register(username, password, firstname, lastname, address, email) {

      // create a new instance of deferred
      var deferred = $q.defer();

      // send a post request to the server
      $http.post('/register', {username: username, password: password, firstname: firstname, lastname: lastname, address: address, email: email})
      // handle success
      .success(function (data, status) {
         if(status === 200 && data.status){
            deferred.resolve();
         } else {
            deferred.reject();
         }
      })
      // handle error
      .error(function (data) {
         deferred.reject();
      });

      // return promise object
      return deferred.promise;

   }
}]);
