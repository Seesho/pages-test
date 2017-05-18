var app = angular.module("route", ["ngRoute"]);

app.config(function($routeProvider) {
    $routeProvider
    .when("/", {
        templateUrl : "main.html",
        controller : "redirect"
    })
    .when("/home", {
        templateUrl : "main.html"
    })
    .when("/blog", {
        templateUrl : "blog.html"
    })
    .when("/about", {
        templateUrl : "about.html"
    })
    .when("/resume", {
        templateUrl : "resume.html",
        controller : "resume"
    })
    .when("/projects", {
        templateUrl : "projects.html"
    })
    .when("/tracker", {
        templateUrl : "tracker.html",
        controller : "tracker"
    })
    .otherwise( {
      templateUrl: "main.html",
      controller : "redirect"
    } );

});
