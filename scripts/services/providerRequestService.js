/**
 * Created by happy on 5/2/2015.
 */


angular.module('servicesModule').factory('providerRequestService', function($http,authenticationService) {
    return {


        sendMessageForP:function(sendEmailToPEntity) {
    var request = {};
    request.opcode = "sendEmailToPRequest";
    request.Entity =sendEmailToPEntity;
    var sendEmailToPPromise=$http({
        method : 'POST',
        url : authenticationService.deploymentLink.link,
        //url: 'server/Jobseeker_Form.php',
        data: request
    });
    return sendEmailToPPromise;
}

    }
});