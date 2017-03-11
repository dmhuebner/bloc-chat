(function() {
    function Account($cookies, $firebaseAuth) {
        
        this.auth = $firebaseAuth();
        
        this.usernameInput = null;
        this.emailInput = null;
        this.passwordInput = null;
        this.confirmPasswordInput = null;
        
        
        return {
            currentUsername: $cookies.get('blocChatCurrentUser'),
            getCurrentUsername: function() {
                return $cookies.get('blocChatCurrentUser')
            },
            login: function(email, password) {
                auth.$signInWithEmailAndPassword(email, password);
            },
            auth: $firebaseAuth()
        };
        
    }
    
    angular
        .module('blocChat')
        .factory('Account', ['$cookies', '$firebaseAuth', Account]);
})();