System.register([], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var CFunction;
    return {
        setters:[],
        execute: function() {
            /**
             * Represent a function in the user graph. This is a block of logic the user can insert in his graph.
             * Function can be defined in two ways : by inputing the code directly of the body (CPPFunction) or by creating a subgraph (GraphFunction)
             * Function take different parameters. All by reference for now. so if the user want to "retrun" a value, he must add a parameter and modify it.
             *
             *
             */
            CFunction = (function () {
                function CFunction(name) {
                    this.name = name;
                }
                /**
                 * Just for future use. Right now always void.
                 * @return {string} [description]
                 */
                CFunction.prototype.reflectReturnType = function () { return "void"; };
                /**
                 * Just for future use.
                 * @return {string} [description]
                 */
                CFunction.prototype.reflectParameters = function () {
                    var result;
                    for (var _i = 0, _a = this.parameters; _i < _a.length; _i++) {
                        var parameter = _a[_i];
                        //TODO shouldn't take basic types per reference.
                        result = ", " + result + parameter.type.reflectIdentifier() + "&" + parameter.name;
                    }
                    //remove first ", "
                    return result.substr(2, result.length);
                };
                /**
                 * Return header cpp definition. meaning the class headers, function headers.
                 * @return {string} [description]
                 */
                CFunction.prototype.reflectHeader = function () {
                    return this.reflectReturnType() + " " + this.reflectIdentifier() + "(" + this.reflectParameters() + ")";
                };
                /**
                * Gets the main cpp identifier. A.K.A the class name, the function name, etc.
                * @return {string} [description]
                */
                CFunction.prototype.reflectIdentifier = function () {
                    return name;
                };
                return CFunction;
            }());
            exports_1("CFunction", CFunction);
        }
    }
});
//# sourceMappingURL=cfunction.js.map