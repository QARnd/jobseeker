/**
 * Created by rana on 4/4/2015.
 */



angular.module('myApp').controller('commentCtrl',
    function($rootScope,$scope, commentEntitiesService, commentRequestService,$routeParams, authenticationService) {

        $scope.user_id= authenticationService.userProfile.user_id;
        $scope.getComments=function(){
            var postId=$routeParams.postId;


            $scope.comments=[

            ];
            var getCommentEntity = commentEntitiesService.getComments(postId);
            var postPromise =commentRequestService.getComments(getCommentEntity);

            postPromise.then(function (d) {
                console.log(d);
                $scope.comments= d.data;



            }, function (d) {
                swal({
                    title: "Error!",
                    text: "Something went wrong, please try again later",
                    type: "error"
                });
            });

        };

        $scope.addComment = function () {
            var postId=$routeParams.postId;
            //alert(postId);
            var user_id=authenticationService.userProfile.user_id;
            var full_name=authenticationService.userProfile.full_name;
            //alert(full_name);
            var commentEntity = commentEntitiesService.addComment(postId,$scope.content,user_id,full_name);

            var commentPromise = commentRequestService.addComment(commentEntity);


            commentPromise.then(function (d) {
                console.log(d);
                var comment= d.data;
                $scope.postId= comment.postId;
                $scope.content= comment.content;
                $scope.user_id= comment.userId;

                $scope.date=comment.date;

                $scope.comments.unshift({postId:comment.postId,content:comment.content,user_id:comment.user_id,date:comment.date,fullname:comment.fullname,comment_id:comment.commentId});

                $scope.content="";
            }, function (d) {
                swal({
                    title: "Error!",
                    text: "Something went wrong, please try again later",
                    type: "error",
                    timer: 2000
                });
            });
        };



        $scope.editComment=function(commentId){
            var commentPromise = commentRequestService.editComment(commentId);

           commentPromise.then(function (d) {
                console.log(d);
                swal({
                    title: "SUCCESS",
                    text: "Delete Done Successfully",
                    type: "success"
                });


            }, function (d) {
                swal({
                    title: "Error!",
                    text: "Something went wrong, please try again later",
                    type: "error"
                });
            });
        }

    });


