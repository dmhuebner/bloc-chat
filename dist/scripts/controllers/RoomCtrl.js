(function() {
    function RoomCtrl(Room, $uibModal, Message) {
        
        //Room Service
        this.Room = Room;
        
        //Message Service
        this.Message = Message;
        
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
        $ctrl.activeRoom = null;
        
        /**
        * @desc Declare activeRoomMessages property
        * @type {Object}
        */
        $ctrl.activeRoomMessages = null;
        
        /**
        * @function viewRoom
        * @desc Sets activeRoom property to roomName param
        * @param {Object} roomName
        */ 
        $ctrl.setActiveRoom = function(room) {
            $ctrl.activeRoom = room;
            console.log('$ctrl.activeRoom', $ctrl.activeRoom.$id);
            $ctrl.activeRoomMessages = Message.getByRoomId($ctrl.activeRoom.$id);
            console.log($ctrl.activeRoomMessages);
        };
        
        /**
        * @function isActive
        * @desc Checks if the 'item' argument is equal to activeRoom
        * @param {Object} item
        */ 
        $ctrl.isActive = function(item) {
            if ($ctrl.activeRoom) {
                return $ctrl.activeRoom.$value === item;
            }
        };
    }
    
    angular
        .module('blocChat')
        .controller('RoomCtrl', ['Room', '$uibModal', 'Message', RoomCtrl]);
})();


