
angular.module('myApp').controller('addJobCtrl',
    function($rootScope,$scope, jobEntitiesService, jobRequestsService, authenticationService,$http,$q) {
        console.log(authenticationService.userProfile.provider_id);

        $scope.allTags = [];


        var tagsPromise = jobRequestsService.getSkills();

        tagsPromise.then(function (d) {
            $scope.skills = d;
            console.log($scope.skills);
            //alert($scope.skills.length);

            for (var i = 0; i < $scope.skills.length; i++) {
                alert( $scope.skills[i]);
                //console.log($scope.skills[i]);


                var skillsArray = $scope.skills[i].toLowerCase();
                skillsArray = skillsArray.split(",");


                for (var i = 0; i < skillsArray.length; i++) {
                    alert(skillsArray.length);

                    if ($scope.allTags.indexOf(skillsArray[i]) == -1) $scope.allTags.push(skillsArray[i]);

                    console.log($scope.allTags[i]);
                }
            }

            //console.log(skillsArray);

        });




        ////Tags
        //$scope.allTags = [
        //    { text: 'c#' },
        //    { text: 'c++' },
        //    { text: 'csharp' },
        //    { text: 'angular' },
        //    { text: 'javascript' },
        //    { text: 'vb' },
        //    { text: 'java' }
        //];


        $scope.tags = [

        ];
        $scope.loadTags = function(query) {
            return $scope.allTags;

        };

        $scope.addJob = function () {
                //alert($scope.title);
                var jp_id=authenticationService.userProfile.provider_id;

            console.log(jp_id);
            console.log($scope.tags);
            var tags='';
            for(var i=0;i<$scope.tags.length;i++){
                tags+=$scope.tags[i].text+",";
            }
            //alert(tags);
           var jobEntity = jobEntitiesService.jobEntity($scope.jobTitle,$scope.jobDescription,tags,jp_id);
           alert($scope.jobTitle);

           var jobPromise = jobRequestsService.addJob(jobEntity);

           jobPromise.then(function (d) {
                var jobs= d.data;
                $scope.jobId= jobs.jobId;
                $scope.jobTitle= jobs.jobTitle;
                $scope.jobDescription= jobs.jobDescription;

                $scope.jobProvider= jobs.jobProvider;

                $scope.publishDate=jobs.publishDate;

                $rootScope.jobs.unshift({jobId:jobs.jobId,jobTitle:jobs.jobTitle,jobDescription:jobs.jobDescription,jobTag:jobs.jobTag,jobProvider:jobs.jobProvider,publishDate:jobs.publishDate,Name:"Our Company"});

               console.log(d);
                swal({
                    title: "Success!",
                    text: "Your job Has been added! With name:"+d.data,
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
