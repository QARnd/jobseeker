/**
 * Created by rana on 3/31/2015.
 */


angular.module('myApp').controller('singleJobCtrl',
    function($scope, jobEntitiesService, jobRequestsService,$routeParams, authenticationService) {

        $scope.p_id= authenticationService.userProfile.provider_id;
        $scope.jobId=$routeParams.jobId;

        alert($scope.p_id);

        $scope.dis = true;
        $scope.toggle = function () {
            $scope.dis = false;
        }

        $scope.update = function () {
            $scope.dis = true;

            var jobEntity = jobEntitiesService.updateJobEntity($scope.jobTitle, $scope.JobDescrbtion,$scope.JobTag, $scope.jobId);

            var jobPromise = jobRequestsService.updateJob(jobEntity);}

        var jobPromise = jobRequestsService.getSingleJob($scope.jobId);


        jobPromise.then(function (d) {
            console.log(d);
            var job= d.data;
            $scope.jobId= job.jobId;
            $scope.jobTitle= job.jobTitle;
            $scope.JobDescrbtion= job.JobDescrbtion;
            $scope.JobTag= job.JobTag;
            $scope.provider_id=job.provider_id;


        }, function (d) {
            swal({
                title: "Error!",
                text: "Something went wrong, please try again later",
                type: "error"
            });
        });

    });
