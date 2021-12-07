"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var commandTemplate = "\nvar ___{{__command__}} = (function() {\n    var __stderr;\n    var __stdout;\n    \n    try {\n      {{__vars__}}  \n      __stdout = {{__fn__}}\n    } catch (e) {\n      __stderr = e;\n    } finally {\n      {{__broadcast__}}\n    }\n  })();";
var newAdobeScriptBuilder = function () {
    var name;
    var vars;
    var body;
    var broadcast;
    var builder = {
        setName: function (value) {
            name = value;
            return builder;
        },
        setVariables: function (value) {
            vars = value;
            return builder;
        },
        setBody: function (value) {
            body = value;
            return builder;
        },
        setBroadcast: function (value) {
            broadcast = value;
            return builder;
        },
        build: function () {
            return commandTemplate
                .replace('{{__command__}}', name)
                .replace('{{__vars__}}', vars)
                .replace('{{__fn__}}', body)
                .replace('{{__broadcast__}}', broadcast);
        }
    };
    return builder;
};
exports.default = newAdobeScriptBuilder;
//# sourceMappingURL=script-builder.js.map