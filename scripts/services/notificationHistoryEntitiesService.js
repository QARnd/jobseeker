/**
 * Created by rana on 5/13/2015.
 */

angular.module('servicesModule').factory('notificationHistoryEntitiesService', function() {

    return {

        allNotificationsEntity: function (js_id) {
            var notifications = {};     // new object
            notifications.js_id = js_id;
            return notifications;

        }
    }
});

