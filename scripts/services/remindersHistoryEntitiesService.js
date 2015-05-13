/**
 * Created by rana on 5/13/2015.
 */

angular.module('servicesModule').factory('remindersHistoryEntitiesService', function() {

    return {

        allRemaindersEntity: function (js_id,reminderDate) {
            var   remainder = {};     // new object
            remainder.js_id = js_id;
            remainder.reminderDate = reminderDate;

            return   remainder;

        }
    }
});