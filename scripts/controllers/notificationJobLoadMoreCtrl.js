/**
 * Created by happy on 4/23/2015.
 */

angular.module('myApp').controller('notificationJobLoadMoreCtrl',

    function AppCtrl($scope,$rootScope,notificationEntitiesService,authenticationService,notificationRequestService) {

        $('#loadMoreJobNotification').hide();
        $scope.pageScrolls=1;


        var js_id= authenticationService.userProfile.jobseekerId;


        $scope.loadMoreJobNotification=function(){
            //alert("load");
            $('#loadMoreJobNotification').show();

            //$("#newsfeedJob").animate({ scrollTop: $(document).height() }, 1000);

            var scrollEntity = notificationEntitiesService.pageScrollEntity($scope.pageScrolls,js_id);

            var scrollPromise = notificationRequestService.getFromJobNotificationByPageNumber(scrollEntity);
            $scope.jobsNotifications = [

            ];
            scrollPromise.then(function (d) {
                console.log(d);
                $('#loadMoreJobNotification').hide();
                $scope.pageScrolls=$scope.pageScrolls+1;
                $rootScope. jobsNotifications=  $rootScope. jobsNotifications.concat(d.data);



                //$(window).bind('scroll', bindScroll);

            }, function (d) {
                swal({
                    title: "Error!",
                    text: "Something went wrong, please try again later",
                    type: "error"
                });
            });
        };

        //}

    });



