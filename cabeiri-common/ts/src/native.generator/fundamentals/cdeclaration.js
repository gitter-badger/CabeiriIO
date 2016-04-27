System.register([], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var CDeclaration;
    return {
        setters:[],
        execute: function() {
            /**
             * Just a small class to define parameters for functions, or variable declaration in classes
             * Doesn't support the const concept. nor the reference. Ideally I prefer to hide this complexity.
             * will probably have to revisit this decision later on :)
             */
            CDeclaration = (function () {
                function CDeclaration(ctypeID, name, clang) {
                    this.ctypeID = ctypeID;
                    this.name = name;
                    this.clang = clang;
                }
                /**
                 * Retrieve the ctype object instance representing the type of this declaration.
                 */
                CDeclaration.prototype.getType = function () {
                    return this.clang.getCType(this.ctypeID);
                };
                return CDeclaration;
            }());
            exports_1("CDeclaration", CDeclaration);
        }
    }
});
//# sourceMappingURL=cdeclaration.js.map