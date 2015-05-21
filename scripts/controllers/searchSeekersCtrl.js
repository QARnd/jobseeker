
angular.module('myApp').controller('searchSeekersCtrl',
    function($scope,$rootScope, searchEntitiesService,searchRequestService, authenticationService) {


        //var autoCompletePromise = searchRequestService.autoComplete();
        //
        //autoCompletePromise.then(function (d) {
        //
        //        //console.log(d.data.jobseeker_id);
        //        $rootScope.autoComplete = d.data;
        //
        //    $scope.fullName=[];
        //    //alert($rootScope.autoComplete.length);
        //    for(var i= 0; i<$rootScope.autoComplete.length;i++){
        //        //alert($rootScope.autoComplete[i].first_name);
        //        //$scope.fullName[i]=$rootScope.autoComplete[i].first_name+" "+$rootScope.autoComplete[i].last_name;
        //
        //    }


            //alert( $scope.fullName);



        //});

        $scope.searchForSeekersByName=function(search) {
         var user_type = authenticationService.userProfile.user_type;
            //if(user_type==2){
            var searchEntity = searchEntitiesService.searchEntity(search);

            var searchPromise = searchRequestService.searchEntity(searchEntity);

            searchPromise.then(function (d) {


               //var user=d.data;
               // console.log(user.jobseeker_id);
               // if(d.data.jobprovider_id < 1000001){
                var result= d.data;
                console.log(result);
                $rootScope.searchedSeekers = result.total1;
                $rootScope.searchedProviders = result.total2;
               // }else{$scope.searchedProvider = d.data;}

            }, function (d) {
                swal({
                    title: "Error!",
                    text: "Something went wrong, please try again later",
                    type: "error",
                    timer: 2000
                });
            });
//}else{
            //var providerSearchEntity = searchEntitiesService.providerSearchEntity(search);
            //var providerSearchPromise = searchRequestService.ProSearchEntity(providerSearchEntity);
            //
            //providerSearchPromise.then(function (d) {
            //
            //    console.log(d.data);
            //    $scope.searchedProvider = d.data;
            //
            //
            //
            //}, function (d) {
            //    swal({
            //        title: "Error!",
            //        text: "Something went wrong, please try again later",
            //        type: "error",
            //        timer: 2000
            //    });
            //});
        //}
         }

        });