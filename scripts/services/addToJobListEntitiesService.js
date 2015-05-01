angular.module('servicesModule').factory('addToJobListEntitiesService', function() {

    return {

        addToJobListEntity: function (js_id,jobId,similarity) {
            var jobList = {};     // new object
            jobList.js_id = js_id;
            jobList.jobId = jobId;
            jobList.similarity = similarity;

            return jobList;

        },

        getJobListEntity:function(js_id) {
            var jobList = {};     // new object
            jobList.js_id=js_id;
            return jobList;
        }
    }
});

