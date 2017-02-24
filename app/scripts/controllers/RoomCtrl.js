(function() {
    function RoomCtrl(Room, $uibModal) {
        
        //Room Service
        this.Room = Room;
        
        /**
        * @desc Declare controller local variable as $ctrl
        * @type {Object}
        */
        var $ctrl = this;
        
        /**
        * @desc Declare rooms property in controller scope
        * @type {Object}
        */
        $ctrl.rooms = Room.all;
        
        //$uibModal service openModalInstance controller property
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
        
        /**
        * @desc Declare activeRoom
        * @type {Object}
        */
        $ctrl.activeRoom = "Select a room";
        
        /**
        * @function viewRoom
        * @desc Sets activeRoom property to roomName param
        * @param {Object} roomName
        */ 
        $ctrl.setActiveRoom = function(roomName) {
            $ctrl.activeRoom = roomName;
        };
        
        /**
        * @function isActive
        * @desc Checks if the 'item' argument is equal to activeRoom
        * @param {Object} item
        */ 
        $ctrl.isActive = function(item) {
            return $ctrl.activeRoom === item;
        };
    }
    
    angular
        .module('blocChat')
        .controller('RoomCtrl', ['Room', '$uibModal', RoomCtrl]);
})();


