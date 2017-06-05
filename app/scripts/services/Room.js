(function() {
    function Room($firebaseArray, $firebaseObject) {
        var ref = firebase.database().ref().child("rooms");
        var rooms = $firebaseArray(ref);

        Room.newRoom = {};

        return {
            all: rooms,
						getByUserId: function(userId) {
								var tempRef = ref.child('users');
								return $firebaseObject(tempRef.child(userId))
						},
        };
    }

    angular
        .module('blocChat')
        .factory('Room', ['$firebaseArray', '$firebaseObject', Room]);
})();
