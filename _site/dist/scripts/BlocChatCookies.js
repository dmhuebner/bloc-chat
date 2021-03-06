(function() {
    function BlocChatCookies($cookies, $uibModal) {
        var currentUser = $cookies.get('blocChatCurrentUser');
        
        var openUsernameModal = function() {
            $uibModal.open({
                ariaLabelledBy: 'modal-title',
                ariaDescribedBy: 'modal-body',
                templateUrl: '/templates/username-modal.html',
                controller: 'UsernameModalCtrl',
                controllerAs: '$ctrl',
                size: 'sm',
                backdrop  : 'static',
                keyboard  : false,
                resolve: {
                    currentUser: function () {
                        return currentUser;
                    }
                }
            });
        };
        
        if (!currentUser || currentUser === '') {
            openUsernameModal();
            console.log(currentUser);
        }
        
    }
    angular
        .module('blocChat')
        .run(['$cookies', '$uibModal', BlocChatCookies]);
})();