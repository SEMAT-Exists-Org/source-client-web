'use strict';

    angular.module('loginApp')
    
    .controller('ActivitiesController', ['$scope',
    function ActivitiesController( $scope) {

        
    } ])

    .controller('UpdateUserController', ['$scope', '$modalInstance', 'selectedUser', 'UserService',
        function( $scope, $modalInstance, selectedUser, UserService, AdminController) {
            $scope.updatedUserInfo = selectedUser.fields;
            $scope.updateForm = {};

            $scope.submit = function() {
                $scope.submitted = true;
                if (!$scope.updateForm.$invalid) {
                    if (confirm("Are you sure you would like to update " + selectedUser.fields.firstname + ' ' + selectedUser.fields.lastname + '\'s Profile?')) {
                     console.log('Updating User...:' + selectedUser.guid + ' : ' + $scope.updatedUserInfo.lastname);
                     $scope.updateUserImpl(selectedUser.guid, $scope.updatedUserInfo);
                     $modalInstance.close();
                 }
                } else {
                    $scope.error = true;
                    return;
                }
            };  

            $scope.cancelUpdate = function () {
                $modalInstance.close();
            };

        //Update User Implementation
        $scope.updateUserImpl = function(guid, user){
            user = JSON.stringify(user);
            UserService.UpdateUser(guid, user)
                .then(function(response) {
                    // Succesfully Deleted User
                    console.log('Succefully updated user profile: ' + response.status)
                    console.log(JSON.stringify(response))
 
                }, 
                 function(response) { 
                    // Failed To Delete User
                    console.log('Failed to delete user with reponse: ' + JSON.stringify(response.data))
             });
        };
        
    } ])

    .controller('AdminController', ['$scope', 'Session', 'UserService', '$modal', 
    function($scope, Session, UserService, $modal ) {
        $scope.users = {};
        $scope.selectedUser = {};

        $scope.loadUsers = function () {
            if (Session.userRole == 'admin'){
                UserService.GetAll()
                    .then(function(response) {
                        console.log('Succefully obtained users')

                        $scope.count = response.data.count;
                        $scope.allUsers = response.data.list;

                    }, 
                     function(response) { 
                        // Failed To Get All Users 
                        console.log('Failure: ' + JSON.stringify(response.data))
                        //error();
                 });
            }
        };

        $scope.confirmDeleteUser = function (user) {
            if (confirm("Are you sure you would like to delete " + user.fields.firstname + ' ' + user.fields.lastname + '\'s Profile?')) {
                console.log('Deleting User...');
                $scope.deleteUserImpl(user);
            }
        };

        //Delete User Implementation
        $scope.deleteUserImpl = function(user){
            UserService.DeleteUser(user.guid)
                .then(function(response) {
                    // Succesfully Deleted User
                    console.log('Succefully deleted user profile for: ' + user.fields.firstname + ' ' + user.fields.lastname )
                    console.log(JSON.stringify(response))

                    // Reload Users 
                    $scope.loadUsers(); 
                }, 
                 function(response) { 
                    // Failed To Delete User
                    console.log('Failed to delete user with reponse: ' + JSON.stringify(response.data))
                    //error();
                    console.log('Do something with state?');
             });
        };

        //Open registration form
        $scope.toggleUpdateModal = function(user){
            var modalInstance = $modal.open({
                templateUrl: 'templates/update.html',
                controller: 'UpdateUserController',
                resolve: {
                    selectedUser: function () {
                      return user;
                    }
                  }
            });
        };

        // Setting wrapped in timeout due to race condition when page initially loads... 
        $scope.loadUsers();
        setTimeout(function() {          
            $(document).ready(function() {
                $('#dataTables-adminManagement').DataTable({
                        responsive: true
                });
            });
        }, 50);

    } ])

    .controller('PracticesController', ['MarkdownService', '$scope',
        function(MarkdownService, $scope) {
        getPracticesReadmeContent();

        // TODO: Basic controller needs proper handling of data/errors etc...
        function getPracticesReadmeContent() {
            MarkdownService.GetPracticesReadme().then(function (response) {
                    $scope.practicesMarkdown = response;
                });
        }

    } ])

    .controller('ProjectsController', ['$scope', '$modal',
        function($scope, $modal ) {

        $scope.createNewProject = function() {
            var modalInstance = $modal.open({
              templateUrl: 'templates/new-project.html',
              controller: 'CreateProjectController'
          });
        }

        $scope.cancelRegModal = function () {
            $modalInstance.close();
        };

            $(document).ready(function() {
                $('#dataTables-currentProjects').DataTable({
                        responsive: true
                });
                $('#dataTables-teamProjects').DataTable({
                        responsive: true
                });
            });       
    } ])

    .controller('CreateProjectController', ['$scope', '$modalInstance',
        function($scope, $modalInstance ) {

        $scope.cancelRegModal = function () {
            $modalInstance.close();
        };
   
    } ]);