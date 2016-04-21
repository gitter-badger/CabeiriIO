System.register([], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var CTask;
    return {
        setters:[],
        execute: function() {
            /**
             * To execute functions in a graph, user adds in tasks.
             */
            CTask = (function () {
                function CTask(name, functionId, objectId) {
                    this.name = name;
                    this.functionId = functionId;
                    this.objectId = objectId;
                }
                return CTask;
            }());
            exports_1("CTask", CTask);
        }
    }
});
//# sourceMappingURL=ctask.js.map