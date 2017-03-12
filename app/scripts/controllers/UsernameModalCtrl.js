(function() {
    function UsernameModalCtrl($uibModalInstance, $cookies, Account, $uibModal) {
        
        this.Account = Account;
        
        this.usernameInput = null;
        this.emailInput = null;
        this.passwordInput = null;
        
        var $ctrl = this;
        
        //Gets current username from cookies
        var currentUser = $cookies.get('blocChatCurrentUser');
        
        $ctrl.getCurrentUser = function() {
            Account.currentUser = Account.getCurrentUser();
            console.log(Account.currentUser);
        };
        
        /**
        * @function setUsername
        * @desc Adds the Room.newRoom (ngModel of input) object to 'all' $firebaseArray
        */
        $ctrl.setUsername = function() {
            var currentUsername = $ctrl.getCurrentUser();
            console.log(currentUsername);
            $cookies.put('blocChatCurrentUser', currentUsername);
            Account.currentUser = currentUsername;
            console.log(Account.currentUser);
            $uibModalInstance.dismiss('submit');
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
                    console.log("Signed in as:", firebaseUser.uid);
                    $ctrl.Account.currentUserId = firebaseUser.uid;
                    $ctrl.getCurrentUser();
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
        .controller('UsernameModalCtrl', ['$uibModalInstance', '$cookies', 'Account', '$uibModal', UsernameModalCtrl]);
})();