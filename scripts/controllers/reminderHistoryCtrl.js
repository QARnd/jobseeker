/**
 * Created by rana on 5/13/2015.
 */

angular.module('myApp').controller('reminderHistoryCtrl',
    function($scope, authenticationService,remindersHistoryEntitiesService,reminderHistoryRequestService) {

        $scope.js_id= authenticationService.userProfile.jobseekerId;

        var date = new Date();
        var month=date.getMonth()+1;
        if (month<10)
            month='0'+month;
        var day=date.getDate();
        if (day<10)
            day='0'+day;

        var reminderDate=date.getFullYear()+ '-' + month + '-' + day;


        var remainderEntity = remindersHistoryEntitiesService.allRemaindersEntity($scope.js_id,reminderDate);
        //alert("entity");

        var remainderPromise = reminderHistoryRequestService.getAllRemainders(remainderEntity);
        //alert("promise11111");

        remainderPromise.then(function (d) {

            console.log(d);
            $scope.reminders = d.data;
            //alert("promise");

            //alert($scope.reminders);
        }, function (d) {
            swal({
                title: "Error!",
                text: "Something went wrong, please try again later",
                type: "error",
                timer: 2000
            });
        });
    });