/**
 * Created by rana on 5/13/2015.
 */


angular.module('myApp').controller('notiHistoryCtrl',
    function($scope, authenticationService,notificationHistoryRequestService,notificationHistoryEntitiesService) {

        $scope.js_id= authenticationService.userProfile.jobseekerId;

        var notificationsEntity = notificationHistoryEntitiesService.allNotificationsEntity($scope.js_id);
        var notificationsPromise = notificationHistoryRequestService.getAllNotifications(notificationsEntity);

        notificationsPromise.then(function (d) {

            console.log(d);

            $scope.notifications = d.data;


        }, function (d) {
            swal({
                title: "Error!",
                text: "Something went wrong, please try again later",
                type: "error",
                timer: 2000
            });
        });



    });