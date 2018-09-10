(function() {
  "use strict";

  angular.module("fuse").factory("api", apiService);

  /** @ngInject */
  function apiService($resource, $http, ENV) {
    var api = {};
    api.baseUrl = ENV.baseUrl;
    api.cdnUrl = ENV.cdnUrl;
    //api.baseUrl = 'http://localhost:1337';

    api.$http = function(req) {
      var data = api.serialize(req);
      return $http(data);
    };

    api.$http.post = function(url, data) {
      var req = { method: "post", url: url, data: data };
      return api.$http(req);
    };

    api.$http.get = function(url, data) {
      var req = { method: "get", url: url, data: data };
      return api.$http(req);
    };

    api.serialize = function(req) {
      req.url = api.baseUrl + req.url;
      req.data = req.data || {};
      //req.data.apiKey = "#{APIKEY}";
      //req.data.hash = hash(req.data, $crypthmac);
      if (req.method === "get") {
        req.url += "?";
        Object.keys(req.data).forEach(function(k) {
          req.url += "&" + k + "=" + req.data[k];
        });
      }
      return req;
    };

    return api;
  }
})();
