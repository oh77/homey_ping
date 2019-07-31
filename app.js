"use strict";

const { App, FlowCardAction, FlowCardTrigger } = require("homey");
const ping = require("ping");

class PingApp extends App {
  onInit() {
    this.log("MyApp is running...");
  }
}

let pingAliveTrigger = new FlowCardTrigger("ping_success");
let pingDeadTrigger = new FlowCardTrigger("ping_failed");

const handlePing = host => {
  // let hosts = ["8.8.8.8", "google.com", "yahoo.com"];

  // hosts.forEach(function(host) {

  that.log(`Ping: ${host}`);
  ping.sys.probe(host, function(isAlive) {
    var msg = isAlive
      ? "host " + host + " is alive"
      : "host " + host + " is dead";
    console.log(msg);

    if (isAlive) {
      pingAliveTrigger
        .register()
        .trigger()
        .catch(this.error)
        .then(this.log);
    } else {
		pingDeadTrigger
        .register()
        .trigger()
        .catch(this.error)
        .then(this.log);
    }
  });
  // });
};

let startPingAction = new FlowCardAction("start_ping");
startPingAction.register().registerRunListener((args, state) => {
  let isStopped = handlePing('8.8.8.8'); // true or false
  return Promise.resolve(isStopped);
});

module.exports = PingApp;
