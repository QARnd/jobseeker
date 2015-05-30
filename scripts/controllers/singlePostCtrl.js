

angular.module('myApp').controller('singlePostCtrl',
    function($scope, entitiesService, postRequestsService,$routeParams, authenticationService) {

        //hide the edit div
        $('#editPost').hide();
        $scope.js_id= authenticationService.userProfile.jobseekerId;
        $scope.postId=$routeParams.postId;


        $scope.check=function(){
            if (authenticationService.userProfile.user_type==1)
            {
                return 1;
            }
            else
            {
                return 2;
            }
        };


        var postPromise = postRequestsService.getSinglePost($scope.postId);


        postPromise.then(function (d) {
            console.log(d);
            var post= d.data;
            $scope.id= post.id;
            $scope.title= post.title;
            $scope.body= post.body;
            $scope.jobseeker_id=post.jobseeker_id;
            $scope.publish_date=post.publish_date;
            $scope.status=post.status;
            $scope.fullname=post.fullname;


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
