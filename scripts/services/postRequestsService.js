/**
 * Created by GeniuCode Pointer on 12/2/2014.
 */

angular.module('servicesModule').factory('postRequestsService', function($http,authenticationService) {
    return {


        addPost: function(postEntity) {
            var request = {};
            request.opcode = "addPostRequest";
            request.Entity =postEntity;
            var postPromise=$http({
                method : 'POST',
                url : authenticationService.deploymentLink.link,
                //url: 'server/Jobseeker_Form.php',
                data: request
            });
            return postPromise;
        },

        getAllPosts: function() {
            var request = {};
            request.opcode = "getAllPostsRequest";
            var postPromise=$http({
                method : 'POST',
                url : authenticationService.deploymentLink.link,
                //url: 'server/Jobseeker_Form.php',
                data: request
            });
            return postPromise;
        },

        getAllPostsByPageNumber: function(pageScrolls) {
            var request = {};
            request.opcode = "getAllPostsByPageNumberRequest";
            request.pageScrolls =pageScrolls;
            var postPromise=$http({
                method : 'POST',
                url : authenticationService.deploymentLink.link,
                //url: 'server/Jobseeker_Form.php',
                data: request
            });
            return postPromise;
        },

        updatePost: function(updatePostEntity) {
            var request = {};
            request.opcode = "updatePostRequest";
            request.Entity =updatePostEntity;
            var postPromise=$http({
                method : 'POST',
                url : authenticationService.deploymentLink.link,
                //url: 'server/Jobseeker_Form.php',
                data: request
            });
            return postPromise;
        },

        getSinglePost: function(postId) {
            var request = {};
            request.opcode = "getSinglePostRequest";
            request.postId =postId;
            var postPromise=$http({
                method : 'POST',
                url : authenticationService.deploymentLink.link,
                //url: 'server/Jobseeker_Form.php',
                data: request
            });
            return postPromise;
        },
        deletePost: function(postId) {
            var request = {};

            request.opcode = "deletePostRequest";
            request.postId =postId;
            var postPromise=$http({
                method : 'POST',
                url : authenticationService.deploymentLink.link,
                //url: 'server/Jobseeker_Form.php',
                data: request
            });
            return postPromise;
        }
    }
});
