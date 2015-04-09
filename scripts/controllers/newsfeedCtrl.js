/**
 * Created by Omayma Abulrub on 12/1/2014.
 */


angular.module('myApp').controller('newsfeedCtrl',
    function($rootScope,$scope, entitiesService, postRequestsService, authenticationService) {
        $('#loadMoreSpinner').hide();
        $('#addNewPost').hide();
        console.log(authenticationService.userProfile.data);
        $scope.pageScrolls=1;
        $scope.js_id= authenticationService.userProfile.jobseekerId;

        $scope.getNewsFeed=function(){
            $rootScope.posts=[

            ];

            var postPromise = postRequestsService.getAllPosts();

            postPromise.then(function (d) {
                console.log(d);
                $rootScope.posts= d.data;



            }, function (d) {
                swal({
                    title: "Error!",
                    text: "Something went wrong, please try again later",
                    type: "error"
                });
            });

        };


        $scope.getNewsFeed();




        $scope.deletePost=function(postId){
            swal({
                    title: "Are you sure?",
                    text: "Delete!",
                    type: "warning",
                    showCancelButton: true,
                    confirmButtonColor: "#DD6B55",
                    confirmButtonText: "Yes, delete!",
                    closeOnConfirm: true },
                function() {
                    var postPromise = postRequestsService.deletePost(postId);


                    //delete post
                    for (var i = 0; i < $rootScope.posts.length; i++) {
                        if ($rootScope.posts[i].id == postId) {
                            $rootScope.posts.splice(i, 1);
                            break;
                        }
                    }

                    postPromise.then(function (d) {
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


            var postPromise = postRequestsService.getAllPostsByPageNumber($scope.pageScrolls);

            postPromise.then(function (d) {
                console.log(d);
                $('#loadMoreSpinner').hide();
                $scope.pageScrolls=$scope.pageScrolls+1;
                $scope.posts= $scope.posts.concat(d.data);

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


        $scope.showAddPost=function(){
            $('#addNewPost').toggle('slow');
        }

});



