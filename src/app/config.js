angular.module("envconfig", [])
.constant("dev", {"baseUrl":"http://localhost:1337","cdnUrl":"https://d116li125og699.cloudfront.net","tokenPrefix":"dev"})
.constant("sandbox", {"baseUrl":"http://166.78.47.146:8080","cdnUrl":"https://d116li125og699.cloudfront.net","tokenPrefix":"sandbox"})
.constant("demo", {"baseUrl":"http://demo-actual-api.herokuapp.com","cdnUrl":"https://d116li125og699.cloudfront.net","tokenPrefix":"demo"})
.constant("production", {"baseUrl":"http://api.miactual.com","cdnUrl":"https://d116li125og699.cloudfront.net","tokenPrefix":"production"})
.constant("ENV", {"baseUrl":"http://localhost:1337","cdnUrl":"https://d116li125og699.cloudfront.net","tokenPrefix":"dev","name":"dev"});
