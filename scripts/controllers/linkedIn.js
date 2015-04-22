/**
 * Created by GeniuCode Pointer on 3/5/2015.
 */
angular.module('myApp').controller('linkedInCtrl',
    function AppCtrl($scope,entitiesService,authenticationService,profileRequestService,addToJobListEntitiesService,addToJobListRequestService, $location, $rootScope, $http, linkedinService) {

        $scope.getUserProfile = function () {

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

///get last jobs
        $scope.getLastAddedJobs=function(){
            var js_id= authenticationService.userProfile.user_id;

            var lastJobsEntity = entitiesService.lastJobsEntity(js_id);

            var jobsPromise = linkedinService.getAllJobsFromLastId(lastJobsEntity);

            jobsPromise.then(function (d) {
                var jobs= d.data;
                var skills=authenticationService.userProfile.skills.split(",").split(" ");

                var clonedSkillsHash={};
                for(var skill in skills){
                    clonedSkillsHash[skill]=false;
                }

                var c=0;
                for(var i=0;i<jobs.length;i++){
                    c=0;
                    var skillsHash=clonedSkillsHash;

                    var jobTags=jobs[i].jobTag.split(",").split(" ");
                    for(var jobTag in jobTags){
                        if(skillsHash.contains(jobTag)){
                            skillsHash[jobTag]=true;
                        }
                    }
                    for(var skill in skills){
                        if(skillsHash[skill]==true) c++;
                    }
                    var similarity=(c/jobs[i].length)*100;

                    if(similarity>70){
                        var jobListEntity = addToJobListEntitiesService.addToJobListEntity(js_id,jobs[i].jobId,similarity);

                        var jobListPromise = addToJobListRequestService.addToJobList(jobListEntity);

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





            //logout and go to login screen
        $scope.logoutLinkedIn = function() {

            linkedinService.logout();

            delete linkedinService.getProfileData.resultData;
            delete authenticationService.userProfile.data
            //	$rootScope.loggedUser = false;

            $location.path("/login");
        };



    });

