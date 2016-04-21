System.register([], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var CType;
    return {
        setters:[],
        execute: function() {
            /**
             * Base for literals and modules. Any declaration is done using a CType.
             */
            CType = (function () {
                function CType(name, cid) {
                    this.name = name;
                    this.cid = cid;
                }
                CType.prototype.getCID = function () {
                    return this.cid;
                };
                return CType;
            }());
            exports_1("CType", CType);
        }
    }
});
//# sourceMappingURL=ctype.js.map