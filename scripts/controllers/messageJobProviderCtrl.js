
angular.module('myApp').controller('messageJobProviderCtrl',
    function( $scope, entitiesService, messageRequestsService) {


        $scope.addMessageJobProvider = function () {

            var addMessageJobProviderEntity = entitiesService.addMessageJobProviderEntity($scope.emailSend,$scope.content);

            var addMessageJobProviderPromise = messageRequestsService.addMessageJobProvider(addMessageJobProviderEntity);


           messagePromise.then(function (d) {
                var  message= d.data;

                swal({
                    title: "Success!",
                    text: "Your message Has been Published! With Title:"+d.data,
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

