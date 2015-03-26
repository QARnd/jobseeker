/**
 * Created by rana on 3/17/2015.
 */

angular.module('servicesModule').factory('profileRequestService', function($http,authenticationService) {
    return {


        viewProfile: function (profileEntity) {
            var request = {};
            request.opcode = "viewProfileRequest";
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
