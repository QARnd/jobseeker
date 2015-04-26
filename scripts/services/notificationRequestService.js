/**
 * Created by rana on 4/26/2015.
 */
angular.module('servicesModule').factory('notificationRequestService', function($http,authenticationService) {
    return {

        getNotifications: function () {
            var request = {};
            request.opcode = "getNotificationsRequest";
            var notificationPromise = $http({
                method: 'POST',
                url: authenticationService.deploymentLink.link,
                //url: 'server/Jobseeker_Form.php',
                data: request
            });
            return notificationPromise;
        }




    }});
