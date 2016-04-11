System.register([], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var GraphElement;
    return {
        setters:[],
        execute: function() {
            GraphElement = (function () {
                function GraphElement(name /*, some kind of graph manager to get the id.*/) {
                    this.name = name;
                    this.id = 0; /*todo*/
                }
                return GraphElement;
            }());
            exports_1("GraphElement", GraphElement);
        }
    }
});
//# sourceMappingURL=graph.element.js.map