angular.module("envconfig", [])
.constant("dev", {"baseUrl":"http://localhost:1337","tokenPrefix":"dev"})
.constant("sandbox", {"baseUrl":"http://sandbox-actual-api.herokuapp.com","tokenPrefix":"sandbox"})
.constant("demo", {"baseUrl":"http://demo-actual-api.herokuapp.com","tokenPrefix":"demo"})
.constant("production", {"baseUrl":"http://166.78.47.146","tokenPrefix":"production"})
.constant("ENV", {"baseUrl":"http://166.78.47.146","tokenPrefix":"production","name":"production"});
