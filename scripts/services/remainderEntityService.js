/**
 * Created by happy on 4/29/2015.
 */
angular.module('servicesModule').factory('remainderEntityService', function() {

    return {

       remainderEntity: function (js_id,reminderDate) {
           var   remainder = {};     // new object
           remainder.js_id = js_id;
           remainder.reminderDate = reminderDate;

           return   remainder;

        }
    }
});