(function() {
    function Account($cookies) {
//        this.username = $cookies.get('blocChatCurrentUser');
        
        return {
            currentUsername: $cookies.get('blocChatCurrentUser'),
            getCurrentUsername: function() {
                return $cookies.get('blocChatCurrentUser')
            }
        };
        
    }
    
    angular
        .module('blocChat')
        .factory('Account', ['$cookies', Account]);
})();