'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var tslib = require('tslib');
var core$1 = require('@angular/core');
var core = require('@ionic-native/core');

var SpinnerDialog = /** @class */ (function (_super) {
    tslib.__extends(SpinnerDialog, _super);
    function SpinnerDialog() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    SpinnerDialog.prototype.show = function (title, message, cancelCallback, iOSOptions) { return core.cordova(this, "show", { "sync": true }, arguments); };
    SpinnerDialog.prototype.hide = function () { return core.cordova(this, "hide", { "sync": true }, arguments); };
    SpinnerDialog.pluginName = "SpinnerDialog";
    SpinnerDialog.plugin = "cordova-plugin-native-spinner";
    SpinnerDialog.pluginRef = "SpinnerDialog";
    SpinnerDialog.repo = "https://github.com/greybax/cordova-plugin-native-spinner";
    SpinnerDialog.platforms = ["Android", "iOS", "Windows Phone 8", "Windows"];
    SpinnerDialog.decorators = [
        { type: core$1.Injectable }
    ];
    return SpinnerDialog;
}(core.IonicNativePlugin));

exports.SpinnerDialog = SpinnerDialog;
