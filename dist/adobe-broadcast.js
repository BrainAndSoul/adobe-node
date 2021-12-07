#!/usr/bin/env node
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var net_1 = require("net");
var minimist = require("minimist");
var defaults_1 = require("./defaults");
var args = minimist(process.argv.slice(2));
var host = args.host || defaults_1.default.host;
var port = Number(args.port) || defaults_1.default.port;
var message = args.msg;
var client = (0, net_1.connect)({ host: host, port: port }, function () {
    console.log('Adobe Broadcast connected');
});
client.setEncoding('utf8');
client.on('error', function (error) {
    console.error("Adobe Broadcast error: ".concat(JSON.stringify(error)));
});
client.write(message, function () {
    client.destroy();
    process.exit();
});
//# sourceMappingURL=adobe-broadcast.js.map