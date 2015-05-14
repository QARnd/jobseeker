
angular.module('myApp').controller('jobsHistoryCtrl',
    function( $scope, notificationEntitiesService, notificationRequestService, authenticationService) {

        $scope.js_id= authenticationService.userProfile.jobseekerId;

            var jobsHistoryEntity = notificationEntitiesService.jobsHistoryEntity($scope.js_id);
            var jobsHistoryPromise = notificationRequestService.getjobsHistory(jobsHistoryEntity);


            jobsHistoryPromise.then(function (d) {
                console.log(d);
                $scope.jobsHistory=d.data;
              alert(d.data);
            },
                function (d) {
                    swal({
                        title: "Error!",
                        text: "Something went wrong, please try again later",
                        type: "error"
                    });
                });

    });


