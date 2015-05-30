
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

                    console.log(d.data);


                    if(d.data==-1)
                    {
                        swal({
                            title: "Error!",
                            text: "Something went wrong, please try again later",
                            type: "error",
                            timer: 5000
                        });
                        $location.path("/login");
                    }

                    else{
                        authenticationService.userProfile.user_type=2;
                        authenticationService.userProfile.provider_id=d.data.jobprovider_id;
                        authenticationService.userProfile.data= d.data;
                        authenticationService.userProfile.companyName= d.data.Name;

                        authenticationService.providerLoggedIn.status=true;
                        $location.path("/newsfeedJob");
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


        //    $scope.appliesNotifications=[];
        //
        //var appliedEntity = providerEntitiesService.appliedEntity( authenticationService.userProfile.provider_id);
        //var NotificationPromise = providerRequestService.getAppliers(appliedEntity);
        //
        //NotificationPromise.then(function (d) {
        //    console.log(d);
        //
        //    var applied = d.data;
        //    $scope.appliedNotifications=applied;
        //    $scope.appliedNoticount=applied.length;
        //
        //
        //
        //});




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

        },
        $scope.showPostsModal = false;
        $scope.postsToggle = function(){
            $scope.showPostsModal = !$scope.showPostsModal;

        }
        $scope.showJobsModal = false;
        $scope.JobToggle = function(){
            $scope.showJobsModal = !$scope.showJobsModal;

        }
        $scope.showEventsModal = false;
        $scope.EventsToggle = function(){
            $scope.showEventsModal = !$scope.showEventsModal;

        }
        $scope.showMatchingsModal = false;
        $scope.MatchingToggle = function(){
            $scope.showMatchingsModal = !$scope.showMatchingsModal;

        }
        $scope.showCommunicationModal = false;
        $scope.CommunicationToggle = function(){
            $scope.showCommunicationModal = !$scope.showCommunicationModal;

        }
        $scope.showLinkedinModal = false;
        $scope.LinkedinToggle = function(){
            $scope.showLinkedinModal = !$scope.showLinkedinModal;

        }
        $scope.showAboutModal = false;
        $scope.AboutToggle = function(){
            $scope.showAboutModal = !$scope.showAboutModal;

        }
        $scope.showContactUsModal = false;
        $scope.ContactUsToggle = function(){
            $scope.showContactUsModal = !$scope.showContactUsModal;

        }


        $scope.logoutProvider = function() {
            //alert("rana");

            delete authenticationService.userProfile.user_type;
            delete authenticationService.userProfile.provider_id;
            delete authenticationService.userProfile.data;
            delete authenticationService.userProfile.companyName;
            delete authenticationService.providerLoggedIn.status;



            $location.path("/login");
        };

    });
