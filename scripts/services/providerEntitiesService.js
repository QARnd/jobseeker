/**
 * Created by happy on 5/2/2015.
 */
/**
 * Created by rana on 3/31/2015.
 */

angular.module('servicesModule').factory('providerEntitiesService', function() {

    return {

        sendMessageForPEntity: function (email,content) {
            var Message = {};     // new object
            Message.email = email;
            Message.content = content;

            return Message;



        }}
});
