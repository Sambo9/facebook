var myApp = angular.module('myApp', []);

myApp.controller('messagesController', function($scope, $http){
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
