(function() {
    function RoomCtrl(Room, $uibModal, Message, $cookies, Account) {

        //Room Service
        this.Room = Room;

        //Message Service
        this.Message = Message;

        //Account Service
        this.Account = Account;


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

        //$uibModal service openModalInstance (new room modal)
        $ctrl.openNewRoomModal = function(size) {
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

				//$uibModal service openModalInstance (Add user to room modal)
				$ctrl.openAddUserModal = function(size) {
						var modalInstance = $uibModal.open({
								ariaLabelledBy: 'modal-title',
								ariaDescribedBy: 'modal-body',
								templateUrl: '/templates/add-user-modal.html',
								controller: 'RoomCtrl',
								controllerAs: 'main',
								size: size,
								resolve: {
										rooms: function () {
												return $ctrl.rooms;
										}
								}
						});
				};

        //$uibModal service openModalInstance (username modal)
        $ctrl.openUsernameModal = function() {
            $uibModal.open({
                ariaLabelledBy: 'modal-title',
                ariaDescribedBy: 'modal-body',
                templateUrl: '/templates/signup-modal.html',
                controller: 'SignupModalCtrl',
                controllerAs: '$ctrl',
                size: 'sm',
//                backdrop  : 'static',
//                keyboard  : false,
                resolve: {
                    currentUser: function () {
                        return currentUser;
                    }
                }
            });
        };

        /**
        * @desc Declare activeRoom
        * @type {Object}
        */
        // $ctrl.activeRoom = null;

        $ctrl.activeUser = Account.currentUser;

        /**
        * @desc Declare activeRoomMessages property
        * @type {Object}
        */
        $ctrl.activeRoomMessages = null;

        /**
        * @desc Declare newMessage property
        * @type {Object}
        */
        $ctrl.newMessage = null;

        /**
        * @desc Declare currentUsername
        * @type {String}
        */
        $ctrl.getCurrentUsername = function() {
            Account.getCurrentUsername();
            $ctrl.currentUser = Account.currentUser;
        };

        $ctrl.currentUser = Account.currentUser;

//        $ctrl.currentUser = $cookies.get('blocChatCurrentUser');

       /**
        * @function logout
        * @desc logins with email and password
        */
        $ctrl.logout = function() {
            $ctrl.Account.auth.$signOut();
            $cookies.remove('blocChatCurrentUser');
            location.reload();
        };

        /**
        * @function getCurrentTime
        * @desc Gets current time in proper format
        * @param {number} roomId
        */
        $ctrl.getCurrentTime = function() {
            var currentDate = new Date();
            var currentHours = currentDate.getHours();
            var currentMinutes = currentDate.getMinutes();
            var amTrue = true;

            if (currentMinutes < 10) {
                currentMinutes = '0' + currentMinutes;
            }

            if (currentHours > 12) {
                currentHours = (currentHours - 12);
                amTrue = false;
            }

            var currentTime = (currentHours + ':' + currentMinutes);

            if (amTrue) {
                currentTime += 'am';
            } else {
                currentTime += 'pm';
            }

            return currentTime;
        };

        /**
        * @function prepareNewMessage
        * @desc prepares the newMessage Object
        * @param {number} roomId
        */
        $ctrl.prepareNewMessage = function(roomId) {
            var currentTime = $ctrl.getCurrentTime();

            $ctrl.newMessage = {
                content: '',
                roomId: $ctrl.activeRoom.$id,
                username: $cookies.get('blocChatCurrentUser'),
                sentAt: currentTime
            };
        };

				/**
				* @function scrollToBottom
				* @desc Scrolls to the bottom of the div with id
				* @param {String} id
				*/
				$ctrl.scrollToBottom = function(id) {
				   var div = document.getElementById(id);
				   div.scrollTop = div.scrollHeight - div.clientHeight;
				};


        /**
        * @function setActiveRoom
        * @desc Sets activeRoom property to roomName param
        * @param {Object} roomName
        */
        $ctrl.setActiveRoom = function(room) {
            $ctrl.activeRoom = room;
						Room.setActive(room);
						// console.log(Room.getActive());
						// console.log($ctrl.activeRoom);
            $ctrl.getCurrentUsername();
//            console.log('$ctrl.activeRoom', $ctrl.activeRoom.$id);
//            console.log($ctrl.newMessage);
            $ctrl.prepareNewMessage($ctrl.activeRoom.$id);
            $ctrl.activeRoomMessages = Message.getByRoomId($ctrl.activeRoom.$id);
						/*** Delay scrollToBottom call ***/
						setTimeout(function() { $ctrl.scrollToBottom('message-section'); }, 150);
        };

        /**
        * @function isActive
        * @desc Checks if the 'item' argument is equal to activeRoom
        * @param {Object} item
        */
        $ctrl.isActive = function(item) {
            if ($ctrl.activeRoom) {
                return $ctrl.activeRoom === item;
            }
        };

				/**
        * @function userHasAccess
        * @desc Checks currentUser should have access to private room
        * @param {Object} item
        */
				$ctrl.userHasAccess = function(room, userId) {
					// console.log(room["users"]);
					// console.log(userId);
					if (room.private && room["users"].hasOwnProperty(userId)) {
						return true;
					} else {
						return false;
					}
				};

				$ctrl.addUserToRoom = function(userEmail) {
					// console.log($ctrl.activeRoom);
					var userObj = $ctrl.Account.getUserByEmail(userEmail);
					userObj.$loaded().then(function(users) {
						var user = users[0];
						console.log(user.$id);
						console.log(Room.getActive());
						var room = Room.getActive();
						console.log(room);

						room.users[user.$id] = true;
						Room.save(room);
					});
				};
    }

    angular
        .module('blocChat')
        .controller('RoomCtrl', ['Room', '$uibModal', 'Message', '$cookies', 'Account', RoomCtrl]);
})();
