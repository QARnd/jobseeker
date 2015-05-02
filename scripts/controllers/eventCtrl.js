/**
 * Created by rana on 4/27/2015.
 */



angular.module('myApp').controller('eventCtrl',
    function($rootScope,$scope, eventEntitiesService, eventRequestService,$routeParams, authenticationService) {


        $scope.getEvents=function(){
            var jobId=$routeParams.jobId;
            var js_id = authenticationService.userProfile.jobseekerId;


            $scope.events=[

            ];
            var getEventsEntity = eventEntitiesService.getEvent(jobId,js_id);
            var eventPromise =eventRequestService.getEvents(getEventsEntity);

            eventPromise.then(function (d) {
                console.log(d);
                $scope.events= d.data;
                //$scope.jobId= event.jobId;
                //$scope.js_id= event.js_id;
                //$scope.eventTitle= event.eventTitle;
                //$scope.eventDetail= event.eventDetail;
                //$scope.remainderDate= event.remainderDate;



            }, function (d) {
                swal({
                    title: "Error!",
                    text: "Something went wrong, please try again later",
                    type: "error"
                });
            });

        };



        $scope.addEvent = function () {
            var jobId=$routeParams.jobId;
            var js_id=authenticationService.userProfile.jobseekerId;


            var eventEntity = eventEntitiesService.addEvent(jobId,js_id,$scope.eventTitle,$scope.eventDetail, $scope.remainderDate )
            var eventPromise = eventRequestService.addEvent(eventEntity);


            eventPromise.then(function (d) {
                console.log(d);
                var event= d.data;
                //$scope.jobId= event.jobId;
                //$scope.js_id= event.js_id;
                //$scope.eventTitle= event.eventTitle;
                //$scope.eventDetail= event.eventDetail;
                //$scope.remainderDate= event.remainderDate;
                //
                //
                //
                //$scope.jobComments.unshift({jobId:event.jobId,js_id:event.js_id,eventTitle:event.eventTitle,eventDetail:event.eventDetail,remainderDate:event.remainderDate,eventId:event.eventId});
                //
                //$scope.eventTitle="";
                //$scope.eventDetail="";

            }, function (d) {
                swal({
                    title: "Error!",
                    text: "Something went wrong, please try again later",
                    type: "error",
                    timer: 2000
                });
            });
        };



        $scope.showModal = false;
        $scope.toggleEventModal = function(editedEventId,editedEventTitle,editedEventDetail,editedRemainderDate){
            $scope.showModal = !$scope.showModal;
            $scope.editedEventDetail=editedEventDetail;
            $scope.editedEventTitle=editedEventTitle;
            $scope.editedRemainderDate=editedRemainderDate;
            $scope.editedEventId=editedEventId;

        };

        $scope.editEvent=function(editedEventId,editedEventDetail,editedEventTitle,editedRemainderDate){
            for (var i=0;i<$scope.events.length;i++) {
                if ($scope.events[i].eventId == editedEventId) {
                    $scope.events[i].eventDetail = editedEventDetail;
                    $scope.events[i].eventTitle = editedEventTitle;
                    $scope.events[i].remainderDate = editedRemainderDate;
                    break;
                }
            }
            $scope.showModal = false;

            var editEventEntity = eventEntitiesService.editEvent(editedEventId,editedEventDetail,editedEventTitle,editedRemainderDate);
            var eventPromise = eventRequestService.editEvent(editEventEntity);

            eventPromise.then(function (d) {
                console.log(d);
            }, function (d) {
                swal({
                    title: "Error!",
                    text: "Something went wrong, please try again later",
                    type: "error"
                });
            });
        }

        $scope.deleteEvent=function(eventId) {
            swal({
                    title: "Are you sure?",
                    text: "Delete!",
                    type: "warning",
                    showCancelButton: true,
                    confirmButtonColor: "#DD6B55",
                    confirmButtonText: "Yes, delete!",
                    closeOnConfirm: true },
                function() {

                    var deleteEventEntity = eventEntitiesService.deleteEventEntity(eventId);
                    var eventPromise = eventRequestService.deleteEvent(deleteEventEntity);


                    //delete event
                    for (var i = 0; i < $scope.events.length; i++) {
                        if ($scope.events[i].eventId == eventId) {
                            $scope.events.splice(i, 1);
                            break;
                        }
                    }
                    eventPromise.then(function (d) {


                    }, function (d) {
                        swal({
                            title: "Error!",
                            text: "Something went wrong, please try again later",
                            type: "error"
                        });
                    });
                }
            );

        }


    });