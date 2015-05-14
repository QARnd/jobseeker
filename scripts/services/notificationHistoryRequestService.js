/**
 * Created by rana on 5/13/2015.
 */

angular.module('servicesModule').factory('notificationHistoryRequestService', function($http,authenticationService) {
    return {


        getAllNotifications: function (notificationEntity) {
            var request = {};
            request.opcode = "getAllNotificationsRequest";
            request.Entity=notificationEntity;
            var notificationPromise = $http({
                method: 'POST',
                url: authenticationService.deploymentLink.link,
                //url: 'server/Jobseeker_Form.php',
                data: request
            });
            return notificationPromise;
        }



    }});

