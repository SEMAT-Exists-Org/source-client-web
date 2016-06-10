'use strict';

angular.module('loginApp')
.factory('Auth', Auth);

Auth.$inject = [ '$http', '$rootScope', '$window', 'Session', 'AUTH_EVENTS', 'UserService']
function Auth($http, $rootScope, $window, Session, AUTH_EVENTS, UserService) {
	var authService = {};
	
	 authService.login = function(user, success, error) {	
	 	if (user.token == null && user.username != null){
	 		var params = JSON.stringify(user);
	 		console.log('Logging in User: ' + user.username)
	 		//var params = JSON.stringify({"username": "some4@email.com", "password": "test1234"});
	 		
	 		//$http.post('misc/users.json').success(function(data)
	 		UserService.Login(params)
	 			.then(function(response) {
		            // Successful response
		            console.log('Logging in with token: ' + response.data.token)
		            
		            //Delete password from local variables 
		            delete user.password;
		            $rootScope.currentUser = response.data;

		            //set the browser session, to avoid relogin on refresh
		            $window.sessionStorage["userInfo"] = JSON.stringify(response.data);

		            //update current user into the Session service
		 			Session.create(response.data);

		 			//fire event of successful login
		 	 		$rootScope.$broadcast(AUTH_EVENTS.loginSuccess);
		  			//run success function

		  			console.log('response: ' + JSON.stringify(response.data))
			 		success(response.data);

	 		     }, 
	 		     function(response) { 
	 		     	// Failed Login Attempt
	 		    	 console.log('Login Failure')
	 		     	$rootScope.$broadcast(AUTH_EVENTS.loginFailed);
	 	 		 	error();
	 	     });
	 	} else {
	 		// Assume that the token is valid for now...
	 		console.log('Browser credentials present, relogging user in')
	 		$rootScope.currentUser = user;
	 		
	 		// Credentials from Browser storage
	 		Session.create(user);

	 		/*
	 		* Validate TOKEN here, or revert to usuing purely local storage.  
	 		*/

	 		//fire event of successful login
	 		$rootScope.$broadcast(AUTH_EVENTS.loginSuccess); 

	 		//run success function		
	 		success(user);
	 	}
		
	 };

	 /**
	 * TODO: Login & Registration need refactoring into cleaner functions w/o repeating code
	 **/
	 // Register new users
	 authService.register = function(user, success, error) {
	 	var params = JSON.stringify(user);
	 	console.log('Registering User: ' + user.email)
	 	//var regParams = JSON.stringify({"firstname":"John", "lastname":"Test", "email":"test3@address.com", "password":"password"});
	 	UserService.RegisterUser(params)
	 		.then(function(response) {
		 			console.log('Succesfully registered user' +' : ' + JSON.stringify(response.data))
		 			
		 			// Set the username as email
		 			response.data.username = response.data.email;
		 			
		 			//set the browser session, to avoid relogin on refresh
			        $window.sessionStorage["userInfo"] = JSON.stringify(response.data);

			 		Session.create(response.data);
			 		$rootScope.currentUser = response.data;

		 			//fire event of successful login
		 	 		$rootScope.$broadcast(AUTH_EVENTS.loginSuccess);

		 	 		// run success function
			 		success(response.data);
	 		}, 
	 			function(response) { 
	 		     	// Failed Login Attempt
	 		    	console.log('Registration Failure: ' + JSON.stringify(response))
	 	 		 	error(response);
	 	     });
	 };

	//check if the user is authenticated
	authService.isAuthenticated = function() {
		return !!Session.user;
	};
	
	//check if the user is authorized to access the next route this function can be also used on element level
	//e.g. <p ng-if="isAuthorized(authorizedRoles)">show this only to admins</p>
	authService.isAuthorized = function(authorizedRoles) {
		if (!angular.isArray(authorizedRoles)) {
	      authorizedRoles = [authorizedRoles];
	    }
	    return (authService.isAuthenticated() &&
	      authorizedRoles.indexOf(Session.userRole) !== -1);
	};
	
	//log out the user and broadcast the logoutSuccess event
	authService.logout = function(){
		console.log('Logging out with token: ' + Session.token)
		 UserService.Logout()
 			.then(function(response) {
	            // Successful response
	            console.log(JSON.stringify(response));
	            Session.destroy();
				$window.sessionStorage.removeItem("userInfo");
				$rootScope.$broadcast(AUTH_EVENTS.logoutSuccess);

 		     }, 
 		     function(response) { // optional
 		     	// Failed Login Attempt
 		    	 console.log('Logout Failure')
 	 		 	error();
 	     });	
	}

	return authService;
}
