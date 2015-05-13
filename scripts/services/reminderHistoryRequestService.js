/**
 * Created by rana on 5/13/2015.
 */

angular.module('servicesModule').factory('reminderHistoryRequestService', function($http,authenticationService) {
    return {

        getAllRemainders: function (remainderEntity) {
            var request = {};
            request.opcode = "getAllRemaindersRequest";
            request.Entity = remainderEntity;
            var remainderPromise = $http({
                method: 'POST',
                url: authenticationService.deploymentLink.link,
                //url: 'server/Jobseeker_Form.php',
                data: request
            });
            return remainderPromise;
        }

    }});
