/**
 * Created by rana on 3/31/2015.
 */

angular.module('servicesModule').factory('jobEntitiesService', function() {

    return {

        jobEntity: function (jobTitle, jobDescription, jobTag,jp_id) {
            var job = {};     // new object
            job.jobTitle = jobTitle;
            job.jobDescription = jobDescription;
            job.jobTag = jobTag;
           job.jp_id = jp_id;
            return job;



        },
        checkValidityEntity:function(jobprovider_id){
            var jobProvider = {};     // new object
            jobProvider.jobprovider_id=jobprovider_id;
            return jobProvider;
        },
        deleteJobEntity: function(id) {
            var deleteJob = {};     // new object
            deleteJob.id=id;
            return deleteJob;
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
