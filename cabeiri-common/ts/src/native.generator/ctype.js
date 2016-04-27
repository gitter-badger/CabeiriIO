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
                /**
                 * Create a new CType
                 * @param name : Name of the type, like the module name, function name, literal name. Used as the c++ identifier.
                 * @param cid : unique id of the type.
                 * @param clang : instance to the cabeiri lang instance.
                 */
                function CType(name, cid, clang) {
                    this.name = name;
                    this.cid = cid;
                    this.clang = clang;
                }
                CType.prototype.getCID = function () {
                    return this.cid;
                };
                /**
                 * Implemented the replacer function to avoid exporting the Cabeiri Lang reference.
                 */
                CType.prototype.replacer = function (key, value) {
                    if (key == "clang") {
                        return "none";
                    }
                    else {
                        return value;
                    }
                };
                return CType;
            }());
            exports_1("CType", CType);
        }
    }
});
//# sourceMappingURL=ctype.js.map