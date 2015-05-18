/**
 * Created by rana on 5/18/2015.
 */


angular.module('servicesModule').factory('synonymsRequestService', function($http,authenticationService) {
    return {


        getSynonyms: function () {
            var request = {};
            request.opcode = "getSynonymsRequest";
            var SynonymsPromise = $http({
                method: 'POST',
                url: authenticationService.deploymentLink.link,
                //url: 'server/Jobseeker_Form.php',
                data: request
            });
            return SynonymsPromise;
        }



    }});

