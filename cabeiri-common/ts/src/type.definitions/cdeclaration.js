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
                function CDeclaration(type, name) {
                    this.type = type;
                    this.name = name;
                }
                return CDeclaration;
            }());
            exports_1("CDeclaration", CDeclaration);
        }
    }
});
//# sourceMappingURL=cdeclaration.js.map