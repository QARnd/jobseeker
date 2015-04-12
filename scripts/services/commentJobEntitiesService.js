/**
 * Created by rana on 4/10/2015.
 */


angular.module('servicesModule').factory('commentJobEntitiesService', function() {

    return {
        addComment:function(jobId,content,user_id,full_name){
            var comment = {};     // new object
            comment.jobId=jobId;
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
        getComments:function(jobId){
            var comment = {};     // new object
            comment.jobId=jobId;
            return comment;
        },
        deleteCommentEntity: function(commentId) {
            var commentDeleted = {};     // new object
            commentDeleted.commentId=commentId;
            return commentDeleted;
        }

    };

});



