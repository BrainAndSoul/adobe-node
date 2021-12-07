"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var os = require("os");
var child_process_1 = require("child_process");
var fs_1 = require("fs");
var newAdobeAppProcess = function (appPath, closeCallback, options) {
    var process;
    var timeoutCallback = options.timeoutCallback;
    var processTimeout = options.timeout || 0;
    var openCmd = os.platform() === "win32" ? "start" : "open -a";
    var createCallback = function (execTime) { return function (error, stdout, stderr) {
        var becauseOfTimeout = Date.now() - execTime >= processTimeout && processTimeout > 0;
        if (becauseOfTimeout && timeoutCallback) {
            timeoutCallback(error);
        }
        else {
            closeCallback(stdout);
        }
    }; };
    return {
        create: function (openAppScript) {
            var execFileCallback = createCallback(Date.now());
            if (!(0, fs_1.existsSync)(appPath)) {
                throw new Error('Wrong app path');
            }
            process = (0, child_process_1.execFile)(appPath, [openAppScript], { timeout: processTimeout }, execFileCallback);
        },
        kill: function () {
            process.kill();
        },
        run: function (commandPath) {
            (0, child_process_1.exec)("".concat(openCmd, " ").concat(appPath.replace(/ /g, "\\ "), " ").concat(commandPath.replace(/ /g, "\\ ")));
        }
    };
};
exports.default = newAdobeAppProcess;
//# sourceMappingURL=process.js.map