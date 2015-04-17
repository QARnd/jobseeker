/**
 * Created by GeniuCode Pointer on 3/4/2015.
 */


angular.module('servicesModule').
    factory('linkedinService', function($rootScope,$http,authenticationService){

        var profileData;
        return {

            //basic profile
            getProfile : function (callback){
                IN.API.Profile("me")
                    .fields("id","firstName", "lastName", "industry", "location:(name)", "picture-url", "headline", "summary", "num-connections", "public-profile-url",  "positions", "email-address", "educations", "date-of-birth","skills")
                    .result(function (result){

                        //profileData=result.values[0];
                        $rootScope.$apply(function() {
                            callback(null, result);
                        });
                    })
                    .error(function error(error) {
                        callback(error,null)
                    });
            },
            getProfileData : {resultData:""},

            //returns true if user is authorized
            isAuthorized : function(){
                return IN.User.isAuthorized();
            },
            logout : function(){
                return IN.User.logout();
            },


            loginRequest : function(userEntity) {
                var msg = {};
                msg.opcode = "validateJobseekerRequest";
                msg.Entity = userEntity;
                console.log(userEntity);
                var jobPromise = $http({
                    method: 'POST',
                    url: authenticationService.deploymentLink.link,
                    data: msg
                });
                return jobPromise;
            },
            getAllJobs: function() {
                var request = {};
                request.opcode = "getAllJobsRequest1";
                var jobPromise=$http({
                    method : 'POST',
                    url : authenticationService.deploymentLink.link,
                    //url: 'server/Jobseeker_Form.php',
                    data: request
                });
                return jobPromise;
            }




        }
    });
