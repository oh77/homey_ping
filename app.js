"use strict";

const { App } = require("homey");
const ping = require("ping");

class PingApp extends App {
  onInit() {
    this.log("MyApp is running...");

    let that = this;
    let hosts = ["8.8.8.8", "google.com", "yahoo.com"];

    hosts.forEach(function(host) {
      that.log(`Ping: ${host}`);
      ping.sys.probe(host, function(isAlive) {
        var msg = isAlive
          ? "host " + host + " is alive"
          : "host " + host + " is dead";
        console.log(msg);
      });
    });
  }
}

module.exports = PingApp;
