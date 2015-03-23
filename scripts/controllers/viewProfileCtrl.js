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
                $scope.first_name= profile.first_name;
                $scope.last_name= profile.last_name;
                $scope.Email= profile.Email;
                $scope.profileUrl= profile.profileUrl;
                $scope.pictureUrl= profile.pictureUrl;
                $scope.summary= profile.summary;
                $scope.location= profile.location;
                $scope.industry= profile.industry;
                $scope.educations= profile.educations.split(',');
                $scope.skills=profile.skills.split(',');



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


