System.register(['angular2/platform/browser', './modules/editor/editor'], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var browser_1, editor_1;
    return {
        setters:[
            function (browser_1_1) {
                browser_1 = browser_1_1;
            },
            function (editor_1_1) {
                editor_1 = editor_1_1;
            }],
        execute: function() {
            browser_1.bootstrap(editor_1.Editor);
        }
    }
});
//# sourceMappingURL=main.js.map