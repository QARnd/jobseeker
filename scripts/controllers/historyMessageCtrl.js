
angular.module('myApp').controller('historyMessageCtrl',
    function( $scope, msgsRequestService, msgsEntitiesService, authenticationService) {

        $scope.js_id= authenticationService.userProfile.jobseekerId;

            var AllMsgsEntity = msgsEntitiesService.allMsgsEntity($scope.js_id);
            var AllMsgsPromise = msgsRequestService.getAllMessage(AllMsgsEntity);

            AllMsgsPromise.then(function (d) {
                console.log(d);
                $scope.MsgsHistory=d.data;
                    alert(d.data)


            },
                function (d) {
                    swal({
                        title: "Error!",
                        text: "Something went wrong, please try again later",
                        type: "error"
                    });
                });


    });