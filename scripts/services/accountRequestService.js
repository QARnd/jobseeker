angular.module('servicesModule').factory('accountRequestService', function($http,authenticationService) {
    return {


        createAccount: function(accountEntity) {
            var request = {};
            request.opcode = "createAccountRequest";
            request.Entity =accountEntity;
            var createAccountPromise=$http({
                method : 'POST',
                url : authenticationService.deploymentLink.link,
                //url: 'server/Jobseeker_Form.php',
                data: request
            });
            return createAccountPromise;
        },

        send_events: function() {
            var request = {};
            request.opcode = "sendEventsRequest";
            var createAccountPromise=$http({
                method : 'POST',
                url : authenticationService.deploymentLink.link,
                //url: 'server/Jobseeker_Form.php',
                data: request
            });
            return createAccountPromise;
        }



    }
});
