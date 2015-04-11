/**
 * Created by rana on 3/31/2015.
 */


angular.module('myApp').controller('singleJobCtrl',
    function($scope, jobEntitiesService, jobRequestsService,$routeParams, authenticationService) {

        //hide the edit div
        $('#editJob').hide();
        $scope.jp_id= authenticationService.userProfile.provider_id;
        $scope.jobId=$routeParams.jobId;

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


        //$scope.dis = true;
        $scope.toggle = function () {
            if($scope.dis)
                $('#editJob').show();
            else
                $('#editJob').hide();
            $scope.dis=!$scope.dis;
        }

        $scope.update = function () {
            $scope.dis = true;
            $('#editJob').hide();

            var jobEntity = jobEntitiesService.updateJobEntity($scope.jobTitle, $scope.jobDescription,$scope.jobtag, $scope.jobId);

            var jobPromise = jobRequestsService.updateJob(jobEntity);
        }

    });
