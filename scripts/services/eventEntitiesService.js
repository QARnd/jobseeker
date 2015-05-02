/**
 * Created by rana on 4/27/2015.
 */

angular.module('servicesModule').factory('eventEntitiesService', function() {

    return {
        addEvent:function(jobId,js_id,eventTitle,eventDetail,remainderDate){
            var event = {};     // new object
            event.jobId=jobId;
            event.eventDetail=eventDetail;
            event.eventTitle=eventTitle;
            event.js_id=js_id;
            event.remainderDate=remainderDate;

            return event;
        },
        editEvent:function(editedEventId,editedEventDetail,editedEventTitle,editedRemainderDate ){
            var event = {};     // new object
            event.editedEventId=editedEventId;
            event.editedEventDetail=editedEventDetail;
            event.editedEventTitle=editedEventTitle;
            event.editedRemainderDate=editedRemainderDate;

            return event;
        },
        getEvent:function(jobId, js_id){
            var event = {};     // new object
            event.jobId=jobId;
            event.js_id=js_id;

            return event;
        },
        deleteEventEntity: function(eventId) {
            var eventDeleted = {};     // new object
            eventDeleted.eventId=eventId;
            return eventDeleted;
        }

    };

});



