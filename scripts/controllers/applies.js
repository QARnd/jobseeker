/**
 * Created by happy on 5/24/2015.
 */
angular.module('myApp').controller('appliesCtrl',
    function($scope,providerProfileEntitiesService,providerProfileRequestService,$routeParams, authenticationService) {
        $scope.jobId=$routeParams.jobId;

            var appliesEntity = providerProfileEntitiesService.getApplies($scope.jobId);
            var appliesPromise =providerProfileRequestService.getApplies(appliesEntity);
        console.log($scope.jobId);
        appliesPromise.then(function (d) {

                $scope.applies= d.data;



            }, function (d) {
                swal({
                    title: "Error!",
                    text: "Something went wrong, please try again later",
                    type: "error"
                });
            });




        //$scope.getComments();
    });
