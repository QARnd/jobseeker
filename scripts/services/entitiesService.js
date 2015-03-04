/**
 * Created by Omayma Abulrub on 12/1/2014.
 */


angular.module('servicesModule').factory('entitiesService', function() {

    return {
        postEntity: function(title,body) {
            var post = {};     // new object
            post.title = title;
            post.body=body;
            return post;
        },
        commentEntity: function(body,date) {
            var comment = {};     // new object

            comment.body=body;
            comment.date=date;
            return comment;
        }
    };

});
