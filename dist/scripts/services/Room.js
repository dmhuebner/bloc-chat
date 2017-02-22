(function() {
    function Room($firebaseArray) {
        var ref = firebase.database().ref().child("rooms");
        var rooms = $firebaseArray(ref);
        
        Room.newRoom = {};
        
        /**
        * @function $add
        * @desc Adds the newRoom object to rooms $firebaseArray
        * @param {Object} newRoom
        */
//        Room.$addRoom = function(newRoom) {
//            rooms.$add(newRoom).then(function() {
//                var id = ref.key;
//                console.log("added record with id " + id);
//                rooms.$indexFor(id); // returns location in the array
//            });
//        };
        
        return {
            all: rooms
        };
    }
    
    angular
        .module('blocChat')
        .factory('Room', ['$firebaseArray', Room]);
})();