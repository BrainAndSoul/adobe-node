"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AdobeAppEvent = exports.AdobeAppScriptFileType = exports.AdobeAppName = void 0;
var AdobeAppName;
(function (AdobeAppName) {
    AdobeAppName["Animate"] = "animate";
    AdobeAppName["Photoshop"] = "photoshop";
    AdobeAppName["Illustrator"] = "illustrator";
    AdobeAppName["InDesign"] = "indesign";
    AdobeAppName["Acrobat"] = "acrobat";
    AdobeAppName["AfterEffects"] = "after_effects";
})(AdobeAppName = exports.AdobeAppName || (exports.AdobeAppName = {}));
var AdobeAppScriptFileType;
(function (AdobeAppScriptFileType) {
    AdobeAppScriptFileType["Jsfl"] = "jsfl";
    AdobeAppScriptFileType["Jsx"] = "jsx";
})(AdobeAppScriptFileType = exports.AdobeAppScriptFileType || (exports.AdobeAppScriptFileType = {}));
var AdobeAppEvent;
(function (AdobeAppEvent) {
    AdobeAppEvent["OpenApp"] = "open_app";
    AdobeAppEvent["CloseApp"] = "close_app";
    AdobeAppEvent["NewDocument"] = "new_document";
    AdobeAppEvent["OpenDocument"] = "open_document";
    AdobeAppEvent["CloseDocument"] = "close_document";
    AdobeAppEvent["SaveAndCloseDocument"] = "save_and_close_document";
    AdobeAppEvent["SaveDocument"] = "save_document";
    AdobeAppEvent["SelectDocument"] = "select_document";
    AdobeAppEvent["SaveAsDocument"] = "save_as_document";
    AdobeAppEvent["RunScript"] = "run_script";
})(AdobeAppEvent = exports.AdobeAppEvent || (exports.AdobeAppEvent = {}));
//# sourceMappingURL=api.js.map