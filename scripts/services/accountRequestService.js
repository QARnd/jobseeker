angular.module('servicesModule').factory('accountRequestsService', function($http,authenticationService) {
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
        }


    }
});
