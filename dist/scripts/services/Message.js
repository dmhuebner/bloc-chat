(function() {
    function Message($firebaseArray) {
        var ref = firebase.database().ref().child('messages');
        var messages = null;
        
        return {
            getByRoomId: function(roomId) {
                var tempRef = ref.orderByChild('roomId').equalTo(roomId);
                messages = $firebaseArray(tempRef);
                return messages;
            }
        };
    }
    
    angular
        .module('blocChat')
        .factory('Message', ['$firebaseArray', Message]);
})();