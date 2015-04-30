/**
 * Created by happy on 4/29/2015.
 */
angular.module('servicesModule').factory('remainderRequestService', function($http,authenticationService) {
    return {

        getRemainders: function (remainderEntity) {
            var request = {};
            request.opcode = "getRemainderRequest";
            request.Entity = remainderEntity;
            var remainderPromise = $http({
                method: 'POST',
                url: authenticationService.deploymentLink.link,
                //url: 'server/Jobseeker_Form.php',
                data: request
            });
            return remainderPromise;
        }

    }});
