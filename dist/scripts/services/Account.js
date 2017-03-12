(function() {
    function Account($cookies, $firebaseAuth, $firebaseArray) {
        
        var ref = firebase.database().ref().child('users');
        
        var users = $firebaseArray(ref);
        
        Account.auth = $firebaseAuth();
        
        Account.usernameInput = null;
        Account.emailInput = null;
        Account.passwordInput = null;
        Account.confirmPasswordInput = null;
        
        Account.currentUserAuthObj = Account.auth.$getAuth();
        
        Account.currentUser = {};
        
        Account.currentUserId = null;
        
        return {
            currentUsername: $cookies.get('blocChatCurrentUser'),
            getCurrentUsername: function() {
                return $cookies.get('blocChatCurrentUser')
            },
            login: function(email, password) {
                auth.$signInWithEmailAndPassword(email, password);
            },
            auth: $firebaseAuth(),
            getCurrentUser: function() {
                var currentUserAuthObj = Account.auth.$getAuth();
                if (currentUserAuthObj) {
                    var users = $firebaseArray(ref);
                    console.log(users);
                    console.log(currentUserAuthObj.uid);
                    var currentUserId = currentUserAuthObj.uid;
                    Account.currentUser = users.$getRecord(currentUserId);
                    console.log(users.$getRecord(currentUserId));
                    return Account.currentUser;
                }
            },
            createUsername: function(newUser) {
                users.$add(newUser).then(function() {
                    users.$save(newUser);
                });
            }
        };
        
    }
    
    angular
        .module('blocChat')
        .factory('Account', ['$cookies', '$firebaseAuth', '$firebaseArray', Account]);
})();