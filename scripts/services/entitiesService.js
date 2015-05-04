/**
 * Created by Omayma Abulrub on 12/1/2014.
 */


angular.module('servicesModule').factory('entitiesService', function() {

    return {
        postEntity: function(title,body,jobseeker_id,fullname) {
            var post = {};     // new object
            post.title = title;
            post.body=body;
            post.jobseeker_id=jobseeker_id;
            post.fullname=fullname;
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
        getMessagesEntity: function(from_id,to_id){
            var message = {};     // new object
            message.from_id=from_id;
            message.to_id=to_id;
            return message;
        },
        createAccountEntity: function(name,email,description,location) {
            var account = {};     // new object
            account.name = name;
            account.email=email;
            account.description=description;
            account.location=location;
            return account;
        },
        lastJobsEntity: function(js_id) {
            var job = {};     // new object
            job.js_id = js_id;
            return job;
        }
       // addMessageJobProviderEntity: function(emailSend,content) {
          //  var message = {};     // new object
        // message.emailSend=emailSend;
           // message.content=content;


          //  return message;
      //  }

    };


});
