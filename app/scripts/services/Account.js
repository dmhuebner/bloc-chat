(function() {
    function Account($cookies, $firebaseAuth, $firebaseObject, $firebaseArray) {

        var ref = firebase.database().ref().child('users');

        var users = $firebaseObject(ref);

//        var userObject = $firebaseObject(ref);

        Account.auth = $firebaseAuth();

        Account.usernameInput = null;
        Account.emailInput = null;
        Account.passwordInput = null;
        Account.confirmPasswordInput = null;

        Account.currentUserAuthObj = Account.auth.$getAuth();

        Account.currentUser = {};

        Account.currentUserId = null;

        Account.newUser = {};

        return {
            currentUsername: $cookies.get('blocChatCurrentUser'),
            getCurrentUsername: function() {
                return $cookies.get('blocChatCurrentUser')
            },
            login: function(email, password) {
                auth.$signInWithEmailAndPassword(email, password);
            },
            auth: $firebaseAuth(),
						getCurrentUserId: function() {
							var currentUserAuthObj = Account.auth.$getAuth();
							if (currentUserAuthObj) {
									console.log(currentUserAuthObj);
									var currentUserId = currentUserAuthObj.uid;
									return currentUserId;
							}
						},
						getUserByEmail: function(email) {
								var tempRef = ref.orderByChild('email').equalTo(email);
								users = $firebaseArray(tempRef);
								console.log(users);
								return users;
						},
            getCurrentUser: function() {
                var currentUserAuthObj = Account.auth.$getAuth();
                if (currentUserAuthObj) {
                    // console.log(currentUserAuthObj.uid);
                    var currentUserId = currentUserAuthObj.uid;
                    Account.currentUser = $firebaseObject(ref.child(currentUserId));
                    console.log(Account.currentUser);
										return Account.currentUser;
                }
            },
            createUsername: function(newUser) {
                var currentUserAuthObj = Account.auth.$getAuth();
                if (currentUserAuthObj) {
                    var currentUserId = currentUserAuthObj.uid;
                    users[currentUserId] = newUser;
                    users.$save();
                }
            },
            users: users
        };

    }

    angular
        .module('blocChat')
        .factory('Account', ['$cookies', '$firebaseAuth', '$firebaseObject', '$firebaseArray', Account]);
})();
