/**
 * Created by GeniuCode Pointer on 3/4/2015.
 */

angular.module('myApp').controller('singlePostCtrl',
    function($scope, entitiesService, postRequestsService,$routeParams, authenticationService) {
        $scope.postId=$routeParams.postId;

        var postPromise = postRequestsService.getSinglePost($scope.postId);

        postPromise.then(function (d) {
            console.log(d);
            var post= d.data;
            $scope.title= post.title;
            $scope.body= post.body;



        }, function (d) {
            swal({
                title: "Error!",
                text: "Something went wrong, please try again later",
                type: "error"
            });
        });

    });
