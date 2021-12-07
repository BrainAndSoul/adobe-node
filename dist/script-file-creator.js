"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var path = require("path");
var fs = require("fs");
var api_1 = require("./api");
var script_builder_1 = require("./script-builder");
var broadcast_1 = require("./broadcast");
var defaults_1 = require("./defaults");
var scriptingExtension = new Map([
    [api_1.AdobeAppName.Animate, api_1.AdobeAppScriptFileType.Jsfl],
    [api_1.AdobeAppName.Photoshop, api_1.AdobeAppScriptFileType.Jsx],
    [api_1.AdobeAppName.Illustrator, api_1.AdobeAppScriptFileType.Jsx],
    [api_1.AdobeAppName.InDesign, api_1.AdobeAppScriptFileType.Jsx]
]);
var newAdobeScriptFileCreator = function (config) {
    var appName = config.app.name;
    var jsPath = config.jsPath || defaults_1.default.scriptsPath;
    var adobeScriptsPath = config.app.adobeScriptsPath || defaults_1.default.adobeScriptsPath;
    var scriptBuilder = (0, script_builder_1.default)();
    var broadcastBuilder = (0, broadcast_1.newBroadcastBuilder)(config);
    var buildVars = function (args) {
        var list = [];
        var arg;
        for (var name_1 in args) {
            arg = args[name_1];
            if (arg) {
                list.push("var ".concat(name_1, "=").concat(arg.constructor.name === "String"
                    ? "\"".concat(arg, "\"")
                    : arg.constructor.name === "Array" ? "".concat(JSON.stringify(arg))
                        : arg, ";"));
            }
            else {
                list.push("var ".concat(name_1, ";"));
            }
        }
        return "".concat(list.length ? list.join('\n') : '');
    };
    var buildBody = function (command, useBuiltInScript) {
        var scriptPath = path.join(jsPath, appName, "".concat(command, ".js"));
        var builtInScript = path.join(__dirname, '..', 'scripts', appName, "".concat(command, ".js"));
        if (useBuiltInScript && fs.existsSync(builtInScript)) {
            console.info("Built-in Script file found: ".concat(builtInScript));
            return fs.readFileSync(builtInScript).toString();
        }
        if (fs.existsSync(scriptPath)) {
            console.info("Custom script file found: ".concat(scriptPath));
            return fs.readFileSync(scriptPath).toString();
        }
        return "\"\";";
    };
    var createFile = function (command, content) { return new Promise(function (resolve, reject) {
        var filePath = path.join(adobeScriptsPath, "".concat(command, ".").concat(scriptingExtension.get(appName)));
        var fileDirname = path.dirname(filePath);
        if (fs.existsSync(fileDirname)) {
            fs.writeFile(filePath, content, "utf-8", function (err) {
                return err ? reject(err) : resolve(filePath);
            });
        }
        else {
            return reject("The path (".concat(fileDirname, ") is not valid."));
        }
    }); };
    return {
        create: function (command, useBuiltInScript, args) {
            return new Promise(function (resolve, reject) {
                var variables = buildVars(args);
                var body = buildBody(command, useBuiltInScript);
                var broadcast = broadcastBuilder.build(command);
                var content = scriptBuilder
                    .setName(command)
                    .setVariables(variables)
                    .setBody(body)
                    .setBroadcast(broadcast)
                    .build();
                return createFile(command, content).then(resolve).catch(reject);
            });
        }
    };
};
exports.default = newAdobeScriptFileCreator;
//# sourceMappingURL=script-file-creator.js.map