
angular.module('myApp').controller('getCommentsCtrl',
    function($scope, entitiesService,commentEntitiesService, commentRequestService,$routeParams, authenticationService) {
        console.log(authenticationService.userProfile.data);
        $scope.user_id= authenticationService.userProfile.user_id;


        $scope.getComments=function(){
            var postId=$routeParams.postId;


            $scope.comments=[

            ];
            var getCommentEntity = commentEntitiesService.getComments(postId);
            var postPromise =commentRequestService.getComments(getCommentEntity);

            postPromise.then(function (d) {
                console.log(d);
                $scope.comments= d.data;



            }, function (d) {
                swal({
                    title: "Error!",
                    text: "Something went wrong, please try again later",
                    type: "error"
                });
            });

        }


        //$scope.getComments();
    });
