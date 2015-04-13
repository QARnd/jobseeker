
angular.module('myApp').controller('searchSeekersCtrl',
    function($scope,$rootScope, searchEntitiesService,searchRequestService, authenticationService) {


        $scope.searchForSeekersByName=function(search) {

            var searchEntity = searchEntitiesService.searchEntity(search);

            var searchPromise = searchRequestService.searchEntity(searchEntity);

            searchPromise.then(function (d) {

                console.log(d.data);
                $rootScope.searchedSeekers = d.data;

            }, function (d) {
                swal({
                    title: "Error!",
                    text: "Something went wrong, please try again later",
                    type: "error",
                    timer: 2000
                });
            });
        }


    });