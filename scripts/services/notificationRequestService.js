/**
 * Created by rana on 4/26/2015.
 */
angular.module('servicesModule').factory('notificationRequestService', function($http,authenticationService) {
    return {


        getNotifications: function (notificationEntity) {
            var request = {};
            request.opcode = "getJobsNotificationsRequest";
            request.Entity=notificationEntity;
            var notificationPromise = $http({
                method: 'POST',
                url: authenticationService.deploymentLink.link,
                //url: 'server/Jobseeker_Form.php',
                data: request
            });
            return notificationPromise;
        },


        getjobsHistory: function (jobsHistoryEntity) {
            var request = {};
            request.opcode = "getJobsHistoryRequest";
            request.Entity=jobsHistoryEntity;
            var jobsHistoryPromise = $http({
                method: 'POST',
                url: authenticationService.deploymentLink.link,
                //url: 'server/Jobseeker_Form.php',
                data: request
            });
            return jobsHistoryPromise;
        },




        getFromJobNotificationByPageNumber: function(scrollEntity) {
            var request = {};
            request.opcode = "getFromJobNotificationByPageNumber";
            request.Entity =scrollEntity;
            var getFromJobNotificationByPageNumberPromise=$http({
                method : 'POST',
                url : authenticationService.deploymentLink.link,
                //url: 'server/Jobseeker_Form.php',
                data: request
            });
            return getFromJobNotificationByPageNumberPromise;
        }
        ,
        getComments:function (notificationEntity) {
            var request = {};
            request.opcode = "getCommentsNotificationsRequest";
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
