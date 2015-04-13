/**
 * Created by rana on 4/13/2015.
 */



angular.module('servicesModule').factory('searchEntitiesService', function() {

    return {

        searchEntity: function (search) {
            var result = {};     // new object
            result.search = search;
            return result;
        }
    };
});


