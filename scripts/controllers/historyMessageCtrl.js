
angular.module('myApp').controller('historyMessageCtrl',
    function($rootScope, $scope, msgsRequestService, msgsEntitiesService, authenticationService) {

       var js_id= authenticationService.userProfile.jobseekerId;

        $scope.historyMessage = function () {
            $scope.MsgsHistory=[

            ];

            var AllMsgsEntity = msgsEntitiesService.allMsgsEntity(js_id);
            var AllMsgsPromise = msgsRequestService.getAllMessage(AllMsgsEntity);

            msgsPromise.then(function (d) {
                console.log(d);


                $scope.MsgsHistory=d.data;



                console.log(d);
                alert($scope.content);
            });
        };

    });

