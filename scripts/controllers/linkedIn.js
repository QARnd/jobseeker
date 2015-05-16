/**
 * Created by GeniuCode Pointer on 3/5/2015.
 */
angular.module('myApp').controller('linkedInCtrl',
    function AppCtrl($scope,entitiesService,notificationRequestService,remainderRequestService,remainderEntityService,msgsRequestService,notificationEntitiesService,msgsEntitiesService,authenticationService,profileRequestService,addToJobListEntitiesService,addToJobListRequestService, $location, $rootScope, $http, linkedinService) {
        $('#loadMoreJobNotification').hide();
        $scope.pageScrolls=1;
        $scope.getUserProfile = function () {

            linkedinService.getProfile(function(err, result){
                if(err){
                    alert('ERROR');

                }else{
                    //Arrays To Strings
                    //var educations=result.values[0].educations.values;
                    var educationStr='';
                    //try{
                    //    for(var i=0;i<educations.length;i++){
                    //        educationStr+=educations[i].degree+",";
                    //    }
                    //}catch(err){
                    //    educationStr='';
                    //}



                    var skillStr='';

                    $scope.getSkills = function () {

                        var js_id = authenticationService.userProfile.user_id;
                        //alert(js_id);
                        //alert($scope.user_id);
                        var getSkillsEntity = entitiesService.getSkillsEntity(js_id);
                        var skillsPromise =profileRequestService.getSkills(getSkillsEntity);

                        skillsPromise.then(function (d) {
                            console.log(d.data);
                            $scope.mySkills = d.data;
                            alert($scope.mySkills);

                            //
                            //$scope.mySkills=$scope.mySkills.toLowerCase();
                            //var skills=$scope.mySkills.split(",");


                            var skillsWithSynonyms = [];
                            var skills=[];

                            //$scope.mySkills=$scope.mySkills.toLowerCase();

                            skills = $scope.mySkills.split(",");

                            //var skills = result.values[0].skills.values;

                            //skillsWithSynonyms[0]=skills[0].skill.name.toLowerCase();
                            //skillStr+=skillsWithSynonyms[0];

                            //for (var i = 0; i < skills.length; i++) {
                            //    skillsWithSynonyms[i] = skills[i].toLowerCase().replace('"','');
                            //    //skillStr+=","+skillsWithSynonyms[i];
                            //    //skillsWithSynonyms[i] = skills[i].replace('"','');
                            //
                            //    //alert(skillsWithSynonyms[i]);
                            //    //alert(skillStr);
                            //
                            //}
                            //console.log(skillsWithSynonyms);
                            //alert(skillsWithSynonyms.length);

                            for (var j = 0; j < skillsWithSynonyms.length; j++) {
                                //alert(skillsWithSynonyms[j]);
                                var x = skillsWithSynonyms[j];
                                var synonymsEntity = entitiesService.synonymsEntity(x);
                                //alert("synonymsEntity");

                                var synonymsPromise = linkedinService.getSkillsWithSynonyms(synonymsEntity);
                                //alert("synonymsPromise");

                                synonymsPromise.then(function (d) {
                                    var synonyms = d.data;
                                    //console.log(synonyms);
                                    //$scope.terms = synonyms.term;
                                    //$scope.termsSynonyms = synonyms.termSynonyms;

                                    //console.log($scope.terms);
                                    //alert(synonyms.length);

                                    //alert($scope.term);

                                    for (var i = 0; i < synonyms.length; i++) {
                                        $scope.terms = synonyms[i].term;
                                        $scope.termsSynonyms = synonyms[i].termSynonyms;
                                        //alert(i);
                                        //alert(synonyms.length);

                                        //alert(skillsWithSynonyms.indexOf($scope.terms));
                                        //console.log(skillsWithSynonyms);

                                        if (skillsWithSynonyms.indexOf($scope.terms) == -1) skillsWithSynonyms.push($scope.terms);
                                        if (skillsWithSynonyms.indexOf($scope.termsSynonyms) == -1) skillsWithSynonyms.push($scope.termsSynonyms);
                                        //alert(skillsWithSynonyms.length);

                                    }

                                })


                            }
                            console.log(skillsWithSynonyms);

                            skillStr += skillsWithSynonyms[0];

                            //alert(skillsWithSynonyms.length);

                            for (var i = 1; i < skillsWithSynonyms.length; i++) {

                                //alert(skillsWithSynonyms.length);
                                //alert(skillsWithSynonyms[i]);

                                skillStr += "," + skillsWithSynonyms[i];
                                //alert(skillStr);


                            }
                            alert(skillStr);

                            //var skills=result.values[0].skills.values;
                            //for(var i=0;i<skills.length;i++){
                            //    skillStr+=skills[i].skill.name+",";



                            //catch(err){
                            //    skillStr='';
                            //}



                        });


                    };

                    //var skillsWithSynonyms = [];
                    //
                    //try {
                    //    var skills = result.values[0].skills.values;
                    //
                    //    //skillsWithSynonyms[0]=skills[0].skill.name.toLowerCase();
                    //    //skillStr+=skillsWithSynonyms[0];
                    //
                    //    for (var i = 0; i < skills.length; i++) {
                    //        skillsWithSynonyms[i] = skills[i].skill.name.toLowerCase();
                    //        //skillStr+=","+skillsWithSynonyms[i];
                    //
                    //        //alert(skills[i].skill.name.toLowerCase());
                    //        //alert(skillStr);
                    //
                    //    }
                    //    //console.log(skillsWithSynonyms);
                    //    //alert(skillsWithSynonyms.length);
                    //
                    //    for (var j = 0; j < skillsWithSynonyms.length; j++) {
                    //        //alert(skillsWithSynonyms[j]);
                    //        var x = skillsWithSynonyms[j];
                    //        var synonymsEntity = entitiesService.synonymsEntity(x);
                    //        //alert("synonymsEntity");
                    //
                    //        var synonymsPromise = linkedinService.getSkillsWithSynonyms(synonymsEntity);
                    //        //alert("synonymsPromise");
                    //
                    //        synonymsPromise.then(function (d) {
                    //            var synonyms = d.data;
                    //            //console.log(synonyms);
                    //            //$scope.terms = synonyms.term;
                    //            //$scope.termsSynonyms = synonyms.termSynonyms;
                    //
                    //            //console.log($scope.terms);
                    //            //alert(synonyms.length);
                    //
                    //            //alert($scope.term);
                    //
                    //            for (var i = 0; i < synonyms.length; i++) {
                    //                $scope.terms = synonyms[i].term;
                    //                $scope.termsSynonyms = synonyms[i].termSynonyms;
                    //                //alert(i);
                    //                //alert(synonyms.length);
                    //
                    //                //alert(skillsWithSynonyms.indexOf($scope.terms));
                    //                //console.log(skillsWithSynonyms);
                    //
                    //                if (skillsWithSynonyms.indexOf($scope.terms) == -1) skillsWithSynonyms.push($scope.terms);
                    //                if (skillsWithSynonyms.indexOf($scope.termsSynonyms) == -1) skillsWithSynonyms.push($scope.termsSynonyms);
                    //                //alert(skillsWithSynonyms.length);
                    //
                    //            }
                    //
                    //        })
                    //
                    //
                    //    }
                    //    //console.log(skillsWithSynonyms);
                    //
                    //    skillStr += skillsWithSynonyms[0];
                    //
                    //    //alert(skillsWithSynonyms.length);
                    //
                    //    for (var i = 1; i < skillsWithSynonyms.length; i++) {
                    //
                    //        //alert(skillsWithSynonyms.length);
                    //        //alert(skillsWithSynonyms[i]);
                    //
                    //        skillStr += "," + skillsWithSynonyms[i];
                    //        //alert(skillStr);
                    //
                    //
                    //    }
                    //    //alert(skillStr);
                    //
                    //    //var skills=result.values[0].skills.values;
                    //    //for(var i=0;i<skills.length;i++){
                    //    //    skillStr+=skills[i].skill.name+",";
                    //
                    //
                    //
                    //}
                    //catch(err){
                    //    skillStr='';
                    //}

                    //
                    //var pictureUrl='';
                    //
                    //try{
                    //   pictureUrl=result.values[0].pictureUrl;
                    //}
                    //
                    //catch(err){
                    //    pictureUrl='https://ssl.gstatic.com/accounts/ui/avatar_2x.png';
                    //}



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
                                authenticationService.userProfile.user_type=1;


                                result.values[0].userId=d.data.jobseeker_id;

                                result.values[0].loggedIn=true;
                                authenticationService.userProfile.data=result.values[0];
                                authenticationService.userLoggedIn.status=true;
                                //alert(angular.toJson(authenticationService.userProfile.data))
                                //alert("chekLogin");

                                $location.path("/newsFeed");
                                $scope.getSkills();


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
            //alert(skillStr);


            var js_id= authenticationService.userProfile.user_id;

            var countNot=0;
            var lastJobsEntity = entitiesService.lastJobsEntity(js_id);

            var jobsPromise = linkedinService.getAllJobsFromLastId(lastJobsEntity);

            jobsPromise.then(function (d) {
                var jobs= d.data;
                //alert(skillStr);
                skillStr=skillStr.toLowerCase();
                var skills=skillStr.split(",");

                console.log(skills);
                var c;
                for(var i=0;i<jobs.length;i++){
                    c=0;
                    var skillsHash=skills;
                    jobs[i].jobTag=jobs[i].jobTag.toLowerCase();
                    var jobTags=jobs[i].jobTag.split(",");
                    console.log(jobTags);
                    for(var j=0;j<jobTags.length;j++){
                        var jobTag=jobTags[j];

                        if ($.inArray(jobTag, skillsHash) >= 0) {
                            c++;
                            //alert(jobTag);
                        }


                    }
                    var similarity=(c/jobTags.length)*100;
                    console.log(similarity);


                    if(similarity>70){

                        countNot++;
                        $scope.js_id= authenticationService.userProfile.jobseekerId;
                        var jobListEntity = addToJobListEntitiesService.addToJobListEntity( $scope.js_id,jobs[i].jobId,similarity);



                        var jobListPromise = addToJobListRequestService.addToJobList(jobListEntity);
                        jobListPromise.then(function (d) {
                            //alert(d.data);

                            //console.log(jobListEntity);
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





                $scope.js_id= authenticationService.userProfile.jobseekerId;

                $scope.jobsNotifications=[];
                //var js_id = authenticationService.userProfile.jobseekerId;
                //alert($scope.js_id);
                var NotificationEntity = notificationEntitiesService.notificationEntity($scope.js_id,countNot);
                var NotificationPromise = notificationRequestService.getNotifications(NotificationEntity);


                console.log(countNot);

                NotificationPromise.then(function (d) {
                    console.log(d);

                    var Notifications = d.data;
                    $scope.jobsNotifications=Notifications;
                    $scope.jobNoticount=Notifications.length;



                    //alert($scope.content);
                });

                $scope.remindersNotifications=[];
                //var js_id = authenticationService.userProfile.jobseekerId;
                //alert($scope.js_id);
                var date = new Date();
                var month=date.getMonth()+1;
                if (month<10)
                    month='0'+month;
                var day=date.getDate();
                if (day<10)
                    day='0'+day;

                var reminderDate=date.getFullYear()+ '-' + month + '-' + day;
                var remainderEntity = remainderEntityService.remainderEntity($scope.js_id,reminderDate);
                var remainderPromise = remainderRequestService.getRemainders(remainderEntity);


                remainderPromise.then(function (d) {
                    console.log(d);
                    //alert(d.data);

                    var reminders = d.data;
                    $scope.remindersNotifications=reminders;
                    $scope.reminderNoticount=reminders.length;





                });


                $scope.msgsNotifications=[];


                var allMsgsEntity = msgsEntitiesService.allMsgsEntity($scope.js_id,countNot);
                var allMsgsPromise = msgsRequestService.getAllNotifications(allMsgsEntity);

                allMsgsPromise.then(function (d) {
                    console.log(d);
//alert(d);
                    var msgsNotifications = d.data;
                    $scope.msgsNotifications=msgsNotifications;
                    $scope.msgsNoticount=msgsNotifications.length;



                    //alert($scope.content);
                });

                //$scope.allMsgsNotifications=[];
                //
                //
                //var allMsgsEntity = msgsEntitiesService.allMsgsEntity($scope.js_id,countNot);
                //var allMsgsPromise = msgsRequestService.getAllNotifications(allMsgsEntity);
                //
                //msgsPromise.then(function (d) {
                //    console.log(d);
                //
                //    var allMsgsNotifications = d.data;
                //    $scope.allMsgsNotifications=allMsgsNotifications;
                //    $scope.msgsNoticount=allMsgsNotifications.length;
                //
                //
                //   console.log(d);
                //    //alert($scope.content);
                //});

                $scope.commentNotifications=[];
                var NotificationEntity = notificationEntitiesService.notificationEntity($scope.js_id,countNot);
                var NotificationPromise = notificationRequestService.getComments(NotificationEntity);

                NotificationPromise.then(function (d) {
                    console.log(d);

                    var Notifications = d.data;
                    $scope.commentNotifications=Notifications;
                    $scope.commentNoticount=Notifications.length;



                    //alert($scope.content);
                });



            }, function (d) {
                swal({
                    title: "Error!",
                    text: "Something went wrong, please try again later",
                    type: "error",
                    timer: 2000
                });
            });

            //$scope.remainders=[
            //
            //];
            //var user_id= authenticationService.userProfile.user_id;
            //var remainderEntity =remainderEntityService.remainderEntity(user_id);
            //var remainderPromise = remainderRequestService.getRemainders(remainderEntity);
            //remainderPromise.then(function (d) {
            //    var  remainders = d.data;
            //
            //});
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

