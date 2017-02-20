(function() {
    function RoomCtrl($firebaseArray, Room, $uibModal) {
        this.Room = Room;
      
        var $ctrl = this;
        $ctrl.rooms = Room.all;
        $ctrl.openModalInstance = function(size) {
            var modalInstance = $uibModal.open({
                ariaLabelledBy: 'modal-title',
                ariaDescribedBy: 'modal-body',
                templateUrl: '/templates/new-room-modal.html',
                controller: 'NewRoomModalCtrl',
                controllerAs: '$ctrl',
                size: size,
                resolve: {
                    rooms: function () {
                        return $ctrl.rooms;
                    }
                }
            });
        };
    }
    
    angular
        .module('blocChat')
        .controller('RoomCtrl', ['$firebaseArray', 'Room', '$uibModal', RoomCtrl]);
})();


