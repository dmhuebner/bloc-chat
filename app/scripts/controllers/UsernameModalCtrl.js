(function() {
    function UsernameModalCtrl($uibModalInstance, $cookies) {
        
        this.usernameInput = null;
        
        /**
        * @function setUsername
        * @desc Adds the Room.newRoom (ngModel of input) object to 'all' $firebaseArray
        */
        this.setUsername = function(username) {
            if (username && username !== '') {
                $cookies.put('blocChatCurrentUser', username);
                $uibModalInstance.dismiss('submit');
            }
        };
        
    }
    
    angular
        .module('blocChat')
        .controller('UsernameModalCtrl', ['$uibModalInstance', '$cookies', UsernameModalCtrl]);
})();