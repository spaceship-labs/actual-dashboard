angular.module("envconfig", [])
.constant("dev", {"baseUrl":"http://actual-api.herokuapp.com"})
.constant("sandbox", {"baseUrl":"http://actual-api.herokuapp.com"})
.constant("demo", {"baseUrl":"http://actual-api.herokuapp.com"})
.constant("production", {"baseUrl":"http://actual-api.herokuapp.com"})
.constant("ENV", {"baseUrl":"http://actual-api.herokuapp.com","name":"dev"});
