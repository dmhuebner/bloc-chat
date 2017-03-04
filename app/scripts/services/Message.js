(function() {
    function Message($firebaseArray) {
        var ref = firebase.database().ref().child('messages');
        var messages = null;
        
        Message.newMessage = {};
        
        return {
            getByRoomId: function(roomId) {
                var tempRef = ref.orderByChild('roomId').equalTo(roomId);
                messages = $firebaseArray(tempRef);
                return messages;
            },
            send: function(newMessage) {
                messages.$add(newMessage).then(function() {
                    messages.$save(newMessage);
                    Message.newMessage = {};
                });
            }
        };
    }
    
    angular
        .module('blocChat')
        .factory('Message', ['$firebaseArray', Message]);
})();