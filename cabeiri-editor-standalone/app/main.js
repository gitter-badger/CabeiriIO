System.register(['angular2/platform/browser', './cabeiri_editor_standalone/cabeiri_editor_standalone'], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var browser_1, cabeiri_editor_standalone_1;
    return {
        setters:[
            function (browser_1_1) {
                browser_1 = browser_1_1;
            },
            function (cabeiri_editor_standalone_1_1) {
                cabeiri_editor_standalone_1 = cabeiri_editor_standalone_1_1;
            }],
        execute: function() {
            browser_1.bootstrap(cabeiri_editor_standalone_1.Editor);
        }
    }
});
//# sourceMappingURL=main.js.map