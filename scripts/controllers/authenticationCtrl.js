angular.module('myApp')
    .controller('authenticationCtrl', function ($scope,authenticationService,initially) {
        $scope.userProfile=authenticationService.userProfile;
        $scope.notificationsList=initially.notificationsList;
        //var promise=initially.getTags();
        //
        //promise.then(
        //    function(d){
        //        //	alert("successTags");
        //
        //
        //        initially.getUserTypes.userTypes = d.data.userTypes;
        //        initially.getTagsArr.resultTagsArr=d.data.tags;
        //        initially.getCurrentMaxPostId.CurrentMaxPostId=d.data.currentCounterforPost;
        //        initially.getUsersArr.userList=d.data.userList;
        //        console.log(d.data.userList);},
        //
        //    function(d){alert("errorrrrrrrTags")});



    });
