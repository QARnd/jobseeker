/**
 * Created by GeniuCode Pointer on 3/4/2015.
 */

angular.module('myApp').controller('singlePostCtrl',
    function($scope, entitiesService, postRequestsService,$routeParams, authenticationService) {

        //hide the edit div
        $('#editPost').hide();
        $scope.js_id= authenticationService.userProfile.jobseekerId;
        $scope.postId=$routeParams.postId;






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



        //$scope.dis = true;
        $scope.toggle = function () {
            if($scope.dis)
                $('#editPost').show();
            else
                $('#editPost').hide();
            $scope.dis=!$scope.dis;
        }

        $scope.update = function () {
            $scope.dis = true;
            $('#editPost').hide();

            var postEntity = entitiesService.updatePostEntity($scope.title, $scope.body, $scope.postId);

            var postPromise = postRequestsService.updatePost(postEntity);
        }

    });
