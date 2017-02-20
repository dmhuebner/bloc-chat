(function() {
    function Room($firebaseArray) {
        var ref = firebase.database().ref().child("rooms");
        var rooms = $firebaseArray(ref);
        
        /**
        * @function $add
        * @desc Adds the newRoom object to rooms $firebaseArray
        * @param {Object} newRoom
        */
        Room.$add = function(newRoom) {
            rooms.$add(newRoom);
        };
        
        return {
            all: rooms
        };
    }
    
    angular
        .module('blocChat')
        .factory('Room', ['$firebaseArray', Room]);
})();