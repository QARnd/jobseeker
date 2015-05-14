/**
 * Created by rana on 4/10/2015.
 */


angular.module('servicesModule').factory('commentJobRequestService', function($http,authenticationService) {
    return {

        addComment: function (commentEntity) {
            var request = {};
            request.opcode = "addCommentJobRequest";

            request.Entity =  commentEntity;
            var commentPromise = $http({
                method: 'POST',
                url: authenticationService.deploymentLink.link,
                //url: 'server/Jobseeker_Form.php',
                data: request
            });
            return commentPromise;
        }
        ,
        getComments: function (getCommentEntity) {
            var request = {};
            request.opcode = "getCommentsJobRequest";
            request.Entity =  getCommentEntity;
            var commentPromise = $http({
                method: 'POST',
                url: authenticationService.deploymentLink.link,
                //url: 'server/Jobseeker_Form.php',
                data: request
            });
            return commentPromise;
        },

        deleteComment: function(deleteCommentEntity) {
            var request = {};

            request.opcode = "deleteCommentJobRequest";

            request.Entity =deleteCommentEntity;
            var commentPromise=$http({
                method : 'POST',
                url : authenticationService.deploymentLink.link,
                //url: 'server/Jobseeker_Form.php',
                data: request
            });
            return commentPromise;
        },


        editComment: function(editCommentEntity) {
            var request = {};

            request.opcode = "editCommentJobRequest";
            request.Entity =editCommentEntity;
            var commentPromise=$http({
                method : 'POST',
                url : authenticationService.deploymentLink.link,
                //url: 'server/Jobseeker_Form.php',
                data: request
            });
            return commentPromise;
        }



    }});