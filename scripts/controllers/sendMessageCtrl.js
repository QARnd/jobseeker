
angular.module('myApp').controller('sendMessageCtrl',
    function($scope, entitiesService, messageRequestService, authenticationService) {

        $scope.sendMessage = function () {
           var jobseeker_id= authenticationService.userProfile.jobseekerId;
            var messageEntity = entitiesService.messageEntity($scope.content,$scope.to_id,jobseeker_id);

            var messagePromise = messageRequestService.sendMessage(messageEntity);

            messagePromise.then(function (d) {
                swal({


                    title: "Success!",
                    text: "Your message Has been sent! With name:"+d.data,
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

