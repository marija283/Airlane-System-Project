var AirlaneSystem = angular.module('airlane-system',[
    'ui.router',
    'ui.bootstrap',
    'ngMaterial'
    ]);

AirlaneSystem
    .config(['$stateProvider','$urlRouterProvider','$locationProvider',
    function($stateProvider,$urlRouterProvider,$locationProvider){
        $urlRouterProvider.otherwise("/");

        $stateProvider
            .state('home',{
                url:'/',
                templateUrl:'app/views/home.html',
                controller:'homeController'
            })
            .state('test',{
                url:'/test',
                templateUrl:'app/views/test.html',
                controller:'homeController'
            })
            .state('searchTickets',{
                url:'/search-tickets',
                templateUrl:'app/views/searchTickets.html',
                controller:'searchTicketsController'
            })
            .state('userInfo',{
                url:'/user-info',
                views:{
                    '':{
                        templateUrl:'app/views/userInfo.html',
                        controller:'userInfoController'
                    },
                    'trip@userInfo':{
                        templateUrl:"app/views/tripSummary.html",
                        controller:"tripSummaryController"
                    }
                }
            })
            .state('payment',{
                url:'/payment',
                views:{
                    '':{
                        templateUrl:'app/views/payment.html',
                        controller:'paymentController'
                    },
                    'trip@payment':{
                        templateUrl:"app/views/tripSummary.html",
                        controller:"tripSummaryController"
                    }
                }
            })
            .state('confirmation',{
                url:'/confirmation',
                views:{
                    '':{
                        templateUrl:'app/views/confirmation.html',
                        controller:'confirmationController'
                    },
                    'trip@confirmation':{
                        templateUrl:"app/views/tripSummary.html",
                        controller:"tripSummaryController"
                    }
                }

            })

    }]);


// jQuery for page scrolling feature - requires jQuery Easing plugin
$(function() {
    $('body').on('click', '.page-scroll', function(event) {
        event.preventDefault();
        var $anchor = $(this);
        $('html, body').stop().animate({
            scrollTop: $($anchor.attr('href')).offset().top
        }, 1500, 'easeInOutExpo');

    });
});