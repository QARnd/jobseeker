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



        },createAccountEntity: function(name,email,description,location) {
            var account = {};     // new object
            account.name=name;
            account.email=email;
            account.description=description;
            account.location=location;
            return account;
        },
        loginProviderEntity:function(EmailP,passwordP){
            var provider = {};     // new object
            provider.EmailP=EmailP;
            provider.passwordP=passwordP;
            return provider;
        }
    }
});
