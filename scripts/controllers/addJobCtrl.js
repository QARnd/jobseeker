/**
 * Created by happy on 3/9/2015.
 */
angular.module('myApp').controller('addJobCtrl',
    function($scope, entitiesService, postRequestsService, authenticationService) {

        $scope.addJob = function () {
            var jobEntity = entitiesService.JobEntity($scope.title,$scope.Body,$scope.tags);

            var jobPromise = postRequestsService.addJob(jobEntity);

           jobPromise.then(function (d) {
                swal({
                    title: "Success!",
                    text: "Your job Has been added! With name:"+d.data,
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
