(function() {
    function Message($firebaseArray, $cookies) {
        var ref = firebase.database().ref().child('messages');
        var messages = null;
        var currentRoom = $cookies.get('blocChatCurrentRoom');
        
        
        return {
            getByRoomId: function(roomId) {
                var tempRef = ref.orderByChild('roomId').equalTo(roomId);
                messages = $firebaseArray(tempRef);
                return messages;
            },
            send: function(newMessage) {
                if (newMessage.content !== null && newMessage.content !== '') {
                    messages.$add(newMessage).then(function() {
                        messages.$save(newMessage);
                        $('.message-input').val('');
                    });
                };
            }
        };
    }
    
    angular
        .module('blocChat')
        .factory('Message', ['$firebaseArray', '$cookies', Message]);
})();