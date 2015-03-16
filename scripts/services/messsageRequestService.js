angular.module('servicesModule').factory('messageRequestsService', function($http,authenticationService) {
    return {


        addJob: function (messageEntity) {
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
        }
    }});