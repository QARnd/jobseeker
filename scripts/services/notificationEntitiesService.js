/**
 * Created by rana on 4/26/2015.
 */
angular.module('servicesModule').factory('notificationEntitiesService', function() {

    return {

        notificationEntity: function (js_id,countNot) {
            var notification = {};     // new object
            notification.js_id = js_id;
            notification.countNot = countNot;
            return notification;

        },

        pageScrollEntity:function(pageScrolls,js_id) {
            var notificationJob = {};     // new object
            notificationJob.pageScrolls=pageScrolls;
            notificationJob.js_id=js_id;

            return notificationJob;
        }
    }
});