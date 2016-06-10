'use strict';

angular.module('loginApp')
.controller('LoginCtrl', [ '$scope', '$state', '$modalInstance' , '$window', 'Auth', '$modal', 
function($scope, $state, $modalInstance, $window, Auth, $modal ) {
	$scope.credentials = {};
	$scope.loginForm = {};
	$scope.error = false;

    $scope.cancel = function () {
    	$modalInstance.dismiss('cancel');
  	};	
		
	//when the form is submitted
	$scope.submit = function() {
		$scope.submitted = true;
		if (!$scope.loginForm.$invalid) {
			$scope.login($scope.credentials);
		} else {
			$scope.error = true;
			return;
		}
	};

	//Performs the login function, by sending a request to the server with the Auth service
	$scope.login = function(credentials) {
		$scope.error = false;
		Auth.login(credentials, function(user) {
			//success function

			// Handle Relogin modal race condition... I know it sucks
			setTimeout(function() {
			    $modalInstance.close();
			}, 50);
			
			//$scope.cancel();
			$state.go('home');
		}, function(err) {
			console.log(err);
			$scope.error = true;
		});
	};
	
	// if a session exists for current user (page was refreshed) log him in again
	if ($window.sessionStorage["userInfo"]) {
		console.log('Attempting logging user in again: ' + $window.sessionStorage["userInfo"].username)
		var credentials = JSON.parse($window.sessionStorage["userInfo"]);
		$scope.login(credentials);
	}

	//Open registration form
	$scope.toggleRegModal = function(){
		// Close Login Modal
		$modalInstance.close();
	      var modalInstance = $modal.open({
		      templateUrl: 'templates/register.html',
		      controller: 'RegisterCtrl',
		      backdrop : 'static',
		  });
    };

} ])

.controller('RegisterCtrl', [ '$scope', '$state', '$modalInstance' , '$window', 'Auth', '$modal', 
function($scope, $state, $modalInstance, $window, Auth, $modal ) {
	$scope.registrationInfo = {};
	$scope.registerForm = {};

	$scope.cancelRegModal = function () {
    	$modalInstance.close();
	      var modalInstance = $modal.open({
		      templateUrl: 'templates/login.html',
		      controller: 'LoginCtrl',
		      backdrop : 'static',
		  });
  	};

  	//when the form is submitted
	$scope.submit = function() {
		$scope.submitted = true;
		if (!$scope.registerForm.$invalid) {
			$scope.register($scope.registrationInfo);
		} else {
			$scope.error = true;
			return;
		}
	};	

	//Performs Register function, request sent to Auth service
	$scope.register = function(registrationInfo) {
		$scope.error = false;
		Auth.register(registrationInfo, function(user) {
		 	//success function
		 	$modalInstance.close();
		 	$state.go('home');
		 }, function(error) {
		 	console.log('Error Registering new user with message: ' + error.data.message);
		 	$scope.error = true;
		 });
	};

}]);
