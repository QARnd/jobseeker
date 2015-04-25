/**
 * Created by happy on 4/25/2015.
 */

angular.module('myApp').controller('getNotificationCtrl',
    function($scope, entitiesService, NotificationRequestService, authenticationService) {

        $scope.getNotification = function () {

            var js_id = authenticationService.userProfile.jobseekerId;
            var NotificationEntity = entitiesService.getNotificationsEntity(js_id,$scope.count);
            var NotificationPromise = NotificationRequestService.getNotifications(NotificationEntity);

            NotificationPromise.then(function (d) {
                console.log(d);

                var Notification = d.data;
                $scope.content=Notification.content;

            });

        }

    });
