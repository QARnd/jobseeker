
angular.module('myApp').controller('addPostCtrl',
    function($rootScope, $scope, entitiesService, postRequestsService, authenticationService) {

            console.log(authenticationService.userProfile.jobseekerId);


            $scope.addPost = function () {
                //alert($scope.title);
               var jobseeker_id=authenticationService.userProfile.jobseekerId;
                var fullname=authenticationService.userProfile.full_name;

            var postEntity = entitiesService.postEntity($scope.title,$scope.body,jobseeker_id,fullname);

            var postPromise = postRequestsService.addPost(postEntity);


            postPromise.then(function (d) {
                var post= d.data;
                $scope.postId= post.id;
                $scope.body= post.body;
                $scope.title= post.title;
                $scope.status= post.status;
                $scope.jobseeker_id= post.jobseeker_id;

                $scope.publish_date=post.publish_date;

                $rootScope.posts.unshift({id:post.id,title:post.title,body:post.body,status:post.status,jobseeker_id:post.jobseeker_id,publish_date:post.publish_date});


                
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
