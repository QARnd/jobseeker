/**
 * Created by Omayma Abulrub on 12/4/2014.
 */

angular.module('servicesModule').
    factory('authenticationService', function($q, $timeout){


        return {
            userProfile : {data:""},
            userLoggedIn : {status:""},
            jobs:{},
            posts:{},
            deploymentLink:{link:'server/Jobseeker_Form.php'},
            getNewsFeedLength: function(){
                var deferred = $q.defer();
                $timeout(function(){
                    deferred.resolve(50);
                },2000);
                return deferred.promise;
            }


        }
    });


