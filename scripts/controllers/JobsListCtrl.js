/**
 * Created by happy on 4/23/2015.
 */

angular.module('myApp').controller('JobsListCtrl',

    function AppCtrl($scope,$rootScope,addToJobListEntitiesService,authenticationService,addToJobListRequestService) {

        $('#loadMoreJobList').hide();
        $scope.pageScrolls=1;


        var js_id= authenticationService.userProfile.jobseekerId;

        //$scope.getJobsListCtrl=function(){

        var jobListEntity = addToJobListEntitiesService.getJobListEntity(js_id);

            var jobListPromise = addToJobListRequestService.getJobList(jobListEntity);

            jobListPromise.then(function (d) {
                console.log(d.data);
                $rootScope.jobList= d.data;



            }, function (d) {
                swal({
                    title: "Error!",
                    text: "Something went wrong, please try again later",
                    type: "error",
                    timer: 2000
                });
            });

        $scope.loadMoreJobList=function(){
            //alert("load");
            $('#loadMoreJobList').show();

            //$("#newsfeedJob").animate({ scrollTop: $(document).height() }, 1000);

            var scrollEntity = addToJobListEntitiesService.pageScrollEntity($scope.pageScrolls,js_id);

            var scrollPromise = addToJobListRequestService.getFromJobListByPageNumber(scrollEntity);

            scrollPromise.then(function (d) {

                $('#loadMoreJobList').hide();
                $scope.pageScrolls=$scope.pageScrolls+1;
                $rootScope. jobList= $rootScope. jobList.concat(d.data);
                console.log(d);
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

