/**
 * Created by rana on 3/17/2015.
 */




angular.module('myApp').controller('viewProfileCtrl',
    function($scope,$routeParams, entitiesService, profileRequestService, authenticationService) {

        $scope.imgUrl=authenticationService.userProfile.data.pictureUrl;
        $scope.myId=authenticationService.userProfile.user_id;
        $scope.user_id=$routeParams.id;

            var profileEntity = entitiesService.profileEntity($scope.user_id);

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










        //$scope.myVar = true;
        //$scope.toggle = function() {
        //    $scope.myVar = !$scope.myVar;
        //}
        $scope.checkUser = function(fromId) {
            var jsId= authenticationService.userProfile.jobseekerId;
            console.log(fromId);
            console.log(jsId);
            if ( fromId==jsId ){
                return true;
            }
            else {
                return false;}

        };



        $scope.showModal = false;
        $scope.toggle = function(){
            $scope.showModal = !$scope.showModal;
            $scope.getMessages();
        };

        $scope.sendMessage = function () {
            var from_id= authenticationService.userProfile.user_id;
            var to_id=$scope.user_id;
            var messageEntity = entitiesService.messageEntity($scope.content,to_id,from_id);
            var messagePromise = profileRequestService.sendMessage(messageEntity);
            //console.log(from_id+","+to_id+","+$scope.content);
            $scope.content="";
            messagePromise.then(function (d) {console.log(d);
                var message= d.data;
                console.log(message);
                alert(d.data.message_id);
                $scope.messages.unshift({messageId:message.message_id,content:message.content,sendate:message.sendate,from_id:message.fromId,to_id:message.toId});
                $scope.content="";


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

            var from_id = authenticationService.userProfile.user_id;
            //alert(from_id);
            //alert($scope.user_id);
            var messageEntity = entitiesService.getMessagesEntity(from_id,$scope.user_id);
            var messagePromise =profileRequestService.getMessages(messageEntity);

            messagePromise.then(function (d) {
                console.log(d.data);
                $scope.messages = d.data;
            });

        }
    });


