'use strict';
//Declare app level module which depends on filters, and services
angular.module('servicesModule',[]);
var app= angular.module('myApp', ['ngRoute','servicesModule']);
app.config(['$routeProvider', function($routeProvider) {
    $routeProvider.when('/addPost', {templateUrl: 'views/addPostView.html', controller: 'addPostCtrl'});
    $routeProvider.when('/addJob', {templateUrl: 'views/addJobView.html', controller: 'addJobCtrl'});
    //$routeProvider.when('/deletePost', {templateUrl: 'views/deletePostView.html', controller: 'deletePostCtrl'});
    $routeProvider.when('/newsfeed', {templateUrl: 'views/newsfeedView.html', controller: 'newsfeedCtrl'});
    $routeProvider.when('/newsfeed/:postId', {templateUrl: 'views/singlePostView.html', controller: 'singlePostCtrl'});


    $routeProvider.when('/login', {templateUrl: 'views/loginView.html', controller: 'loginCtrl'});
    $routeProvider.when('/main', {templateUrl: 'views/mainView.html', controller: 'mainCtrl'});



    $routeProvider.when('', {templateUrl: 'views/newsfeedView.html', controller: 'newsfeedCtrl'});
    $routeProvider.otherwise({redirectTo: '/login'});
}]);

