/**
 * Created by rana on 3/31/2015.
 */

angular.module('servicesModule').factory('jobEntitiesService', function() {

    return {

        jobEntity: function (jobTitle, jobDescription, jobTag) {
            var job = {};     // new object
            job.jobTitle = jobTitle;
            job.jobDescription = jobDescription;
            job.jobTag = jobTag;
            return job;



        },
        deleteJobEntity: function(id) {
            var deleteJob = {};     // new object
            deleteJob.id=id;
            return deleteJob;
        },
        applyForJobEntity:function(jobId,providerId,jobseeker_id){
            var apply = {};     // new object
            apply.jobId=jobId;
            apply.providerId=providerId;
            apply.jobseeker_id=jobseeker_id;
            return apply;
        },
        updateJobEntity: function(jobTitle,jobDescription,jobTag,jobId) {
            var jobUpdated = {};     // new object
            jobUpdated.jobTitle = jobTitle;
            jobUpdated.jobDescription = jobDescription;
            jobUpdated.jobTag=jobTag;
            jobUpdated.jobId=jobId;
            return jobUpdated;
        }
    }
});
