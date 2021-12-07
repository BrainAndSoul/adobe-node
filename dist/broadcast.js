"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.broadcast = exports.newBroadcastBuilder = void 0;
var api_1 = require("./api");
var child_process_1 = require("child_process");
var broadcastMethods = new Map([
    [api_1.AdobeAppName.Animate, function (cmd) { return "FLfile.runCommandLine(\"".concat(cmd, "\");"); }],
    [api_1.AdobeAppName.Photoshop, function (cmd) { return "app.system(\"".concat(cmd, "\");"); }],
    [api_1.AdobeAppName.Illustrator, function (cmd) { return "app.system(\"".concat(cmd, "\");"); }],
]);
var buildBroadcastCommand = function (host, port, message) {
    return "adobe-broadcast --host=".concat(host, " --port=").concat(port, " --msg=").concat(message);
};
var newBroadcastBuilder = function (config) {
    return {
        build: function (command) {
            var payload = "{\\\\\\\"command\\\\\\\":\\\\\\\"".concat(command, "\\\\\\\",\\\\\\\"stdout\\\\\\\":\\\\\\\"\" + __stdout + \"\\\\\\\",\\\\\\\"stderr\\\\\\\":\\\\\\\"\" + __stderr + \"\\\\\\\"}");
            var broadcast = broadcastMethods.get(config.app.name);
            var cmd = buildBroadcastCommand(config.host, config.port, payload);
            return broadcast(cmd);
        }
    };
};
exports.newBroadcastBuilder = newBroadcastBuilder;
var broadcast = function (host, port, message) {
    var cmd = buildBroadcastCommand(host, port, JSON.stringify(message));
    (0, child_process_1.exec)(cmd);
};
exports.broadcast = broadcast;
//# sourceMappingURL=broadcast.js.map