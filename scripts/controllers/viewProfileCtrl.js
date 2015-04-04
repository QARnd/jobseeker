/**
 * Created by rana on 3/17/2015.
 */




angular.module('myApp').controller('viewProfileCtrl',
    function($scope, entitiesService, profileRequestService, authenticationService) {

        $scope.viewProfile = function () {

            var profileEntity = entitiesService.profileEntity($scope.jobSeekerId);

            var profilePromise = profileRequestService.viewProfile(profileEntity);

            profilePromise.then(function (d) {

                console.log(d);
                var profile= d.data;
                $scope.jobSeekerId= profile.jobSeekerId;
                $scope.first_name= profile.first_name;
                $scope.last_name= profile.last_name;
                $scope.Email= profile.Email;
                $scope.profileUrl= profile.profileUrl;
                $scope.pictureUrl= profile.pictureUrl;
                $scope.summary= profile.summary;
                $scope.location= profile.location;
                $scope.industry= profile.industry;
                $scope.educations="";
                try{
                    $scope.educations= profile.educations.split(',');
                }catch(err){

                }
                $scope.skills="";
                try{
                    $scope.skills=profile.skills.split(',');
                }catch(err){

                }





            }, function (d) {
                swal({
                    title: "Error!",
                    text: "Something went wrong, please try again later",
                    type: "error",
                    timer: 2000
                });
            });
        };
        $scope.myVar = true;
        $scope.toggle = function() {
            $scope.myVar = !$scope.myVar;
        }
        $scope.sendMessage = function () {
            var from_id= authenticationService.userProfile.jobseekerId;
            var messageEntity = entitiesService.messageEntity($scope.content,$scope.to_id,from_id);
            var messagePromise = profileRequestService.sendMessage(messageEntity);

            messagePromise.then(function (d) {
                console.log(d);
                var message= d.data;
                $scope.content= message.content;


                var html='<li><span class="left">'+message.content+'</span></li>';
                $("#msgs").append(html);


            }, function (d) {
                swal({
                    title: "Error!",
                    text: "Something went wrong, please try again later",
                    type: "error",
                    timer: 2000
                });
            });
        };

        $scope.getMessages = function () {

            var from_id = authenticationService.userProfile.jobseekerId;

            var messageEntity = entitiesService.getMessagesEntity(from_id,$scope.jobSeekerId);
            var messagePromise =profileRequestService.getMessages(messageEntity);

            messagePromise.then(function (d) {
                console.log(d);
                $scope.messages = d.data;
            });

        }
    });


