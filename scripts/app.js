'use strict';
//Declare app level module which depends on filters, and services
angular.module('servicesModule',[]);
var app= angular.module('myApp', ['ngRoute','servicesModule','ngTagsInput']);
app.config(['$routeProvider', function($routeProvider) {
    $routeProvider.when('/addPost', {templateUrl: 'views/addPostView.html', controller: 'addPostCtrl'});
    $routeProvider.when('/addJob', {templateUrl: 'views/addJobView.html', controller: 'addJobCtrl'});
    $routeProvider.when('/deleteDelete', {templateUrl: 'views/deleteJobView.html', controller: 'deleteJobCtrl'});
    //$routeProvider.when('/deletePost', {templateUrl: 'views/deletePostView.html', controller: 'deletePostCtrl'});
    $routeProvider.when('/newsfeed', {templateUrl: 'views/newsfeedView.html', controller: 'newsfeedCtrl'});

    $routeProvider.when('/newsfeedJob', {templateUrl: 'views/newsfeedJobView.html', controller: 'newsfeedJobCtrl'});

    $routeProvider.when('/newsfeed/:postId', {templateUrl: 'views/singlePostView.html', controller: 'singlePostCtrl'});
    $routeProvider.when('/newsfeedJob/:jobId', {templateUrl: 'views/singleJobView.html', controller: 'singleJobCtrl'});

    $routeProvider.when('/sendMessage', {templateUrl: 'views/sendMessageView.html', controller: 'sendMessageCtrl'});

    $routeProvider.when('/login', {templateUrl: 'views/loginView.html', controller: 'loginCtrl'});
    $routeProvider.when('/main', {templateUrl: 'views/mainView.html', controller: 'mainCtrl'});

    $routeProvider.when('/viewProfile', {templateUrl: 'views/viewProfileView.html', controller: 'viewProfileCtrl'});

    $routeProvider.when('/jobseekers', {templateUrl: 'views/searchPageView.html', controller: 'searchSeekersCtrl'});

    $routeProvider.when('/jobseekers/:id', {templateUrl: 'views/viewProfileView.html', controller: 'viewProfileCtrl'});




    $routeProvider.when('', {templateUrl: 'views/newsfeedView.html', controller: 'newsfeedCtrl'});

    $routeProvider.otherwise({redirectTo: '/newsfeed'});
}]);

