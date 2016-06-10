'use strict';
/**
 * This interceptor will make sure that, after each $http request
 * if the user doesn't have access to something runs the according
 * event, given the response status codes from the server. 
 */
angular.module('loginApp')
.factory('AuthInterceptor', [ '$rootScope', '$q', 'Session', '$window', 'AUTH_EVENTS',
function($rootScope, $q, Session, $window, AUTH_EVENTS) {
	return {
		responseError : function(response) {

			var sessionTimeoutCodes = [302, 419, 440];
			
			// quick hack to renew token
			if (sessionTimeoutCodes.indexOf(response.status) != -1) {
				console.log('Detected Session Timeout...');
				$window.sessionStorage.removeItem("userInfo");
			}

			// broadcast relogin or auth requriements 
			$rootScope.$broadcast({
				401 : AUTH_EVENTS.notAuthenticated,
				403 : AUTH_EVENTS.notAuthorized,
				419 : AUTH_EVENTS.sessionTimeout,
				440 : AUTH_EVENTS.sessionTimeout,
				302 : AUTH_EVENTS.sessionTimeout
			}[response.status], response);

			// propagate error to controllers
			return $q.reject(response);
		}
	};
} ]);
