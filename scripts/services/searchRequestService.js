/**
 * Created by rana on 4/13/2015.
 */


angular.module('servicesModule').factory('searchRequestService', function($http,authenticationService) {
    return {

        searchEntity: function (searchEntity) {
            var request = {};
            request.opcode = "searchRequest";
            request.Entity = searchEntity;
            var searchPromise = $http({
                method: 'POST',
                url: authenticationService.deploymentLink.link,
                //url: 'server/Jobseeker_Form.php',
                data: request
            });
            return searchPromise;
        }


    }});
