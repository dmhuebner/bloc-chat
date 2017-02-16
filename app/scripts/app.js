(function() {
    function config($stateProvider, $locationProvider) {
        $locationProvider
            .html5Mode({
                enabled: true,
                requireBase: false
            });
        
        $stateProvider
            .state('main', {
                url: '/'
            });
    }
    
    angular
        .module('blocChat', ['ui.router', 'firebase'])
        .config(config);
}());