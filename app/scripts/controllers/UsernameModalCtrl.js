(function() {
    function UsernameModalCtrl($uibModalInstance, $cookies, Account, $uibModal, $firebaseAuth) {

        this.Account = Account;

        this.usernameInput = null;
        this.emailInput = null;
        this.passwordInput = null;

        var $ctrl = this;

        //Gets current username from cookies
        var currentUser = $cookies.get('blocChatCurrentUser');

//        $ctrl.getCurrentUser = function() {
//            Account.currentUser = $ctrl.Account.auth.$getAuth();
//            Account.currentUserId = Account.currentUser.uid;
//            console.log(Account.currentUserId);
//            var currentUser = $ctrl.Account.getCurrentUser();
//            console.log(currentUser);
//            return currentUser;
//        };

        $ctrl.getCurrentUser = function() {
            Account.getCurrentUser();
            console.log(Account.currentUser);
        };

        /**
        * @function setUsername
        * @desc Adds the Room.newRoom (ngModel of input) object to 'all' $firebaseArray
        */

        $ctrl.setUsername = function(username) {
            if (username && username !== '') {
                $cookies.put('blocChatCurrentUser', username);
                Account.currentUser = username;
                $uibModalInstance.dismiss('login');
            }
        };

        /**
        * @function cancel
        * @desc Dismisses the modal
        */
        $ctrl.cancel = function() {
            $uibModalInstance.dismiss('cancel');
        };


        /**
        * @function openSignupModal
        * @desc opens signup-modal modal
        */
        $ctrl.openSignupModal = function() {
            $uibModal.open({
                ariaLabelledBy: 'modal-title',
                ariaDescribedBy: 'modal-body',
                templateUrl: '/templates/signup-modal.html',
                controller: 'SignupModalCtrl',
                controllerAs: '$ctrl',
                size: 'sm',
//                backdrop  : 'static',
//                keyboard  : false,
                resolve: {
                    currentUser: function () {
                        return currentUser;
                    }
                }
            });
        };


       /**
        * @function login
        * @desc logins with email and password
        * @param {String} email, password
        */
        $ctrl.login = function(email, password) {
            if ($ctrl.Account.passwordInput !== null && $ctrl.Account.emailInput) {
                $ctrl.Account.auth.$signInWithEmailAndPassword(email, password)
                .then(function(firebaseUser) {
                    // console.log("Signed in as:", firebaseUser.uid);
                    Account.currentUserId = firebaseUser.uid;
                    var activeUser = $ctrl.Account.users[Account.currentUserId];
                    $ctrl.getCurrentUser();
                    $ctrl.setUsername(activeUser);
                    location.reload();
                })
                .catch(function(error) {
                    console.error("Authentication failed:", error);
                });
//                $ctrl.getCurrentUser();
                $uibModalInstance.dismiss('submit');
            }
        };

    }

    angular
        .module('blocChat')
        .controller('UsernameModalCtrl', ['$uibModalInstance', '$cookies', 'Account', '$uibModal', '$firebaseAuth', UsernameModalCtrl]);
})();
