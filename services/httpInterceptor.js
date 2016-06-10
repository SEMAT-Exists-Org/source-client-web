'use strict';
angular.module('loginApp')
.factory('APIInterceptor', ['$rootScope', '$q', 'Session', function($rootScope, $q, Session) {  
    var sessionInjector = {
        
        request: function(config) {
        	// Attaches JWT token to each request if it exists
            if (!!Session) {
                 config.headers['token'] = Session.token;
            }
            return config;
        }
    };
    return sessionInjector;
}]);