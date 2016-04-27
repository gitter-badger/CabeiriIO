System.register(["../../ctype"], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var __extends = (this && this.__extends) || function (d, b) {
        for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
    var ctype_1;
    var CModule;
    return {
        setters:[
            function (ctype_1_1) {
                ctype_1 = ctype_1_1;
            }],
        execute: function() {
            /**
             * Every object of a graph has a CClass, describing its behavior, its content.
             * @type {[type]}
             */
            CModule = (function (_super) {
                __extends(CModule, _super);
                function CModule(name, cid, clang) {
                    _super.call(this, name, cid, clang);
                    this.name = name;
                }
                /**
                 * The includes that should be added above the c++ file body for the functions to compile.
                 */
                CModule.prototype.GenerateFunctionIncludes = function () {
                    var allIncludes;
                    for (var _i = 0, _a = this.functions; _i < _a.length; _i++) {
                        var fct = _a[_i];
                        allIncludes.concat(fct.getIncludes());
                    }
                    return allIncludes;
                };
                //-------------------------------------------------------
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
                        result += "\t" + varDec.getType().reflectIdentifier() + " " + varDec.name + "\n;";
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
            }(ctype_1.CType));
            exports_1("CModule", CModule);
        }
    }
});
//# sourceMappingURL=cmodule.js.map