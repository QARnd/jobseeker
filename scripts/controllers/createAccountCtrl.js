/**
 * Created by happy on 4/8/2015.
 */

angular.module('myApp').controller('createAccountCtrl',
    function($scope,providerEntitiesService,providerRequestService,authenticationService) {
        $('#CreateAccount').hide();
        $scope.createAccount= function () {
            alert($scope.name);
            var accountEntity = providerEntitiesService.createAccountEntity($scope.name,$scope.email,$scope.description,$scope.location);

            var createAccountPromise = providerRequestService.createAccount(accountEntity);

            createAccountPromise.then(function (d) {
                swal({
                    title: "Success!",
                    text: "Company Has been Added! With Name:"+d.data,
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
        $scope.showCreateAccount=function(){
            $('#CreateAccount').toggle('slow');
        }
    });
