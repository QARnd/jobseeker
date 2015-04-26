/**
 * Created by rana on 4/26/2015.
 */
angular.module('servicesModule').factory('notificationEntitiesService', function() {

    return {

        notificationEntity: function (js_id,notificationId) {
            var notification = {};     // new object
            notification.js_id = js_id;
            notification.notificationId = notificationId;
            return notification;

        }
    }
});