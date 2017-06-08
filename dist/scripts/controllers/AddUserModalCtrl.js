(function() {
    function AddUserModalCtrl($uibModalInstance, Room, Account) {
				var $ctrl = this;
        $ctrl.Room = Room;
				$ctrl.Account = Account;

        /**
        * @function AddUserToRoom
        * @desc Adds the Room.newRoom (ngModel of input) object to 'all' $firebaseArray
        */
				$ctrl.addUserToRoom = function(userEmail) {
					// console.log($ctrl.activeRoom);
					var userObj = $ctrl.Account.getUserByEmail(userEmail);
					userObj.$loaded().then(function(users) {
						var user = users[0];
						// console.log(user.$id);
						// console.log(Room.getActive());
						var room = Room.getActive();

						if (user) {
							alert("The user was successfully added to this private room!");
						} else {
							alert("There was an error! Please make sure the user has a Bloc Chat account with that email address.");
						}
						room.users[user.$id] = true;
						Room.save(room);
						$uibModalInstance.dismiss('submit');
					});
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
        .controller('AddUserModalCtrl', ['$uibModalInstance', 'Room', 'Account',  AddUserModalCtrl]);
})();
