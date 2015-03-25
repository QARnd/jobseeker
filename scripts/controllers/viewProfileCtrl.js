/**
 * Created by rana on 3/17/2015.
 */




angular.module('myApp').controller('viewProfileCtrl',
    function($scope, entitiesService, profileRequestService, authenticationService) {

        $scope.viewProfile = function () {


            var profileEntity = entitiesService.profileEntity($scope.jobSeekerId);

            var profilePromise = profileRequestService.viewProfile(profileEntity);

            profilePromise.then(function (d) {

                console.log(d);
                var profile= d.data;
                $scope.jobSeekerId= profile.jobSeekerId;


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


