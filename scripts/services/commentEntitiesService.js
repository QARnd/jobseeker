/**
 * Created by rana on 4/4/2015.
 */



angular.module('servicesModule').factory('commentEntitiesService', function() {

    return {
        addComment:function(postId,content,user_id){
            var comment = {};     // new object
            comment.postId=postId;
            comment.content=content;
            comment.user_id=user_id;
            return comment;
        }

    };

});



