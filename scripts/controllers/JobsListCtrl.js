/**
 * Created by happy on 4/23/2015.
 */
/**
 * Created by happy on 4/23/2015.
 */
angular.module('myApp').controller('JobsListCtrl',

    function AppCtrl($scope,addToJobListEntitiesService,authenticationService,addToJobListRequestService, $location, $rootScope, $http) {
        $scope.getJobsListCtrl=function()

        {var jobListEntity = addToJobListEntitiesService.getJobListEntity($scope.js_id);

            var jobListPromise = addToJobListRequestService.getJobList(jobListEntity);

            jobListPromise.then(function (d) {
                var jobList= d.data;

            }, function (d) {
                swal({
                    title: "Error!",
                    text: "Something went wrong, please try again later",
                    type: "error",
                    timer: 2000
                });
            });

        }
        $scope.js_id= authenticationService.userProfile.jobseekerId;



    });

