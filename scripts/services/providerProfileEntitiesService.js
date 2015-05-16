/**
 * Created by rana on 5/16/2015.
 */

angular.module('servicesModule').factory('providerProfileEntitiesService', function() {

    return {

        profileProviderEntity: function(jobprovider_id) {
            var profile = {};     // new object
            profile.jobprovider_id = jobprovider_id;
            return profile;
        }
    };


});
