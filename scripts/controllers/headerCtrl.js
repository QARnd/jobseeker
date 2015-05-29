angular.module('myApp')
    .controller('headerCtrl', function ($scope,authenticationService,initially) {
        //  $scope.userProfile=authenticationService.userProfile;



        $scope.navPagesList = [
            { filterId: 1, name: 'Posts NewsFeed',target: 'newsfeed',show:'0'},
            { filterId: 2, name: 'Jobs NewsFeed',target: 'newsfeedJob',show:'0'},
            //   { filterId: 2, name: 'add Allowed User',target: 'addAllowedUser',show:'2' },
            //{ filterId: 3, name: 'Add Job',target: 'addJob',show:'0'},
            //{ filterId: 4, name: 'Add Post',target: 'addPost',show:'0' },
            //{ filterId: 5, name: 'Create Account',target: 'createAccount',show:'0' },
            //{ filterId: 6, name: 'view Profile',target: 'viewProfile',show:'0' },
            //    { filterId: 5, name: 'My Job List',target: 'myJobList',show:'1'},
            //   { filterId: 6, name: 'notification',target: 'notification',show:'1'}
        ];
        $scope.selectedIndex = 0;
        $scope.select= function(i) {
            $scope.selectedIndex=i;
        };
        $scope.searchOptions = [
            {option:'job'},
            {option:'post'},
        ];



    });

