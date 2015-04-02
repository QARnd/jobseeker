
angular.module('myApp').controller('addJobCtrl',
    function($scope, entitiesService, jobRequestsService, authenticationService) {

        $scope.addJob = function () {


            var jobEntity = entitiesService.jobEntity($scope.jobTitle,$scope.jobDescrbtion,$scope.tags);
            alert($scope.jobTitle);

            var jobPromise = jobRequestsService.addJob(jobEntity);

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
