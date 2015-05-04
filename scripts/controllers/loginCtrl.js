/**
 * Created by GeniuCode Pointer on 3/5/2015.
 */
angular.module('myApp')
    .controller('loginCtrl', function ($scope,providerEntitiesService,providerRequestService) {
        /*
         if($scope.userProfile.data.loggedIn==true){
         $location.path("/newsFeed");
         }*/


        $scope.showModal = false;
        $scope.toggle = function(){
            $scope.showModal = !$scope.showModal;

        };
        $scope.sendMessageForP = function() {

            var sendMessageForPEntity = providerEntitiesService.sendMessageForPEntity($scope.email,$scope.content);

            var providerPromise = providerRequestService.sendMessageForP(sendMessageForPEntity);

            providerPromise.then(function (d) {
                var provider = d.data;
            }, function (d) {
                swal({
                    title: "Error!",
                    text: "Something went wrong, please try again later",
                    type: "error",
                    timer: 2000
                });
            });

            };

        $scope.showModalAccount = false;
        $scope.toggleAccount = function(){
            $scope.showModalAccount = !$scope.showModalAccount;

        };
    });
