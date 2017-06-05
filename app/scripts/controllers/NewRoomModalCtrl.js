(function() {
    function NewRoomModalCtrl($uibModalInstance, Room, Account) {
        this.Room = Room;
				this.Account = Account;

				this.newRoom = '';

        /**
        * @function addRoom
        * @desc Adds the Room.newRoom (ngModel of input) object to 'all' $firebaseArray
        */
        this.addRoom = function(newRoom, usersAllowed) {
					// If private
					if (usersAllowed) {
						var currentUser = this.Account.getCurrentUserId();
						console.log(currentUser);
						var users = {};
						users[currentUser] = true;
						Room.all.$add({name: newRoom, private: usersAllowed || false, users}).then(function() {
								Room.all.$save();
								$uibModalInstance.close();
						});
					} else {
						// If public
						Room.all.$add({name: newRoom, private: usersAllowed || false}).then(function() {
								Room.all.$save();
								$uibModalInstance.close();
						});
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
        .controller('NewRoomModalCtrl', ['$uibModalInstance', 'Room', 'Account',  NewRoomModalCtrl]);
})();
