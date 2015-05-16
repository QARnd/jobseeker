/**
 * Created by rana on 5/15/2015.
 */


angular.module('myApp').controller('viewProfileProviderCtrl',
    function($scope,$routeParams, providerProfileEntitiesService, providerProfileRequestService, authenticationService) {

        $scope.myId=authenticationService.userProfile.user_id;
        //alert( $scope.myId);

        $scope.pId=$routeParams.jobProvider;
        //alert( $scope.pId);
        var profileEntity = providerProfileEntitiesService.profileProviderEntity($scope.pId);

        var profilePromise = providerProfileRequestService.viewProviderProfile(profileEntity);

        profilePromise.then(function (d) {

            console.log(d);
            var profile= d.data;
            $scope.jobprovider_id= profile.jobprovider_id;
            $scope.Name= profile.Name;
            $scope.Email= profile.Email;
            $scope.description= profile.description;
            $scope.location= profile.location;

        }, function (d) {
            swal({
                title: "Error!",
                text: "Something went wrong, please try again later",
                type: "error",
                timer: 2000
            });
        });










        //$scope.myVar = true;
        //$scope.toggle = function() {
        //    $scope.myVar = !$scope.myVar;
        //}
        //$scope.checkUser = function(fromId) {
        //    var jobprovider_id= authenticationService.userProfile.provider_id;
        //    console.log(fromId);
        //    console.log(jobprovider_id);
        //    if ( fromId==jobprovider_id ){
        //        return true;
        //    }
        //    else {
        //        return false;}
        //
        //};
        //



    });


