angular.module('servicesModule').factory('msgsEntitiesService', function() {

    return {

        msgsEntity: function (js_id,countNot) {
            var notification = {};     // new object
            notification.js_id = js_id;
            notification.countNot = countNot;
            return notification;

        },

        allMsgsEntity: function (js_id) {
            var allNotification = {};     // new object
            allNotification.js_id = js_id;
            return allNotification;

        }
    }
});