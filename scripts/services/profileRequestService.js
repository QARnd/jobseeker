/**
 * Created by rana on 3/17/2015.
 */

angular.module('servicesModule').factory('profileRequestService', function($http,authenticationService) {
    return {
        
        viewProfile: function (profileEntity) {
            var request = {};
            request.opcode = "viewProfileRequest";
            request.Entity = profileEntity;
            var viewPromise = $http({
                method: 'POST',
                url: authenticationService.deploymentLink.link,
                //url: 'server/Jobseeker_Form.php',
                data: request
            });
            return viewPromise;
        },
        sendMessage: function (messageEntity) {
            var request = {};
            request.opcode = "sendMessageRequest";
            request.Entity = messageEntity;
            var messagePromise = $http({
                method: 'POST',
                url: authenticationService.deploymentLink.link,
                //url: 'server/Jobseeker_Form.php',
                data: request
            });
            return messagePromise;
        },
        getMessages: function (messageEntity) {
            var request = {};
            request.opcode = "getMessagesRequest";
            request.Entity = messageEntity;
            var messagePromise = $http({
                method: 'POST',
                url: authenticationService.deploymentLink.link,
                //url: 'server/Jobseeker_Form.php',
                data: request
            });
            return messagePromise;
        },

        updateSkills: function(updateSkillsEntity) {
            var request = {};
            request.opcode = "updateSkillsRequest";
            request.Entity = updateSkillsEntity;
            var skillsPromise = $http({
                method: 'POST',
                url: authenticationService.deploymentLink.link,
                //url: 'server/Jobseeker_Form.php',
                data: request
            });
            return skillsPromise;
        },

        getSkills: function(getSkillsEntity) {
            var request = {};
            request.opcode = "getSkillsRequest";
            request.Entity = getSkillsEntity;
            var skillsPromise = $http({
                method: 'POST',
                url: authenticationService.deploymentLink.link,
                //url: 'server/Jobseeker_Form.php',
                data: request
            });
            return skillsPromise;
        },
        getPostForMe: function(getPostForMeEntity) {
            var request = {};

            request.opcode = "getAllPostsForMeRequest";
            request.Entity =getPostForMeEntity;
            var postsPromise=$http({
                method : 'POST',
                url : authenticationService.deploymentLink.link,
                //url: 'server/Jobseeker_Form.php',
                data: request
            });
            return  postsPromise;
        }


    }});
