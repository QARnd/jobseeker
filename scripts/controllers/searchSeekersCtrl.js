
angular.module('myApp').controller('searchSeekersCtrl',
    function($scope, searchEntitiesService,$routeParams,$routeProvider,searchRequestService, authenticationService) {
    //    $scope.names = ["john", "bill", "charlie", "robert", "alban", "oscar", "marie", "celine", "brad", "drew", "rebecca", "michel", "francis", "jean", "paul", "pierre", "nicolas", "alfred", "gerard", "louis", "albert", "edouard", "benoit", "guillaume", "nicolas", "joseph"];
    //
    //    function DefaultCtrl($scope) {
    //        $scope.names = ["john", "bill", "charlie", "robert", "alban", "oscar", "marie", "celine", "brad", "drew", "rebecca", "michel", "francis", "jean", "paul", "pierre", "nicolas", "alfred", "gerard", "louis", "albert", "edouard", "benoit", "guillaume", "nicolas", "joseph"];
    //    }
    //});
//angular.module('myApp', []).directive('autoComplete', function($timeout) {
//    return function(scope, iElement, iAttrs) {
//        iElement.autocomplete({
//            source: scope[iAttrs.uiItems],
//            select: function() {
//                $timeout(function() {
//                    iElement.trigger('input');
//                }, 0);
//            }
//        });
//    };



        //$scope.search=$routeParams.search;

        $scope.searchForSeekersByName=function(search) {

            var searchEntity = searchEntitiesService.searchEntity(search);

            var searchPromise = searchRequestService.searchEntity(searchEntity);

            searchPromise.then(function (d) {

                console.log(d);
                $scope.result = d.data;


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