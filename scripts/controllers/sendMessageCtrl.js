
angular.module('myApp').controller('sendMessageCtrl',
    function($scope, entitiesService, messageRequestService, authenticationService) {

        $scope.sendMessage = function () {
            var from_id= authenticationService.userProfile.jobseekerId;
            console.log($.toJSON(from_id));
            var messageEntity = entitiesService.messageEntity($scope.content,$scope.to_id,from_id);

            var messagePromise = messageRequestService.sendMessage(messageEntity);

            messagePromise.then(function (d) {
                console.log(d.data);
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

