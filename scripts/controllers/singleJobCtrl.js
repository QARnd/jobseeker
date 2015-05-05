/**
 * Created by rana on 3/31/2015.
 */


angular.module('myApp').controller('singleJobCtrl',
    function($scope, jobEntitiesService, jobRequestsService,$routeParams, authenticationService) {
        $('#addNewEvent').hide();
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
            $scope.publishDate=job.publishDate;


        }, function (d) {
            swal({
                title: "Error!",
                text: "Something went wrong, please try again later",
                type: "error"
            });
        });

        //alert($scope.jobId);

        //$scope.dis = true;
        //$scope.toggle = function () {
        //    $scope.dis = false;

        $scope.applyForJob = function (jobId,providerId) {
            var jobseeker_id=authenticationService.userProfile.jobseekerId;

            var applyForJobEntity = jobEntitiesService.applyForJobEntity(jobId,providerId,jobseeker_id);

            var applyForJobPromise = jobRequestsService.applyForJob(applyForJobEntity);
        }


        $scope.toggle = function () {
            if($scope.dis)
                $('#editPost').show();
            else
                $('#editPost').hide();
            $scope.dis=!$scope.dis;
        }

        $scope.update = function () {
            $scope.dis = true;
            $('#editPost').hide();

            var jobEntity = jobEntitiesService.updateJobEntity($scope.jobTitle, $scope.jobDescription,$scope.jobTag, $scope.jobId);

            var jobPromise = jobRequestsService.updateJob(jobEntity);
        }






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

        $scope.showAddEvent=function(){
            $('#addNewEvent').toggle('slow');
        }

    });
