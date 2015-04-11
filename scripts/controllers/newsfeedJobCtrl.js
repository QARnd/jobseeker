/**
 * Created by rana on 4/1/2015.
 */


angular.module('myApp').controller('newsfeedJobCtrl',
    function($rootScope,$scope, jobEntitiesService, jobRequestsService, authenticationService) {
        $('#loadMoreSpinner').hide();
        $('#addNewJob').hide();
        console.log(authenticationService.userProfile.data);
        $scope.pageScrolls=1;
        $scope.jp_id= authenticationService.userProfile.provider_id;

        $scope.getNewsFeed=function(){
            $rootScope.job=[

            ];

            var jobPromise = jobRequestsService.getAllJobs();

            jobPromise.then(function (d) {
                console.log(d);
                $rootScope.job= d.data;



            }, function (d) {
                swal({
                    title: "Error!",
                    text: "Something went wrong, please try again later",
                    type: "error"
                });
            });

        };


        $scope.getNewsFeed();




        $scope.deleteJob=function(jobId){
            swal({
                    title: "Are you sure?",
                    text: "Delete!",
                    type: "warning",
                    showCancelButton: true,
                    confirmButtonColor: "#DD6B55",
                    confirmButtonText: "Yes, delete!",
                    closeOnConfirm: true },
                function() {
                    var jobPromise = jobRequestsService.deleteJob(jobId);


                    //delete post
                    for (var i = 0; i < $rootScope.job.length; i++) {
                        if ($rootScope.job[i].id == jobId) {
                            $rootScope.job.splice(i, 1);
                            break;
                        }
                    }

                    jobPromise.then(function (d) {
                        console.log(d);
                        //swal({
                        //    title: "SUCCESS",
                        //    text: "Delete Done Successfully",
                        //    type: "success"
                        //});
                        //$scope.getNewsFeed();

                    }, function (d) {
                        swal({
                            title: "Error!",
                            text: "Something went wrong, please try again later",
                            type: "error"
                        });
                    });
                }
            );
        };

        $scope.loadMore=function(){
            //alert("load");
            $('#loadMoreSpinner').show();

            $("html, body").animate({ scrollTop: $(document).height() }, 1000);


            var jobPromise = jobRequestsService.getAllJobsByPageNumber($scope.pageScrolls);

            jobPromise.then(function (d) {
                console.log(d);
                $('#loadMoreSpinner').hide();
                $scope.pageScrolls=$scope.pageScrolls+1;
                $scope.job= $scope.job.concat(d.data);

                //$(window).bind('scroll', bindScroll);

            }, function (d) {
                swal({
                    title: "Error!",
                    text: "Something went wrong, please try again later",
                    type: "error"
                });
            });
        };




        //function bindScroll(){
        //    if($(window).scrollTop() + $(window).height() > $(document).height() - 100) {
        //        $(window).unbind('scroll');
        //        $scope.loadMore();
        //    }
        //}
        //
        //$(window).scroll(bindScroll);


        $scope.showAddJob=function(){
            $('#addNewJob').toggle('slow');
        }

    });
