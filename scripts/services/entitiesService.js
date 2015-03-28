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
            postUpdated.id=postId;
            return postUpdated;
        },

       messageEntity: function(content,jobseeker_id,to_id) {
            var message = {};     // new object

           message.content=content;
           message.jobseeker_id=jobseeker_id;
           message.to_id=to_id;
            return message;
        },
        jobEntity: function(title,body, tags) {
            var job = {};     // new object
            job.title = title;
            job.body=body;
            job.tags=tags;
            return job;
        },
        commentEntity: function(body,date) {
            var comment = {};     // new object

            comment.body=body;
            comment.date=date;
            return comment;
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
        }
    };

});
