

angular.module('myApp').controller('sendMessageCtrl',
    function($scope, entitiesService, messageRequestsService, authenticationService) {

        $scope.sendMessage = function () {
           var id= authenticationService.userProfile.data.id;
            var messageEntity = entitiesService.messageEntity($scope.title,$scope.body,$scope.toId,id);

            var messagePromise = messageRequestsService.sendMessage(messageEntity);

            messagePromise.then(function (d) {
                swal({

                    title: "Success!",
                    text: "Your message Has been sent! With name:",
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

