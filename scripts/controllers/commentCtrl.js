/**
 * Created by rana on 4/4/2015.
 */



angular.module('myApp').controller('commentCtrl',
    function($scope, commentEntitiesService, commentRequestService,$routeParams, authenticationService) {


        $scope.postId=$routeParams.postId;

        $scope.addComment = function () {

            var user_id=authenticationService.userProfile.user_id;

            var commentEntity = commentEntitiesService.addComment($scope.postId,$scope.content,user_id);

            var commentPromise = commentRequestService.addComment(commentEntity);


            commentPromise.then(function (d) {
                console.log(d);
                var comment= d.data;
                $scope.postId= comment.postId;
                $scope.content= comment.content;
                $scope.user_id= comment.user_id;
                $scope.date=comment.date;


            }, function (d) {
                swal({
                    title: "Error!",
                    text: "Something went wrong, please try again later",
                    type: "error",
                    timer: 2000
                });
            });
        };

    });
