/**
 * Created by GeniuCode Pointer on 3/5/2015.
 */
angular.module('myApp')
    .controller('mainCtrl', function ($scope,linkedinService) {
        $scope.userprofile=linkedinService.getProfileData;


    });