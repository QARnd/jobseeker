/**
 * Created by GeniuCode Pointer on 3/5/2015.
 */
angular.module('myApp').controller('linkedInCtrl',
    function AppCtrl($scope,entitiesService,authenticationService,profileRequestService,jobListEntitiesService,jobListRequestService, $location, $rootScope, $http, linkedinService) {

        $scope.getUserProfile = function () {


            $scope.addToJobList();



            linkedinService.getProfile(function(err, result){
                if(err){
                    alert('ERROR');

                }else{
                    //Arrays To Strings
                    var educations=result.values[0].educations.values;
                    var educationStr='';
                    try{
                        for(var i=0;i<educations.length;i++){
                            educationStr+=educations[i].degree+",";
                        }
                    }catch(err){
                        educationStr='';
                    }



                    var skillStr='';
                    try{
                        var skills=result.values[0].skills.values;
                        var jobs=result.values[0].jobs.values;
                        var p=skills.length/100;
                        var percentage=0;
                        for(var j=0;j<jobs.length;j++){
                            for(var i=0;i<skills.length;i++){
                               if(skills[i].skill.name+","==jobs[j].job.tage+",")
                               { percentage+=p;
                                   breake;}
                            }

                        }

                    }catch(err){
                        skillStr='';
                    }





                    var userEntity=entitiesService.userEntity(result.values[0].firstName,result.values[0].lastName,
                        result.values[0].emailAddress,result.values[0].id,result.values[0].publicProfileUrl,result.values[0].pictureUrl,skillStr,educationStr,result.values[0].summary,result.values[0].industry,result.values[0].location.name);

                    var userPromise=linkedinService.loginRequest(userEntity);

                    userPromise.then(
                        function(d){
                            console.log(d.data);

                            if(d.data.userStatus!="UnauthorizedUser")
                            {
                                authenticationService.userProfile.jobseekerId=d.data.replace("\n","").replace("\r","").replace(" ","");
                                authenticationService.userProfile.user_id=d.data.replace("\n","").replace("\r","").replace(" ","");
                                authenticationService.userProfile.full_name=result.values[0].firstName+" "+result.values[0].lastName;

                                result.values[0].userId=d.data.jobseeker_id;

                                result.values[0].loggedIn=true;
                                authenticationService.userProfile.data=result.values[0];
                                authenticationService.userLoggedIn.status=true;
                                //alert(angular.toJson(authenticationService.userProfile.data))
                                //alert("chekLogin");

                                $location.path("/newsFeed");
                            }
                            else{
                                alert("error");
                                $scope.logoutLinkedIn();
                                $location.path("/login");
                            }
                        },
                        function(d){
                            alert("Login Error");
                        }
                    );

                }
            });




        };



        $scope.getAllJobsFromLastId=function() {

            //var last_id=authenticationService.jobs.lastId;

            //var jobsToMatch=entitiesService.getAllJobsFromLastId(last_id);

            $scope.js_id= authenticationService.userProfile.jobseekerId;

            var jobsPromise = profileRequestService.getAllJobsFromLastId(js_id);

            jobsPromise.then(function (d) {
                console.log(d);
                $rootScope.matched= d.data;

                $scope.skills="";
                try{
                    $rootScope.skills=result.values[0].skills.values;
                }

                catch(err){

                }

                for (var x = 0; x < $rootScope.matched.length; x++) {

                    //$scope.skills="";
                    //try{
                    //    $scope.skills=matched.skills.split(',');
                    //}

                    $scope.matched[x].tags="";
                    try{
                        $scope.matched[x].tags=matched[x].tags.split(',');
                    }catch(err){

                    }

                    var counter=0;
                    for(var i=0;i<tags.length;i++){
                        for(var j=0;j<skills.length;j++){
                            if(tags[i]==skills[j]) {
                                counter++;
                            }
                        }
                        var similarity=(counter*100)/(i+1);

                        $scope.addToJobList()

                    }

                }


            }, function (d) {
                swal({
                    title: "Error!",
                    text: "Something went wrong, please try again later",
                    type: "error",
                    timer: 2000
                });
            });
        }



        $scope.addToJobList=function(){
            var jobListEntity = jobListEntitiesService.addToJobListEntity($scope.title,$scope.body,jobseeker_id,fullname);

            var postPromise = jobListRequestService.addToJobList(jobListEntity);


            postPromise.then(function (d) {
                var job = d.data;
                $scope.jobId = job.jobId;
                $scope.similarity = job.similarity;
                $scope.jobseekerId = job.jobseekerId;
                $scope.id = job.id;


                $rootScope.jobList.unshift({
                    id: job.id,
                    similarity: job.similarity,
                    jobseekerId: job.jobseekerId,
                    jobId: job.jobId

                });


            }, function (d) {
            swal({
                title: "Error!",
                text: "Something went wrong, please try again later",
                type: "error",
                timer: 2000
            });
        });



        }

        setTimeout(addToJobList(),5000);




            //logout and go to login screen
        $scope.logoutLinkedIn = function() {

            //var lastIdPromise = profileRequestService.getLastId();
            //
            //lastIdPromise.then(function (d) {
            //    console.log(d);
            //    $rootScope.lastId= d.lastId;
            //
            //
            //
            //}, function (d) {
            //    swal({
            //        title: "Error!",
            //        text: "Something went wrong, please try again later",
            //        type: "error"
            //    });
            //});

            $scope.js_id= authenticationService.userProfile.jobseekerId;

            var idPromise = profileRequestService.getLastId(js_id); // getLastId() (from services) ... the server find the lastJobId and insert it to the jobseekers table wher id=js_id

            //authenticationService.jobs.lastId=d.data.jobId;
            //result.values[0].lastId=d.data.last_id;


            //idPromise.then(function (d) {
            //
            //    console.log(d.data);
            //    authenticationService.jobs.lastId=d.data.last_id; //last_id (from server)
            //
            //}, function (d) {
            //    swal({
            //        title: "Error!",
            //        text: "Something went wrong, please try again later",
            //        type: "error",
            //        timer: 2000
            //    });
            //});




            linkedinService.logout();

            delete linkedinService.getProfileData.resultData;
            delete authenticationService.userProfile.data
            //	$rootScope.loggedUser = false;

            $location.path("/login");
        };



    });

