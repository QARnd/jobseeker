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
        }


    }});
