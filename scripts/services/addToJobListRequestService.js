
angular.module('servicesModule').factory('addToJobListRequestService', function($http,authenticationService) {
    return {

        addToJobList: function (addToJobListEntity) {
            var request = {};
            request.opcode = "addToJobListRequest";

            request.Entity =  addToJobListEntity;
            var addToJobListPromise = $http({
                method: 'POST',
                url: authenticationService.deploymentLink.link,
                //url: 'server/Jobseeker_Form.php',
                data: request
            });
            return addToJobListPromise;
        },

        getJobList:function (jobListEntity) {
            var request = {};
            request.opcode = "getJobListRequest";

            request.Entity =  jobListEntity;
            var JobListPromise = $http({
                method: 'POST',
                url: authenticationService.deploymentLink.link,
                //url: 'server/Jobseeker_Form.php',
                data: request
            });
            return JobListPromise;
        },

        getFromJobListByPageNumber: function(scrollEntity) {
            var request = {};
            request.opcode = "getFromJobListByPageNumberRequest";
            request.Entity =scrollEntity;
            var postPromise=$http({
                method : 'POST',
                url : authenticationService.deploymentLink.link,
                //url: 'server/Jobseeker_Form.php',
                data: request
            });
            return postPromise;
        }




    }});
