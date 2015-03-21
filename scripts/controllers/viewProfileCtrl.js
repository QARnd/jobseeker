/**
 * Created by rana on 3/17/2015.
 */



angular.module('myApp').controller('viewProfileCtrl',
    function($scope, entitiesService, profileRequestsService, authenticationService) {

        $scope.viewProfile = function () {


            var profileEntity = entitiesService.profileEntity($scope.jobSeekerId);

            var profilePromise = profileRequestsService.viewProfile(profileEntity);

            profilePromise.then(function (d) {
                swal({

                    title: "Success!",
                    text: "You can see the profile",
                    type: "success",
                    timer: 5000
                });

            }, function (d) {
                swal({
                    title: "Error!",
                    text: "Something went wrong, please try again later",
                    type: "error",
                    timer: 2000
                });
            });
        };

    });

