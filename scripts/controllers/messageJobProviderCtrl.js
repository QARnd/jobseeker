/**
 * Created by happy on 4/8/2015.
 */

angular.module('myApp').controller('messageJobProviderCtrl',
    function($scope,providerEntitiesService,providerRequestService,authenticationService) {

        $scope.getMessages= function () {

            var MessagesPromise = providerRequestService.getAllMessages();

            MessagesPromise.then(function (d) {
                    console.log(d);
                    $scope.Messages= d.data;
                }, function (d) {
                    swal({
                        title: "Error!",
                        text: "Something went wrong, please try again later",
                        type: "error"
                    });
                });

            };



    });
