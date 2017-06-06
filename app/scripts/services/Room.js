(function() {
    function Room($firebaseArray, $firebaseObject) {
        var ref = firebase.database().ref().child("rooms");
        var rooms = $firebaseArray(ref);

        Room.newRoom = {};

        return {
            all: rooms,
						// getByUserId: function(userId) {
						// 		var tempRef = ref.child('users');
						// 		return $firebaseObject(tempRef.child(userId))
						// },
						// getByUserId: function(room, userId) {
						// 	var roomUsersRef = room.ref().child('users');
						// 	var tempRef = roomUsersRef.orderByChild('users').child('').equalTo(userId);
						// 	rooms = $firebaseArray(tempRef);
						// 	return rooms;
						// }
        };
    }

    angular
        .module('blocChat')
        .factory('Room', ['$firebaseArray', '$firebaseObject', Room]);
})();
