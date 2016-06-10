(function () {
    'use strict';

    angular.module('loginApp')
        .constant('API', 'http://localhost\:8001')
        .factory('UserService', UserService);

    UserService.$inject = ['$http', 'API'];
    function UserService($http, API) {
        //var userEndpointBase = 'https://psdev-yt5t7w6ayhgkm527grvejshb-evals-dev.mbaas1.tom.redhatmobile.com  ' 

        var service = {};

        service.Login = Login;
        service.Logout = Logout;
        service.GetAll = GetAll;
        //service.GetById = GetById;
        service.UpdateUser = UpdateUser;
        service.GetByUsername = GetByUsername;
        service.RegisterUser = RegisterUser;
        service.DeleteUser = DeleteUser;

        return service;

        function GetAll() {
            return $http.get(API + '/users');
        }

        function Login(params) {
            return $http.post(API + '/users/login', params);
        }

        function Logout() {
            return $http.post(API + '/users/logout');
        }
       
        // Not Implemented
        // function GetById(id) {
        //     return $http.get('/users/' + id).then(handleSuccess, handleError('Error getting user by id'));
        // }

        // Not Implemented
        function GetByUsername(username) {
            return $http.get(API +'/users/' + username);
        }

        function RegisterUser(params) {
            return $http.post(API + '/users/register', params);
        }

        function UpdateUser(guid, params) {
            console.log('Firing Update: ' + guid);
            return $http.put(API +'/users/' + guid, params);
        }

        function DeleteUser(id) {
            return $http.delete(API +'/users/' + id);
        }

        // generic functions to handle responses

         // function handleSuccess(response) {
         //     return success(response);
         // }

         // function handleError(error) {
         //     return error(error);
         // }
    }

})();
