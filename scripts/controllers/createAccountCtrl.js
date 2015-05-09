/**
 * Created by happy on 4/8/2015.
 */

angular.module('myApp').controller('createAccountCtrl',
    function($scope,$rootScope,providerEntitiesService,providerRequestService,authenticationService) {
        $('#CreateAccount').hide();
        $scope.createAccount= function () {
            var accountEntity = providerEntitiesService.createAccountEntity($scope.name,$scope.email,$scope.description,$scope.location);

            var createAccountPromise = providerRequestService.createAccount(accountEntity);

            createAccountPromise.then(function (d) {
                swal({
                    title: "Success!",
                    text: "Company Has been Added!",
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

        $scope.last_acc;
        $scope.showCreateAccount=function(messageProId){
            //$('#'+messageProId).html($('#CreateAccount'));
            $scope.last_acc=messageProId;
            $('#'+messageProId).html( $('.CreateAccount') );
            $('.CreateAccount').show();
        }
        $scope.cancelAccount=function(){
            //$('#'+messageProId).html($('#CreateAccount'));

            $('.CreateAccount').hide();
        }


        $scope.deleteErrorCompany= function (messageProId) {
            swal({
                    title: "Are you sure?",
                    text: "Delete!",
                    type: "warning",
                    showCancelButton: true,
                    confirmButtonColor: "#DD6B55",
                    confirmButtonText: "Yes, delete!",
                    closeOnConfirm: true },
                function() {

                    for (var i = 0; i < $rootScope.providerMessages.length; i++) {
                        if ($rootScope.providerMessages[i].messageProId == messageProId) {
                            $rootScope.providerMessages.splice(i, 1);
                            break;
                        }
                    }


                    var deleteMessageEntity = providerEntitiesService.deleteMessageEntity(messageProId);

                    var deleteMessagePromise = providerRequestService.deleteMessage(deleteMessageEntity);




                    deleteMessagePromise.then(function (d) {
                        swal({
                            title: "Success!",
                            text: "Company Has been Added!",
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
                }
            );
        };
    });
