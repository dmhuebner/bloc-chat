(function() {
    function UsernameModalCtrl($uibModalInstance, $cookies, Account) {
        
        this.Account = Account;
        
        this.usernameInput = null;
        
        
        /**
        * @function setUsername
        * @desc Adds the Room.newRoom (ngModel of input) object to 'all' $firebaseArray
        */
        this.setUsername = function(username) {
            if (username && username !== '') {
                $cookies.put('blocChatCurrentUser', username);
                Account.currentUsername = username;
                $uibModalInstance.dismiss('submit');
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
        .controller('UsernameModalCtrl', ['$uibModalInstance', '$cookies', 'Account', UsernameModalCtrl]);
})();