
angular.module('myApp').controller('searchSeekersCtrl',
    function($scope,$rootScope, searchEntitiesService,searchRequestService, authenticationService) {


        var autoCompletePromise = searchRequestService.autoComplete();

        autoCompletePromise.then(function (d) {

                console.log(d.data);
                $rootScope.autoComplete = d.data;

            $scope.fullName=[];
            //alert($rootScope.autoComplete.length);
            for(var i= 0; i<$rootScope.autoComplete.length;i++){
                //alert($rootScope.autoComplete[i].first_name);
                //$scope.fullName[i]=$rootScope.autoComplete[i].first_name+" "+$rootScope.autoComplete[i].last_name;

            }


            //alert( $scope.fullName);



        })

        $scope.searchForSeekersByName=function(search) {

            var searchEntity = searchEntitiesService.searchEntity(search);

            var searchPromise = searchRequestService.searchEntity(searchEntity);

            searchPromise.then(function (d) {

                console.log(d.data);
                $scope.searchedSeekers = d.data;

            }, function (d) {
                swal({
                    title: "Error!",
                    text: "Something went wrong, please try again later",
                    type: "error",
                    timer: 2000
                });
            });

            var providerSearchEntity = searchEntitiesService.providerSearchEntity(search);
            var providerSearchPromise = searchRequestService.ProSearchEntity(providerSearchEntity);

            providerSearchPromise.then(function (d) {

                console.log(d.data);
                $scope.searchedProvider = d.data;


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