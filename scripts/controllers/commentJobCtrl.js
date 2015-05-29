/**
 * Created by rana on 4/11/2015.
 */



angular.module('myApp').controller('commentJobCtrl',
    function($rootScope,$scope, commentJobEntitiesService, commentJobRequestService,$routeParams, authenticationService) {

        $scope.auth_user_id= authenticationService.userProfile.user_id;
        //alert($scope.auth_user_id);
        $scope.getComments=function(){
            var jobId=$routeParams.jobId;


            $scope.jobComments=[

            ];
            var getCommentEntity = commentJobEntitiesService.getComments(jobId);
            var jobPromise =commentJobRequestService.getComments(getCommentEntity);

            jobPromise.then(function (d) {
                console.log(d);
                $scope.jobComments= d.data;



            }, function (d) {
                swal({
                    title: "Error!",
                    text: "Something went wrong, please try again later",
                    type: "error"
                });
            });

        };






        $scope.addComment = function () {
            var jobId=$routeParams.jobId;
            //alert(postId);
            var user_id="";
            var fullname="";

            if (authenticationService.userProfile.user_type==1)
            {
                user_id=authenticationService.userProfile.jobseekerId;
                alert(user_id);
                fullname=authenticationService.userProfile.full_name;
                alert(fullname);
            }
            else
            {
                user_id=authenticationService.userProfile.provider_id;
                alert(user_id);
                fullname=authenticationService.userProfile.companyName;
                alert(fullname);
            }

            var commentEntity = commentJobEntitiesService.addComment(jobId,$scope.content,user_id,fullname);

            var commentPromise = commentJobRequestService.addComment(commentEntity);


            commentPromise.then(function (d) {
                console.log(d);
                var comment= d.data;
                $scope.jobId= comment.jobId;
                $scope.content= comment.content;
                $scope.user_id= comment.userId;

                $scope.date=comment.date;

                $scope.jobComments.unshift({job_id:comment.jobId,content:comment.content,user_id:comment.userId,date:comment.date,fullname:comment.fullname,comment_id:comment.commentId});

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








        $scope.showModal = false;
        $scope.toggleModal = function(comment_id,content){
            $scope.showModal = !$scope.showModal;
            $scope.editedContent=content;
            $scope.editedCommentId=comment_id;
        };

        $scope.editComment=function(editedCommentId,editedContent){
            //alert(editedCommentId+"  "+editedContent);
            for (var i=0; i<$scope.jobComments.length; i++) {
                if ($scope.jobComments[i].comment_id == editedCommentId) {
                    $scope.jobComments[i].content = editedContent;
                    break;
                }
            }
            $scope.showModal = false;

            var editCommentEntity = commentJobEntitiesService.editComment(editedCommentId,editedContent);
            var commentPromise = commentJobRequestService.editComment(editCommentEntity);

            commentPromise.then(function (d) {
                console.log(d);

                //edit comment in client



            }, function (d) {
                swal({
                    title: "Error!",
                    text: "Something went wrong, please try again later",
                    type: "error"
                });
            });
        }

        $scope.deleteComment=function(commentId) {
            //console.log(commentId);
            swal({
                    title: "Are you sure?",
                    text: "Delete!",
                    type: "warning",
                    showCancelButton: true,
                    confirmButtonColor: "#DD6B55",
                    confirmButtonText: "Yes, delete!",
                    closeOnConfirm: true },
                function() {

                    var deleteCommentEntity = commentJobEntitiesService.deleteCommentEntity(commentId);
                    var commentPromise = commentJobRequestService.deleteComment(deleteCommentEntity);


                    //delete comment
                    for (var i = 0; i < $scope.jobComments.length; i++) {
                        if ($scope.jobComments[i].comment_id == commentId) {
                            $scope.jobComments.splice(i, 1);
                            break;
                        }
                    }


                    commentPromise.then(function (d) {
                        //console.log(d);

                        //
                        //swal({
                        //    title: "Comment Has Been Deleted Successfully",
                        //    text: "SUCCESS",
                        //    type: "success"
                        //});

                    }, function (d) {
                        swal({
                            title: "Error!",
                            text: "Something went wrong, please try again later",
                            type: "error"
                        });
                    });
                }
            );

        }


    });
