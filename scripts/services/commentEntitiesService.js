/**
 * Created by rana on 4/4/2015.
 */



angular.module('servicesModule').factory('commentEntitiesService', function() {

    return {
        addComment:function(postId,content,user_id,full_name){
            var comment = {};     // new object
            comment.postId=postId;
            comment.content=content;
            comment.user_id=user_id;
            comment.full_name=full_name;
            return comment;
        },
        editComment:function(commentId,content){
            var comment = {};     // new object
            comment.commentId=commentId;
            comment.content=content;

            return comment;
        },
        getComments:function(postId){
            var comment = {};     // new object
            comment.postId=postId;
            return comment;
        },
        deleteCommentEntity: function(commentId) {
            var commentDeleted = {};     // new object
            commentDeleted.commentId=commentId;
            return commentDeleted;
        }

    };

});



