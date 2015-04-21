
angular.module('servicesModule').factory('addToJobListRequestService', function($http,authenticationService) {
    return {

        addComment: function (addToJobListEntity) {
            var request = {};
            request.opcode = "addToJobListRequest";

            request.Entity =  addToJobListEntity;
            var addToJobListPromise = $http({
                method: 'POST',
                url: authenticationService.deploymentLink.link,
                //url: 'server/Jobseeker_Form.php',
                data: request
            });
            return addToJobListEntityPromise;
        }




    }});
