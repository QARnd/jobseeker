/**
 * Created by rana on 4/1/2015.
 */


angular.module('myApp').controller('newsfeedJobCtrl',
    function($rootScope,$scope, jobEntitiesService, jobRequestsService, authenticationService) {
        $('#loadMoreSpinner').hide();
        $('#addNewJob').hide();

        //alert(authenticationService.userProfile.user_type);

        console.log(authenticationService.userProfile.provider_id);
        $scope.pageScrolls=1;
        $scope.jp_id= authenticationService.userProfile.provider_id;

        $scope.getNewsFeed=function(){
            $rootScope.jobs=[

            ];

            var jobPromise = jobRequestsService.getAllJobs();

            jobPromise.then(function (d) {
                console.log(d);
                $rootScope.jobs= d.data;



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
                    for (var i = 0; i < $rootScope.jobs.length; i++) {
                        if ($rootScope.jobs[i].id == jobId) {
                            $rootScope.jobs.splice(i, 1);
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
                $rootScope.jobs= $rootScope.jobs.concat(d.data);

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
            //var jobprovider_id=authenticationService.userProfile.provider_id;
            //
            //var checkEntity = jobEntitiesService.checkValidityEntity(jobprovider_id);
            //
            //var providerPromise = jobRequestsService.checkValidity(checkEntity);
            //
            //providerPromise.then(function (d) {
            //    var provider = d.data;
            //    if(provider=="true"){  $('#addNewJob').toggle('slow');}
            //
            //    console.log(provider);
            //}, function (d) {
            //    swal({
            //        title: "Error!",
            //        text: "Something went wrong, please try again later",
            //        type: "error",
            //        timer: 2000
            //    });
            //});

        }

    });
