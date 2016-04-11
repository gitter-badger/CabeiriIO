System.register(["./graph.element"], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var __extends = (this && this.__extends) || function (d, b) {
        for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
    var graph_element_1;
    var CFunctionCall;
    return {
        setters:[
            function (graph_element_1_1) {
                graph_element_1 = graph_element_1_1;
            }],
        execute: function() {
            CFunctionCall = (function (_super) {
                __extends(CFunctionCall, _super);
                function CFunctionCall(name, cfunction) {
                    _super.call(this, name);
                    this.cfunction = cfunction;
                }
                return CFunctionCall;
            }(graph_element_1.GraphElement));
            exports_1("CFunctionCall", CFunctionCall);
        }
    }
});
//# sourceMappingURL=cfunction.call.js.map