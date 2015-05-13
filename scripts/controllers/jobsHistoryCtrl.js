
angular.module('myApp').controller('jobsHistoryCtrl',
    function($rootScope, $scope, msgsRequestService, msgsEntitiesService, authenticationService) {

        var js_id= authenticationService.userProfile.jobseekerId;

        $scope.historyMessage = function () {
            $scope.jobsHistory=[
            ];

            var jobsHistoryEntity = notificationEntitiesService.jobsHistoryEntity(js_id);
            var jobsHistoryPromise = notificationRequestService.getjobsHistory(jobsHistoryEntity);


            jobsHistoryPromise.then(function (d) {
                console.log(d);
                $scope.jobsHistory=d.data;
                console.log(d);

            });
        };

    });


