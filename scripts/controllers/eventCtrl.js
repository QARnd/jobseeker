/**
 * Created by rana on 4/27/2015.
 */



angular.module('myApp').controller('eventCtrl',
    function($rootScope,$scope, eventEntitiesService, eventRequestService,$routeParams, authenticationService) {

        $rootScope.events=[

        ];
        $scope.getEvents=function(){
            var jobId=$routeParams.jobId;
            var js_id = authenticationService.userProfile.jobseekerId;



            var getEventsEntity = eventEntitiesService.getEvent(jobId,js_id);
            var eventPromise =eventRequestService.getEvents(getEventsEntity);

            eventPromise.then(function (d) {
                console.log(d);
                $rootScope.events= d.data;
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


            var eventEntity = eventEntitiesService.addEvent(jobId,js_id,$scope.eventTitle,$scope.eventDetail, $scope.remainderDate );
            var eventPromise = eventRequestService.addEvent(eventEntity);


            eventPromise.then(function (d) {
                console.log(d.data);
                var event= d.data;
                console.log(event);

                $rootScope.events.unshift({eventId:event.eventId,jobseeker_id:event.jobseeker_id,eventTitle:event.eventTitle,eventDetail:event.eventDetail,remainderDate:event.remainderDate,jobId:event.jobId});

                $scope.eventTitle="";
                $scope.eventDetail="";

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
        $scope.toggleEventModal = function(eventId,eventTitle,eventDetail,remainderDate){
            $scope.showModal = !$scope.showModal;
            $scope.editedEventDetail=eventDetail;
            $scope.editedEventTitle=eventTitle;
            $scope.editedRemainderDate=remainderDate;
            $scope.editedEventId=eventId;

        };

        $scope.editEvent=function(editedEventId,editedEventDetail,editedEventTitle,editedRemainderDate){
            for (var i=0;i<$rootScope.events.length;i++) {
                if ($rootScope.events[i].eventId == editedEventId) {
                    $rootScope.events[i].eventDetail = editedEventDetail;
                    $rootScope.events[i].eventTitle = editedEventTitle;
                    $rootScope.events[i].remainderDate = editedRemainderDate;
                    break;
                }
            }
            $scope.showModal = false;

            var editEventEntity = eventEntitiesService.editEventEntity(editedEventId,editedEventDetail,editedEventTitle,editedRemainderDate);
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
                    for (var i = 0; i < $rootScope.events.length; i++) {
                        if ($rootScope.events[i].eventId == eventId) {
                            $rootScope.events.splice(i, 1);
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