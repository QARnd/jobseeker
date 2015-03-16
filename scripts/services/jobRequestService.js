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
        }


    }});