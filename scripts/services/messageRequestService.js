angular.module('servicesModule').factory('messageRequestService', function($http,authenticationService) {
    return {


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

        addMessageJobProvider: function (addMessageJobProvider) {
            var request = {};
            request.opcode = "addMessageJobProviderRequest";
            request.Entity = addMessageJobProvider;
            var messagePromise = $http({
                method: 'POST',
                url: authenticationService.deploymentLink.link,
                //url: 'server/Jobseeker_Form.php',
                data: request
            });
            return messagePromise;
        },

    }});