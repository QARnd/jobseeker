/**
 * Created by Omayma Abulrub on 12/1/2014.
 */

angular.module('myApp').controller('newsfeedCtrl',
    function($scope, entitiesService, postRequestsService, authenticationService) {

        $scope.getNewsFeed=function(){
            $scope.posts=[
                {title:"ttttt"},
                {title:"yyyyy"},
                {title:"bbb"},
                {title:"zzzz"},
                {title:"aa"},

            ];

            var postPromise = postRequestsService.getAllPosts();

            postPromise.then(function (d) {
                console.log(d);
                $scope.posts= d.data;



            }, function (d) {
                swal({
                    title: "Error!",
                    text: "Something went wrong, please try again later",
                    type: "error"
                });
            });

        }


        $scope.getNewsFeed();




        $scope.deletePost=function(postId){
            var postPromise = postRequestsService.deletePost(postId);

            postPromise.then(function (d) {
                console.log(d);
                swal({
                    title: "SUCCESS",
                    text: "Delete Done Successfully",
                    type: "success"
                });
                $scope.getNewsFeed();

            }, function (d) {
                swal({
                    title: "Error!",
                    text: "Something went wrong, please try again later",
                    type: "error"
                });
            });
        }

    });
