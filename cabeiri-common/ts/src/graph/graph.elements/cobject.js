System.register(["./graph.element"], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var __extends = (this && this.__extends) || function (d, b) {
        for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
    var graph_element_1;
    var CObject;
    return {
        setters:[
            function (graph_element_1_1) {
                graph_element_1 = graph_element_1_1;
            }],
        execute: function() {
            CObject = (function (_super) {
                __extends(CObject, _super);
                function CObject(name, cclass) {
                    _super.call(this, name);
                    this.cclass = cclass;
                }
                return CObject;
            }(graph_element_1.GraphElement));
            exports_1("CObject", CObject);
        }
    }
});
//# sourceMappingURL=cobject.js.map