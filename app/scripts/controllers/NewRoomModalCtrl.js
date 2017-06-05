(function() {
    function NewRoomModalCtrl($uibModalInstance, Room) {
        this.Room = Room;

				this.newRoom = '';

        /**
        * @function addRoom
        * @desc Adds the Room.newRoom (ngModel of input) object to 'all' $firebaseArray
        */
        this.addRoom = function(newRoom, usersAllowed) {
            Room.all.$add({name: newRoom, private: usersAllowed || false}).then(function() {
                Room.all.$save();
                $uibModalInstance.close();
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
        .controller('NewRoomModalCtrl', ['$uibModalInstance', 'Room',  NewRoomModalCtrl]);
})();
