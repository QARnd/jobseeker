
angular.module('myApp')
    .controller('mainCtrl', function ($scope,linkedinService) {
        $scope.userprofile=linkedinService.getProfileData;


    });