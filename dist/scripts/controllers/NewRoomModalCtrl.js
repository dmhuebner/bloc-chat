(function() {
    function NewRoomModalCtrl($uibModal, $uibModalInstance, Room) {
        this.Room = Room;
        this.modalInstance = $uibModalInstance;
//        var $ctrl = this;
        // @desc Adds new room
        // @param {Object} new Room
        this.$addRoom = function(newRoom) {
            Room.all.$add(newRoom);
        };
        
        this.cancel = function () {
            this.modalInstance.dismiss('cancel');
        };
    }
    
    angular
        .module('blocChat')
        .controller('NewRoomModalCtrl', ['Room', '$uibModalInstance', NewRoomModalCtrl]);
})();