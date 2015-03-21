/**
 * Created by rana on 3/17/2015.
 */

angular.module('servicesModule').factory('profileRequestsService', function($http,authenticationService) {
    return {


        viewProfile: function (profileEntity) {
            var request = {};
            request.opcode = "viewProfileRequest";
            request.Entity = profileEntity;
            var profilePromise = $http({
                method: 'POST',
                url: authenticationService.deploymentLink.link,
                //url: 'server/Jobseeker_Form.php',
                data: request
            });
            return profilePromise;
        }
    }});
