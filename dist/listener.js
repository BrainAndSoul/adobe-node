"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var net_1 = require("net");
var newAdobeAppListener = function (host, port, callback) {
    var callbacks = new Map();
    var server;
    var client;
    function connectionListener(socket) {
        client = socket;
        socket.on('data', function (buffer) {
            var data = JSON.parse(buffer.toString());
            if (callbacks.has(data.command)) {
                callbacks.get(data.command)(data.stdout, data.stderr);
            }
            callback(data.command);
        });
    }
    function disposeServer() {
        if (client) {
            client.end();
        }
        server = null;
        console.log("Adobe Event Listener has been stopped at port ".concat(port));
    }
    return {
        addEventListener: function (event, callback) {
            if (callbacks.has(event)) {
                console.warn("".concat(event, " listener will be overwritten"));
            }
            callbacks.set(event, callback);
        },
        start: function () {
            if (server)
                return;
            server = (0, net_1.createServer)(connectionListener);
            server.listen(port, host, function () {
                console.log("Adobe Event Listener running at ".concat(host, ":").concat(port));
            });
        },
        close: function () {
            server.close(disposeServer);
        }
    };
};
exports.default = newAdobeAppListener;
//# sourceMappingURL=listener.js.map