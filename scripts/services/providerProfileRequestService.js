/**
 * Created by rana on 5/16/2015.
 */

angular.module('servicesModule').factory('providerProfileRequestService', function($http,authenticationService) {
    return {

        viewProviderProfile: function (profileEntity) {
            var request = {};
            request.opcode = "viewProviderProfileRequest";
            request.Entity = profileEntity;
            var viewPromise = $http({
                method: 'POST',
                url: authenticationService.deploymentLink.link,
                //url: 'server/Jobseeker_Form.php',
                data: request
            });
            return viewPromise;
        },getJobs:function (getJobsEntity) {
            var request = {};
            request.opcode = "getJobsForJobProviderRequest";
            request.Entity = getJobsEntity;
            var viewPromise = $http({
                method: 'POST',
                url: authenticationService.deploymentLink.link,
                //url: 'server/Jobseeker_Form.php',
                data: request
            });
            return viewPromise;
        },
        getApplies:function (appliesEntity) {
            var request = {};
            request.opcode = "getAppliesRequest";
            request.Entity = appliesEntity;
            var appliesPromise = $http({
                method: 'POST',
                url: authenticationService.deploymentLink.link,
                //url: 'server/Jobseeker_Form.php',
                data: request
            });
            return appliesPromise;
        }


    }});
