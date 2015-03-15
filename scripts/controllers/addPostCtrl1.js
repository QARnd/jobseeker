
angular.module('myApp').controller('addPostCtrl',
    function($scope, entitiesService, postRequestsService, authenticationService) {

            $scope.addPost = function () {
                alert($scope.title);
            var postEntity = entitiesService.postEntity($scope.title,nl2br($scope.body));

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
