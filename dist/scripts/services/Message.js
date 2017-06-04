(function() {
    function Message($firebaseArray, $cookies) {
        var ref = firebase.database().ref().child('messages');
        var messages = null;
        var currentRoom = $cookies.get('blocChatCurrentRoom');

				/**
				* @function scrollToBottom
				* @desc Scrolls to the bottom of the div with id
				* @param {String} id
				*/
				Message.scrollToBottom = function(id) {
					 var div = document.getElementById(id);
					 div.scrollTop = div.scrollHeight - div.clientHeight;
				};

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
												Message.scrollToBottom('message-section');
                    });
                };
            }
        };
    }

    angular
        .module('blocChat')
        .factory('Message', ['$firebaseArray', '$cookies', Message]);
})();
