
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



        $scope.search=$routeParams.search;


        var searchEntity = searchEntitiesService.searchEntity($scope.search);

        var searchPromise = searchRequestService.searchEntity(searchEntity);

        searchPromise.then(function (d) {

            console.log(d);
            var result= d.data;
            $scope.jobSeekerId= result.jobSeekerId;
            $scope.first_name= result.first_name;
            $scope.last_name= result.last_name;
            $scope.Email= result.Email;
            $scope.profileUrl= result.profileUrl;
            $scope.pictureUrl= result.pictureUrl;
            $scope.summary= result.summary;
            $scope.location= result.location;
            $scope.industry= result.industry;
            $scope.educations= result.educations;
            $scope.skills=result.skills;

        }, function (d) {
            swal({
                title: "Error!",
                text: "Something went wrong, please try again later",
                type: "error",
                timer: 2000
            });
        });


    });