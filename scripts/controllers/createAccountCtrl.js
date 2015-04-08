/**
 * Created by happy on 4/8/2015.
 */

angular.module('myApp').controller('createAccountCtrl',
    function($scope, entitiesService, accountRequestsService, authenticationService) {

        $scope.createAccount= function () {
            alert($scope.name);
            var accountEntity = entitiesService.createAccountEntity($scope.name,$scope.email,$scope.description,$scope.location);

            var createAccountPromise = accountRequestsService.createAccount(accountEntity);

            createAccountPromise.then(function (d) {
                swal({
                    title: "Success!",
                    text: "Your Post Has been Published! With Title:"+d.data,
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
