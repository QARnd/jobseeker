/**
 * Created by GeniuCode Pointer on 3/5/2015.
 */
angular.module('myApp')
    .controller('loginCtrl', function ($scope,providerEntitiesService,authenticationService,$location,providerRequestService) {
        /*
         if($scope.userProfile.data.loggedIn==true){
         $location.path("/newsFeed");
         }*/


        $scope.showModal = false;
        $scope.toggle = function(){
            $scope.showModal = !$scope.showModal;

        },
            $scope.loginProvider = function(EmailP,passwordP) {

                var loginProviderEntity = providerEntitiesService.loginProviderEntity(EmailP,passwordP);

                var loginProviderPromise = providerRequestService.loginProvider(loginProviderEntity);

                loginProviderPromise.then(function (d) {

                    if(d.data!="err")
                    {
                        authenticationService.userProfile.provider_id=d.data.jobprovider_id;
                        authenticationService.userProfile.data= d.data;
                        authenticationService.userLoggedIn.status=true;
                        $location.path("/newsfeedJob");

                    }

                    else{
                        alert("error");
                        $location.path("/login");
                    }
                }, function (d) {
                    swal({
                        title: "Error!",
                        text: "Something went wrong, please try again later",
                        type: "error",
                        timer: 2000
                    });
                });

            },
        $scope.sendMessageForP = function(pEmail,content) {

            var sendMessageForPEntity = providerEntitiesService.sendMessageForPEntity(pEmail,content);

            var providerPromise = providerRequestService.sendMessageForP(sendMessageForPEntity);

            providerPromise.then(function (d) {
                var provider = d.data;
                console.log(provider);
            }, function (d) {
                swal({
                    title: "Error!",
                    text: "Something went wrong, please try again later",
                    type: "error",
                    timer: 2000
                });
            });

        },



        $scope.showModalAccount = false;
        $scope.toggleAccount = function(){
            $scope.showModalAccount = !$scope.showModalAccount;

        };
    });
