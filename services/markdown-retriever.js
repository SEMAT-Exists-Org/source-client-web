﻿(function () {
    'use strict';

    angular
        .module('loginApp')
        .factory('MarkdownService', MarkdownService);

    MarkdownService.$inject = ['$http'];
    function MarkdownService($http) {
        console.log('Markdown Service Online')
        var service = {};

        service.GetActivitiesReadme = GetActivitiesReadme;
        service.GetPracticesReadme = GetPracticesReadme;
        service.GetAll = GetAll;
        service.GetById = GetById;
        service.GetByUsername = GetByUsername;
        service.Create = Create;
        service.Update = Update;
        service.Delete = Delete;

        return service;

        function GetActivitiesReadme() {
            return $http.get('https://rawgit.com/SEMAT-Exists-Org/content-activities/master/README.md').then(handleSuccess, handleError('Error getting Activities Readme'));
        }

        function GetPracticesReadme() {
            console.log('retrieving practices data')
            return $http.get('https://rawgit.com/SEMAT-Exists-Org/content-practices/master/README.md').then(handleSuccess, handleError('Error getting Practices Readme'));
        }

        function GetAll() {
            return $http.get('/api/users').then(handleSuccess, handleError('Error getting all users'));
        }

        function GetById(id) {
            return $http.get('/api/users/' + id).then(handleSuccess, handleError('Error getting user by id'));
        }

        function GetByUsername(username) {
            return $http.get('/api/users/' + username).then(handleSuccess, handleError('Error getting user by username'));
        }

        function Create(user) {
            return $http.post('/api/users', user).then(handleSuccess, handleError('Error creating user'));
        }

        function Update(user) {
            return $http.put('/api/users/' + user.id, user).then(handleSuccess, handleError('Error updating user'));
        }

        function Delete(id) {
            return $http.delete('/api/users/' + id).then(handleSuccess, handleError('Error deleting user'));
        }

        // private functions

        function handleSuccess(res) {
            return res.data;
        }

        function handleError(error) {
            return function () {
                return { success: false, message: error };
            };
        }
    }

})();
