angular.module('myApp')
    .controller('searchController', function ($location,$scope,$q,entitiesService,authenticationService,postRequestsService,jobRequestsService,$route,initially,publicJobIdService) {
        $scope.log = [];
        $scope.offset = 0;
        $scope.status = {
            isFirst: true
        };
        $scope.flagSearch = 'job';
        $scope.dir = "";
        $scope.numberOfItems = 20;


        $scope.loadTags = function (query) {
            var deferred = $q.defer();
            var i;
            //here we do filter with the current text

            var result = [];

            var a = initially.getTagsArr.resultTagsArr;
            for (i = 0; i < a.length; i++) {

                //var jsonStr=a[i];
                //var json_parsed = JSON.parse(jsonStr);



                var items = a[i].text; // an array
                var item = items.toLowerCase();
                var quer = query.toLowerCase();
                if (item.indexOf(quer) > -1) {
                    result.push(a[i]);
                }// is the respective value
            }

            deferred.resolve(result);
            return deferred.promise;
        }
    });
        	  