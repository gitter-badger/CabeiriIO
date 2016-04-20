System.register(["./cfunction"], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var __extends = (this && this.__extends) || function (d, b) {
        for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
    var cfunction_1;
    var CPPFunction;
    return {
        setters:[
            function (cfunction_1_1) {
                cfunction_1 = cfunction_1_1;
            }],
        execute: function() {
            /**
             * A function for which the user gives directly the cpp.
             */
            CPPFunction = (function (_super) {
                __extends(CPPFunction, _super);
                function CPPFunction(name, id) {
                    _super.call(this, name, id);
                }
                ///////////////
                /// Reflect implementation
                ///
                /**
                * Return full cpp definition. meaning the function body.
                * @return {string} [description]
                */
                CPPFunction.prototype.reflectBody = function () {
                    return this.body;
                };
                return CPPFunction;
            }(cfunction_1.CFunction));
            exports_1("CPPFunction", CPPFunction);
        }
    }
});
//# sourceMappingURL=cppfunction.js.map