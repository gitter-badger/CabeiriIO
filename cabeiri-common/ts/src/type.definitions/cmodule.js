System.register([], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var CModule;
    return {
        setters:[],
        execute: function() {
            /**
             * Every object of a graph has a CClass, describing its behavior, its content.
             * @type {[type]}
             */
            CModule = (function () {
                function CModule(name, id) {
                    this.name = name;
                    this.id = id;
                }
                ///////////////
                /// Reflect implementation
                ///
                /**
                 * Returns header definition.
                 * @return {string}
                 */
                CModule.prototype.reflectHeader = function () {
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
                CModule.prototype.reflectBody = function () {
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
                CModule.prototype.reflectIdentifier = function () {
                    return name;
                };
                return CModule;
            }());
            exports_1("CModule", CModule);
        }
    }
});
//# sourceMappingURL=cmodule.js.map