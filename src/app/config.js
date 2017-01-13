angular.module("envconfig", [])
.constant("dev", {"baseUrl":"http://localhost:1337"})
.constant("sandbox", {"baseUrl":"http://sandbox-actual-api.herokuapp.com"})
.constant("demo", {"baseUrl":"http://demo-actual-api.herokuapp.com"})
.constant("production", {"baseUrl":"http://actual-api.herokuapp.com"})
.constant("ENV", {"baseUrl":"http://localhost:1337","name":"dev"});
