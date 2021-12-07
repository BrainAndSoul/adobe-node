"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.newAdobeApp = void 0;
var tslib_1 = require("tslib");
var api_1 = require("./api");
var listener_1 = require("./listener");
var process_1 = require("./process");
var commands_1 = require("./commands");
var script_file_creator_1 = require("./script-file-creator");
var broadcast_1 = require("./broadcast");
var newAdobeApp = function (config, timeoutCallback) {
    var scriptCreator = (0, script_file_creator_1.default)(config);
    var commandStack = (0, commands_1.default)();
    var eventListener = (0, listener_1.default)(config.host, config.port, eventListenerCallback);
    var appProcess = (0, process_1.default)(config.app.path, appCloseCallback, {
        timeout: config.appTimeout,
        timeoutCallback: timeoutCallback
    });
    function eventListenerCallback(commandName) {
        commandStack.resolve(commandName);
    }
    function appCloseCallback() {
        (0, broadcast_1.broadcast)(config.host, config.port, { command: api_1.AdobeAppEvent.CloseApp });
    }
    function useBuiltInScript(command) {
        return command === api_1.AdobeAppEvent.CloseDocument
            || command === api_1.AdobeAppEvent.SaveDocument
            || command === api_1.AdobeAppEvent.SaveAndCloseDocument
            || command === api_1.AdobeAppEvent.SaveAsDocument
            || command === api_1.AdobeAppEvent.OpenDocument
            || command === api_1.AdobeAppEvent.NewDocument
            || command === api_1.AdobeAppEvent.SelectDocument;
    }
    var app = {
        init: function () {
            eventListener.start();
        },
        on: function (event, callback) {
            eventListener.addEventListener(event, callback);
            return app;
        },
        runScript: function (command, options) {
            return new Promise(function (resolve, reject) { return (0, tslib_1.__awaiter)(void 0, void 0, void 0, function () {
                var commandPath;
                return (0, tslib_1.__generator)(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, scriptCreator.create(command, useBuiltInScript(command), options)];
                        case 1:
                            commandPath = _a.sent();
                            commandStack.push({ command: command, resolve: resolve, reject: reject });
                            appProcess.run(commandPath);
                            return [2 /*return*/];
                    }
                });
            }); });
        },
        saveDocument: function () {
            var documents = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                documents[_i] = arguments[_i];
            }
            return app.runScript(api_1.AdobeAppEvent.SaveDocument, { documents: documents });
        },
        selectDocument: function (document) {
            return app.runScript(api_1.AdobeAppEvent.SelectDocument, { document: document });
        },
        saveAsDocument: function (document, saveAs, options) {
            return app.runScript(api_1.AdobeAppEvent.SaveAsDocument, { document: document, saveAs: saveAs, options: options });
        },
        openDocument: function () {
            var documents = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                documents[_i] = arguments[_i];
            }
            return app.runScript(api_1.AdobeAppEvent.OpenDocument, { documents: documents });
        },
        closeDocument: function () {
            var documents = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                documents[_i] = arguments[_i];
            }
            return app.runScript(api_1.AdobeAppEvent.CloseDocument, { documents: documents });
        },
        saveAndCloseDocument: function () {
            var documents = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                documents[_i] = arguments[_i];
            }
            return app.runScript(api_1.AdobeAppEvent.SaveAndCloseDocument, { documents: documents });
        },
        newDocument: function (options) {
            return app.runScript(api_1.AdobeAppEvent.NewDocument, options);
        },
        open: function () { return new Promise(function (resolve, reject) { return (0, tslib_1.__awaiter)(void 0, void 0, void 0, function () {
            var scriptPath;
            return (0, tslib_1.__generator)(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, scriptCreator.create(api_1.AdobeAppEvent.OpenApp)];
                    case 1:
                        scriptPath = _a.sent();
                        appProcess.create(scriptPath);
                        commandStack.push({
                            command: api_1.AdobeAppEvent.OpenApp,
                            resolve: resolve,
                            reject: reject
                        });
                        return [2 /*return*/];
                }
            });
        }); }); },
        close: function () { return new Promise(function (resolve, reject) { return (0, tslib_1.__awaiter)(void 0, void 0, void 0, function () {
            return (0, tslib_1.__generator)(this, function (_a) {
                appProcess.kill();
                commandStack.push({
                    command: api_1.AdobeAppEvent.CloseApp,
                    resolve: resolve,
                    reject: reject
                });
                return [2 /*return*/];
            });
        }); }); },
        dispose: function () {
            eventListener.close();
        }
    };
    return app;
};
exports.newAdobeApp = newAdobeApp;
//# sourceMappingURL=app.js.map