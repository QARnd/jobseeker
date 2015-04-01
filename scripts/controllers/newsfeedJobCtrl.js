/**
 * Created by rana on 4/1/2015.
 */


angular.module('myApp').controller('newsfeedJobCtrl',
    function($scope, jobEntitiesService, jobRequestsService, authenticationService) {
        console.log(authenticationService.userProfile.data);

        $scope.p_id= authenticationService.userProfile.provider_id;



        $scope.getNewsFeed=function(){
            $scope.jobs=[
                {jobTitle:"ttttt"},
                {jobTitle:"yyyyy"},
                {jobTitle:"bbb"},
                {jobTitle:"zzzz"},
                {jobTitle:"aa"},

            ];

            var jobPromise = jobRequestsService.getAllJobs();

            jobPromise.then(function (d) {
                console.log(d);
                $scope.jobs= d.data;



            }, function (d) {
                swal({
                    title: "Error!",
                    text: "Something went wrong, please try again later",
                    type: "error"
                });
            });

        }


        $scope.getNewsFeed();




        $scope.deleteJob=function(jobId){
            var jobPromise = jobRequestsService.deleteJob(jobId);

            jobPromise.then(function (d) {
                console.log(d);
                swal({
                    title: "SUCCESS",
                    text: "Delete Done Successfully",
                    type: "success"
                });
                $scope.getNewsFeed();

            }, function (d) {
                swal({
                    title: "Error!",
                    text: "Something went wrong, please try again later",
                    type: "error"
                });
            });
        }

    });