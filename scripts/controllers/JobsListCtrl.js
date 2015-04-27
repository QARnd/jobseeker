/**
 * Created by happy on 4/23/2015.
 */

angular.module('myApp').controller('JobsListCtrl',

    function AppCtrl($scope,addToJobListEntitiesService,authenticationService,addToJobListRequestService) {

        var js_id= authenticationService.userProfile.jobseekerId;

        $scope.getJobsListCtrl=function(){

        var jobListEntity = addToJobListEntitiesService.getJobListEntity(js_id);

            var jobListPromise = addToJobListRequestService.getJobList(jobListEntity);

            jobListPromise.then(function (d) {
                console.log(d.data);
                $scope.jobList= d.data;

            }, function (d) {
                swal({
                    title: "Error!",
                    text: "Something went wrong, please try again later",
                    type: "error",
                    timer: 2000
                });
            });

        }



    });

