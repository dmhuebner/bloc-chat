(function() {
    function RoomCtrl($firebaseArray, Room) {
        this.rooms = Room;
    }
    
    angular
        .module('blocChat')
        .controller('RoomCtrl', ['$firebaseArray', 'Room', RoomCtrl]);
})();