/**
 * Created by rana on 3/31/2015.
 */

angular.module('servicesModule').factory('jobEntitiesService', function() {

    return {

        jobEntity: function (jobTitle, jobDescrbtion, jobTag) {
            var job = {};     // new object
            job.jobTitle = jobTitle;
            job.jobDescrbtion = jobDescrbtion;
            job.jobTag = jobTag;
            return job;


        },
        deleteJobEntity: function(id) {
            var deleteJob = {};     // new object
            deleteJob.id=id;
            return deleteJob;
        },

        updateJobEntity: function(jobTitle,jobDescrbtion,jobTag,jobId) {
            var jobUpdated = {};     // new object
            jobUpdated.jobTitle = jobTitle;
            jobUpdated.jobDescrbtion = jobDescrbtion;
            jobUpdated.jobTag=jobTag;
            jobUpdated.jobId=jobId;
            return jobUpdated;
        }
    }
});
