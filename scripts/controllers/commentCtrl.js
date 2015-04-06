/**
 * Created by rana on 4/4/2015.
 */



angular.module('myApp').controller('commentCtrl',
    function($rootScope,$scope, commentEntitiesService, commentRequestService,$routeParams, authenticationService) {

        $scope.auth_user_id= authenticationService.userProfile.user_id;
        //alert($scope.auth_user_id);
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

                $scope.comments.unshift({postId:comment.postId,content:comment.content,user_id:comment.userId,date:comment.date,fullname:comment.fullname,comment_id:comment.commentId});

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




        $scope.editComment=function(commentId,editedContent){
            var editCommentEntity = commentEntitiesService.editComment(commentId,editedContent);
            var commentPromise = commentRequestService.editComment(editCommentEntity);

           commentPromise.then(function (d) {
                console.log(d);



            }, function (d) {
                swal({
                    title: "Error!",
                    text: "Something went wrong, please try again later",
                    type: "error"
                });
            });
        }

        $scope.showModal = false;
        $scope.toggleModal = function(comment_id,content){
            $scope.showModal = !$scope.showModal;
            $scope.editedContent=content;
            $scope.editedCommentId=comment_id;
        };
});

angular.module('myApp').directive('modal', function () {
    return {
        template: '<div class="modal fade">' +
        '<div class="modal-dialog">' +
        '<div class="modal-content">' +
        '<div class="modal-header">' +
        '<button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>' +
        '<h4 class="modal-title">{{ title }}</h4>' +
        '</div>' +
        '<div class="modal-body" ng-transclude></div>' +
        '</div>' +
        '</div>' +
        '</div>',
        restrict: 'E',
        transclude: true,
        replace:true,
        scope:true,
        link: function postLink(scope, element, attrs) {
            scope.title = attrs.title;

            scope.$watch(attrs.visible, function(value){
                if(value == true)
                    $(element).modal('show');
                else
                    $(element).modal('hide');
            });

            $(element).on('shown.bs.modal', function(){
                scope.$apply(function(){
                    scope.$parent[attrs.visible] = true;
                });
            });

            $(element).on('hidden.bs.modal', function(){
                scope.$apply(function(){
                    scope.$parent[attrs.visible] = false;
                });
            });
        }
    };
});
