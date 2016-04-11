System.register([], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var CClass;
    return {
        setters:[],
        execute: function() {
            /**
             * Every object of a graph has a CClass, describing its behavior, its content.
             * @type {[type]}
             */
            CClass = (function () {
                function CClass(name) {
                    this.name = name;
                }
                ///////////////
                /// Reflect implementation
                ///
                /**
                 * Returns header definition.
                 * @return {string}
                 */
                CClass.prototype.reflectHeader = function () {
                    var result;
                    result = "class " + this.reflectIdentifier() + "\n{\npublic:\n";
                    result += "\t//VARIABLE DECLARATIONS\n\n";
                    for (var _i = 0, _a = this.variableDeclarations; _i < _a.length; _i++) {
                        var varDec = _a[_i];
                        //TODO for now, everything is public
                        result += "\t" + varDec.type.reflectIdentifier() + " " + varDec.name + "\n;";
                    }
                    result += "\n\t//FUNCTION DEFINITIONS\n\n";
                    for (var _b = 0, _c = this.functions; _b < _c.length; _b++) {
                        var fct = _c[_b];
                        result += "\t" + fct.reflectHeader() + "\n;";
                    }
                    result += "};\n\n";
                    return result;
                };
                /**
                * Return all function definitions.
                * @return {string} [description]
                */
                CClass.prototype.reflectBody = function () {
                    var result;
                    result += "\n\t//FUNCTION DEFINITIONS\n\n";
                    for (var _i = 0, _a = this.functions; _i < _a.length; _i++) {
                        var fct = _a[_i];
                        result += fct.reflectReturnType() + " " + this.reflectIdentifier() + "::" + fct.reflectIdentifier() + "(" + fct.reflectParameters() + ")" + "\n";
                        result += "{\n";
                        result += fct.reflectBody();
                        result += "}\n\n";
                    }
                    return result;
                };
                /**
                 * Gets the main cpp identifier. A.K.A the class name, the function name, etc.
                 * @return {string} [description]
                 */
                CClass.prototype.reflectIdentifier = function () {
                    return name;
                };
                return CClass;
            }());
            exports_1("CClass", CClass);
        }
    }
});
//# sourceMappingURL=cclass.js.map