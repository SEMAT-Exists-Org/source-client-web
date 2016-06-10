angular.module('loginApp').config(['$stateProvider', '$urlRouterProvider', '$httpProvider', 'USER_ROLES',
function($stateProvider, $urlRouterProvider, $httpProvider, USER_ROLES) {

  // For any unmatched url, redirect to /
  $urlRouterProvider.otherwise("/");

  // HTTP Interceptor for all requests
  $httpProvider.interceptors.push('APIInterceptor');
  
  // Now set up the states
  $stateProvider
  	.state('home', {
      url: "/",
      templateUrl: "templates/home.html",
      data: {
          authorizedRoles: [USER_ROLES.admin, USER_ROLES.editor, USER_ROLES.user]
      }
    })
    .state('techniques', {
      url: "/techniques",
      templateUrl: "templates/techniques.html",
    data: {
          authorizedRoles: [USER_ROLES.admin, USER_ROLES.editor, USER_ROLES.user]
      }
    })
    .state('activities', {
      url: "/activities",
      templateUrl: "templates/activities.html",
      controller : "ActivitiesController",
    data: {
          authorizedRoles: [USER_ROLES.admin, USER_ROLES.editor, USER_ROLES.user]
      }
    })
    .state('practices', {
      url: "/practices",
      templateUrl: "templates/practices.html",
      controller : "PracticesController",
    data: {
          authorizedRoles: [USER_ROLES.admin, USER_ROLES.editor, USER_ROLES.user]
      }
    })
    .state('newProject', {
      url: "/new-project",
      templateUrl: "templates/new-project.html",
    data: {
          authorizedRoles: [USER_ROLES.admin, USER_ROLES.editor, USER_ROLES.user]
      }
    })
    .state('blank', {
      url: "/blank",
      templateUrl: "templates/blank.html",
    data: {
          authorizedRoles: [USER_ROLES.admin, USER_ROLES.editor, USER_ROLES.user]
      }     
    }) 
    .state('projects', {
      url: "/projects",
      templateUrl: "templates/projects.html",
      controller : "ProjectsController",
      data: {
          authorizedRoles: [USER_ROLES.admin, USER_ROLES.editor, USER_ROLES.user]
      }
    })
    .state('team-projects', {
      url: "/projects",
      templateUrl: "templates/projects.html",
      data: {
          authorizedRoles: [USER_ROLES.admin, USER_ROLES.editor, USER_ROLES.user]
      }
    })    
    .state('admin', {
        url: "/admin",
        templateUrl: "templates/admin.html",
        controller: "AdminController",
  	  data: {
            authorizedRoles: [USER_ROLES.admin]
        }
      })
    .state('project', {
        url: "/project",
        templateUrl: "templates/project.html",
      data: {
            authorizedRoles: [USER_ROLES.admin, USER_ROLES.editor, USER_ROLES.user]
        }
      })
    .state('editor', {
        url: "/editor",
        templateUrl: "templates/editor.html",
      data: {
            authorizedRoles: [USER_ROLES.admin, USER_ROLES.editor]
        }
      })
  
}]);