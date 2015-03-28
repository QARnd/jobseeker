/**
 * Created by GeniuCode Pointer on 3/4/2015.
 */

angular.module('myApp').controller('singlePostCtrl',
    function($scope, entitiesService, postRequestsService,$routeParams, authenticationService) {

        $scope.jobseeker_id= authenticationService.userProfile.jobseekerId;
        $scope.postId=$routeParams.postId;
        $scope.dis=true;
        $scope.toggle = function() {
            $scope.dis = !$scope.dis;
        }

        var postPromise = postRequestsService.getSinglePost($scope.postId);


        postPromise.then(function (d) {
            console.log(d);
            var post= d.data;
            $scope.id= post.id;
            $scope.title= post.title;
            $scope.body= post.body;
            $scope.jobseeker_id=post.jobseeker_id;
            $scope.status=post.status;


        }, function (d) {
            swal({
                title: "Error!",
                text: "Something went wrong, please try again later",
                type: "error"
            });
        });

    });
