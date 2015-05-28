/**
 * Created by rana on 5/16/2015.
 */

angular.module('servicesModule').factory('providerProfileEntitiesService', function() {

    return {

        profileProviderEntity: function(jobprovider_id) {
            var profile = {};     // new object
            profile.jobprovider_id = jobprovider_id;
            return profile;
        },
        getJobsEntity:function(jobprovider_id) {
            var job = {};     // new object
           job.jobprovider_id = jobprovider_id;
            return job;
        },
        getApplies:function(jobId) {
            var apply = {};     // new object
            apply.jobId = jobId;
            return apply;
        }
    };


});
