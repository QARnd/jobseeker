
/**
 * Created by happy on 3/14/2015.
 */

angular.module('myApp').controller('sendMessageCtrl',
    function($scope, entitiesService, postRequestsService, authenticationService) {

        $scope.sendMessage = function () {


            var messageEntity = entitiesService.messageEntity($scope.title,$scope.body,$scope.toId);

            var messagePromise = postRequestsService.addJob(messageEntity);

            messagePromise.then(function (d) {
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

