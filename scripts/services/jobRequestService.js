angular.module('servicesModule').factory('jobRequestsService', function($http,authenticationService) {
    return {


        addJob: function (jobEntity) {
            var request = {};
            request.opcode = "addJobRequest";
            request.Entity = jobEntity;
            var jobPromise = $http({
                method: 'POST',
                url: authenticationService.deploymentLink.link,
                //url: 'server/Jobseeker_Form.php',
                data: request
            });
            return jobPromise;
        },
        updateJob: function(updateJobEntity) {
            var request = {};
            request.opcode = "updateJobRequest";
            request.Entity =updateJobEntity;
            var jobPromise=$http({
                method : 'POST',
                url : authenticationService.deploymentLink.link,
                //url: 'server/Jobseeker_Form.php',
                data: request
            });
            return jobPromise;
        },

        getSingleJob: function(jobId) {
            var request = {};
            request.opcode = "getSingleJobRequest";
            request.jobId =jobId;
            var jobPromise=$http({
                method : 'POST',
                url : authenticationService.deploymentLink.link,
                //url: 'server/Jobseeker_Form.php',
                data: request
            });
            return jobPromise;
        },

        getAllJobs: function() {
            var request = {};
            request.opcode = "getAllJobsRequest";
            var jobPromise=$http({
                method : 'POST',
                url : authenticationService.deploymentLink.link,
                //url: 'server/Jobseeker_Form.php',
                data: request
            });
            return jobPromise;
        },
        deleteJob: function(jobId) {
            var request = {};

            request.opcode = "deleteJobRequest";
            request.postId =jobId;
            var jobPromise=$http({
                method : 'POST',
                url : authenticationService.deploymentLink.link,
                //url: 'server/Jobseeker_Form.php',
                data: request
            });
            return jobPromise;
        },
        getAllJobsByPageNumber: function(pageScrolls) {
            var request = {};
            request.opcode = "getAllJobsByPageNumberRequest";
            request.pageScrolls =pageScrolls;
            var postPromise=$http({
                method : 'POST',
                url : authenticationService.deploymentLink.link,
                //url: 'server/Jobseeker_Form.php',
                data: request
            });
            return postPromise;
        }




    }});