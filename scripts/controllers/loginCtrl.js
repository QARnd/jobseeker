/**
 * Created by GeniuCode Pointer on 3/5/2015.
 */
angular.module('myApp')
    .controller('loginCtrl', function ($scope) {
        /*
         if($scope.userProfile.data.loggedIn==true){
         $location.path("/newsFeed");
         }*/


        $scope.showModal = false;
        $scope.toggle = function(){
            $scope.showModal = !$scope.showModal;

        };


        $scope.showModalAccount = false;
        $scope.toggleAccount = function(){
            $scope.showModalAccount = !$scope.showModalAccount;

        };
    });


