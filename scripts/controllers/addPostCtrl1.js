
angular.module('myApp').controller('addPostCtrl',
    function($scope, entitiesService, postRequestsService, authenticationService) {

            console.log(authenticationService.userProfile.jobseekerId);


            $scope.addPost = function () {
                alert($scope.title);
               var jobseeker_id=authenticationService.userProfile.jobseekerId;

            var postEntity = entitiesService.postEntity($scope.title,$scope.body,jobseeker_id);

            var postPromise = postRequestsService.addPost(postEntity);


            postPromise.then(function (d) {
                swal({
                    title: "Success!",
                    text: "Your Post Has been Published! With Title:"+d.data,
                    type: "success",
                    timer: 5000
                });


            }, function (d) {
                swal({
                    title: "Error!",
                    text: "Something went wrong, please try again later",
                    type: "error",
                    timer: 2000
                });
            });
        };

    });
