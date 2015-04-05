/**
 * Created by rana on 4/4/2015.
 */



angular.module('myApp').controller('getCommentCtrl',
    function($scope, commentEntitiesService, commentRequestService, authenticationService) {

        $scope.user_id= authenticationService.userProfile.user_id;

        $scope.getComments=function(){

            var commentPromise = commentRequestService.getComment();

            commentPromise.then(function (d) {
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


        $scope.getComments();


    });
