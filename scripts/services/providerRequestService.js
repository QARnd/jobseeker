/**
 * Created by happy on 5/2/2015.
 */


angular.module('servicesModule').factory('providerRequestService', function($http,authenticationService) {
    return {


        sendMessageForP: function (sendEmailToPEntity) {
            var request = {};
            request.opcode = "sendEmailToPRequest";
            request.Entity = sendEmailToPEntity;
            var sendEmailToPPromise = $http({
                method: 'POST',
                url: authenticationService.deploymentLink.link,
                //url: 'server/Jobseeker_Form.php',
                data: request
            });
            return sendEmailToPPromise;
        },
        createAccount: function (accountEntity) {
            var request = {};
            request.opcode = "createAccountRequest";
            request.Entity = accountEntity;
            var createAccountPromise = $http({
                method: 'POST',
                url: authenticationService.deploymentLink.link,
                //url: 'server/Jobseeker_Form.php',
                data: request
            });
            return createAccountPromise;
        },
        getAllMessages: function () {
            var request = {};
            request.opcode = "getAllMessagesFromPRequest";
            var getAllMessagesPromise = $http({
                method: 'POST',
                url: authenticationService.deploymentLink.link,
                //url: 'server/Jobseeker_Form.php',
                data: request
            });
            return getAllMessagesPromise;
        },
        loginProvider: function (loginProviderEntity) {
            var request = {};
            request.Entity = loginProviderEntity;
            request.opcode = "loginProviderRequest";
            var loginProviderPromise = $http({
                method: 'POST',
                url: authenticationService.deploymentLink.link,
                //url: 'server/Jobseeker_Form.php',
                data: request
            });
            return loginProviderPromise;
        },


        deleteMessage: function (deleteMessageEntity) {
            var request = {};
            request.opcode = "deleteMessageFromProRequest";
            request.Entity = deleteMessageEntity;
            var deleteMessagePromise = $http({
                method: 'POST',
                url: authenticationService.deploymentLink.link,
                //url: 'server/Jobseeker_Form.php',
                data: request
            });
            return deleteMessagePromise;
        },


        getAppliers: function (appliedEntity) {
            var request = {};
            request.opcode = "getAppliedRequest";
            request.Entity = appliedEntity;
            var appliedPromise = $http({
                method: 'POST',
                url: authenticationService.deploymentLink.link,
                //url: 'server/Jobseeker_Form.php',
                data: request
            });
            return appliedPromise;

        }
    }
});