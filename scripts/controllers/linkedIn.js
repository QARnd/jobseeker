/**
 * Created by GeniuCode Pointer on 3/5/2015.
 */
angular.module('myApp').controller('linkedInCtrl',
    function AppCtrl($scope,entitiesService,notificationRequestService,notificationEntityService,authenticationService,profileRequestService,addToJobListEntitiesService,addToJobListRequestService, $location, $rootScope, $http, linkedinService) {

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
                        for(var i=0;i<skills.length;i++){
                            skillStr+=skills[i].skill.name+",";
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


                                $scope.getLastAddedJobs(skillStr);
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
        $scope.getLastAddedJobs=function(skillStr){

            var js_id= authenticationService.userProfile.user_id;
            var similarity=(c/jobTags.length)*100;
            var countNot=0;
            var lastJobsEntity = entitiesService.lastJobsEntity(js_id);

            var jobsPromise = linkedinService.getAllJobsFromLastId(lastJobsEntity);

            jobsPromise.then(function (d) {
                var jobs= d.data;
                alert(skillStr);
                var skills=skillStr.split(",");

                console.log(skills);
                var c=0;
                for(var i=0;i<jobs.length;i++){
                    c=0;
                    var skillsHash=skills;

                    var jobTags=jobs[i].jobTag.split(",");
                    console.log(jobTags);
                    for(var j=0;j<jobTags.length;j++){
                        var jobTag=jobTags[j];

                        if ($.inArray(jobTag, skillsHash) >= 0) {
                            c++;
                            alert(jobTag);
                        }
                    }





                    if(similarity>70){
                        countNot++;
                        var jobListEntity = addToJobListEntitiesService.addToJobListEntity(js_id,jobs[i].jobId,similarity);

                        var jobListPromise = addToJobListRequestService.addToJobList(jobListEntity);
                        jobListPromise.then(function (d) {
                            console.log(jobListEntity);
                        }, function (d) {
                            swal({
                                title: "Error!",
                                text: "Something went wrong, please try again later",
                                type: "error",
                                timer: 2000
                            });
                        });
                    }

                }

                $scope.Notifications=[

                ];
                var js_id = authenticationService.userProfile.jobseekerId;
                var NotificationEntity = notificationEntityService.notificationsEntity(js_id,countNot);
                var NotificationPromise = notificationRequestService.getNotifications(NotificationEntity);

                NotificationPromise.then(function (d) {
                    console.log(d);

                    var Notifications = d.data;
                    $scope.counteNot=Notifications.counteNot;
                    $scope.content=Notifications.content;
                    $scope.jobId=Notifications.jobId;

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






            //logout and go to login screen
        $scope.logoutLinkedIn = function() {

            linkedinService.logout();

            delete linkedinService.getProfileData.resultData;
            delete authenticationService.userProfile.data;
            //	$rootScope.loggedUser = false;

            $location.path("/login");
        };



    });

