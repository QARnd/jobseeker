/**
 * Created by Omayma Abulrub on 12/1/2014.
 */


angular.module('servicesModule').factory('entitiesService', function() {

    return {
        postEntity: function(title,body,jobseeker_id) {
            var post = {};     // new object
            post.title = title;
            post.body=body;
            post.jobseeker_id=jobseeker_id;
            return post;
        },

        deleteJobEntity: function(id) {
            var deleteJob = {};     // new object
            deleteJob.id=id;
            return deleteJob;
        },

        updatePostEntity: function(title,body,postId) {
            var postUpdated = {};     // new object
            postUpdated.title = title;
            postUpdated.body=body;
            postUpdated.postId=postId;
            return postUpdated;
        },

       messageEntity: function(content,to_id,from_id) {
            var message = {};     // new object

           message.content=content;

           message.to_id=to_id;
           message.from_id=from_id;
            return message;
        },


        profileEntity: function(jobSeekerId) {
            var profile = {};     // new object
            profile.jobSeekerId = jobSeekerId;
            return profile;
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
        },
        getMessagesEntity: function(from_id,jobSeekerId){
            var message = {};     // new object
            message.from_id=from_id;
            message.jobSeekerId=jobSeekerId;
            return message;
        }
        ,
        addComment:function(postId,content,jobseeker_id){
            var comment = {};     // new object
            comment.postId=postId;
            comment.content=content;
            comment.jobseeker_id=jobseeker_id;
            return comment;
        }
    };

});
