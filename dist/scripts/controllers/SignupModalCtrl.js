(function() {
    function SignupModalCtrl($uibModalInstance, $cookies, Account, $firebaseAuth) {

        //Services
        this.Account = Account;
        this.auth = Account.auth;

        //Controller local variable
        var $ctrl = this;

        /**
        * @desc Declare currentUsername
        * @type {String}
        */
        $ctrl.getCurrentUsername = function() {
            $ctrl.Account.getCurrentUsername();
        };

        $ctrl.getCurrentUser = function() {
            $ctrl.Account.getCurrentUser();
            // console.log(Account.currentUser);
        };

        /**
        * @function setUsername
        * @desc Adds the Room.newRoom (ngModel of input) object to 'all' $firebaseArray
        */
        $ctrl.setUsername = function(username) {
            if (username && username !== '') {
                $cookies.put('blocChatCurrentUser', username);
//                console.log(username);
                Account.currentUser = username;
                // console.log(Account.currentUser);
                $ctrl.getCurrentUsername();
//                $ctrl.Account.currentUsername = username;
            }
        };


        /**
        * @function signup
        * @desc creates new user account
        */
        $ctrl.signup = function(email, password) {
            if ($ctrl.Account.passwordInput !== null && $ctrl.Account.confirmPasswordInput !== null && $ctrl.Account.passwordInput === $ctrl.Account.confirmPasswordInput) {
                $ctrl.auth.$createUserWithEmailAndPassword(email, password)
                .then(function(firebaseUser) {
                    // console.log("User " + firebaseUser.uid + " created successfully!");
                    $ctrl.Account.currentUserId = firebaseUser.uid;
                    $ctrl.Account.createUsername($ctrl.Account.usernameInput);
                    $ctrl.setUsername($ctrl.Account.usernameInput);
                    // $uibModalInstance.dismiss('submit');
										location.reload();
                })
                .catch(function(error) {
                console.error("Error: ", error);
                });
                // console.log($ctrl.Account.emailInput, $ctrl.Account.passwordInput);
            } else {
                window.alert("Those passwords don't match!");
            }
        };

        /**
        * @function cancel
        * @desc Dismisses the modal
        */
        this.cancel = function() {
            $uibModalInstance.dismiss('cancel');
        };

    }

    angular
        .module('blocChat')
        .controller('SignupModalCtrl', ['$uibModalInstance', '$cookies', 'Account', '$firebaseAuth', SignupModalCtrl]);
})();
