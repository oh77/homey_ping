"use strict";

const { App } = require("homey");
const ping = require("ping");

class PingApp extends App {
  onInit() {
    this.log("MyApp is running...");

    var hosts = ["8.8.8.8", "google.com", "yahoo.com"];

    hosts.forEach(function(host) {
      ping.promise.probe(host).then(function(res) {
        this.log(res);
      });
    });
  }
}

module.exports = PingApp;
