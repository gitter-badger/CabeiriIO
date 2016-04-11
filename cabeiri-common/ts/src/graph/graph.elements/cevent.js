System.register(["./graph.element"], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var __extends = (this && this.__extends) || function (d, b) {
        for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
    var graph_element_1;
    var CEvent;
    return {
        setters:[
            function (graph_element_1_1) {
                graph_element_1 = graph_element_1_1;
            }],
        execute: function() {
            CEvent = (function (_super) {
                __extends(CEvent, _super);
                function CEvent(name) {
                    _super.call(this, name);
                }
                return CEvent;
            }(graph_element_1.GraphElement));
            exports_1("CEvent", CEvent);
        }
    }
});
//# sourceMappingURL=cevent.js.map