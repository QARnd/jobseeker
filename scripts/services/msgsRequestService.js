angular.module('servicesModule').factory('msgsRequestService', function($http,authenticationService) {
    return {

        getNotifications: function (notificationEntity) {
            var request = {};
            request.opcode = "getMsgsNotificationsRequest";
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
