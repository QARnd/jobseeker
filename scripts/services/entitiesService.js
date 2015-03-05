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
        },
        userEntity: function(firstName,lastName,email,linkedinId,profileUrl,pictureUrl,skills,educations,summary,industry,location) {

            var user = {};     // new object

            user.firstName=firstName;
            user.lastName = lastName;
            user.email = email;
            user.linkedinId = linkedinId;
            user.profileUrl = profileUrl;
            user.pictureUrl = pictureUrl;

            user.skills = skills;
            user.educations = educations;
            user.summary = summary;
            user.industry = industry;
            user.location = location;

            return user;
        }
    };

});
