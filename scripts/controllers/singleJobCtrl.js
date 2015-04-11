/**
 * Created by rana on 3/31/2015.
 */


angular.module('myApp').controller('singleJobCtrl',
    function($scope, jobEntitiesService, jobRequestsService,$routeParams, authenticationService) {

        $scope.p_id= authenticationService.userProfile.provider_id;
        $scope.jobId=$routeParams.jobId;

        alert($scope.jobId);

        $scope.dis = true;
        $scope.toggle = function () {
            $scope.dis = false;
        }

        $scope.update = function () {
            $scope.dis = true;

            var jobEntity = jobEntitiesService.updateJobEntity($scope.jobTitle, $scope.jobDescription,$scope.jobTag, $scope.jobId);

            var jobPromise = jobRequestsService.updateJob(jobEntity);}

        var jobPromise = jobRequestsService.getSingleJob($scope.jobId);


        jobPromise.then(function (d) {
            console.log(d);
            var job= d.data;
            $scope.jobId= job.jobId;
            $scope.jobTitle= job.jobTitle;
            $scope.jobDescription= job.jobDescription;
            $scope.jobTag= job.jobTag;
            $scope.providerId=job.providerId;


        }, function (d) {
            swal({
                title: "Error!",
                text: "Something went wrong, please try again later",
                type: "error"
            });
        });

    });
