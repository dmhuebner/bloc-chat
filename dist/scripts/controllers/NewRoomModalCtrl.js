(function() {
    function NewRoomModalCtrl($uibModalInstance, Room) {
        this.Room = Room;
        
        /**
        * @function addRoom
        * @desc Adds the Room.newRoom (ngModel of input) object to 'all' $firebaseArray
        */
        this.addRoom = function(newRoom) {
            Room.all.$add(newRoom).then(function() {
                Room.all.$save(newRoom)
                $uibModalInstance.close(newRoom);
            });
        };
      
        this.cancel = function() {
            $uibModalInstance.dismiss('cancel');
        };
    }
    
    angular
        .module('blocChat')
        .controller('NewRoomModalCtrl', ['$uibModalInstance', 'Room',  NewRoomModalCtrl]);
})();