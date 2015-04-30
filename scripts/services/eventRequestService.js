/**
 * Created by rana on 4/27/2015.
 */

angular.module('servicesModule').factory('eventRequestService', function($http,authenticationService) {
    return {

        addEvent: function (eventEntity) {
            var request = {};
            request.opcode = "addEventRequest";

            request.Entity =  eventEntity;
            var eventPromise = $http({
                method: 'POST',
                url: authenticationService.deploymentLink.link,
                //url: 'server/Jobseeker_Form.php',
                data: request
            });
            return eventPromise;
        }
        ,
        getEvents: function (getEventEntity) {
            var request = {};
            request.opcode = "getEventsRequest";
            request.Entity =  getEventEntity;
            var eventPromise = $http({
                method: 'POST',
                url: authenticationService.deploymentLink.link,
                //url: 'server/Jobseeker_Form.php',
                data: request
            });
            return eventPromise;
        },

        deleteEvent: function(deleteEventEntity) {
            var request = {};

            request.opcode = "deleteEventRequest";

            request.Entity =deleteEventEntity;
            var eventPromise=$http({
                method : 'POST',
                url : authenticationService.deploymentLink.link,
                //url: 'server/Jobseeker_Form.php',
                data: request
            });
            return eventPromise;
        },


        editEvent: function(editEventEntity) {
            var request = {};

            request.opcode = "editEventRequest";
            request.Entity =editEventEntity;
            var eventPromise=$http({
                method : 'POST',
                url : authenticationService.deploymentLink.link,
                //url: 'server/Jobseeker_Form.php',
                data: request
            });
            return eventPromise;
        }



    }});