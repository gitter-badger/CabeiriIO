System.register(["../../ctype", "../../cid/cid"], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var __extends = (this && this.__extends) || function (d, b) {
        for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
    var ctype_1, cid_1;
    var CFunction;
    return {
        setters:[
            function (ctype_1_1) {
                ctype_1 = ctype_1_1;
            },
            function (cid_1_1) {
                cid_1 = cid_1_1;
            }],
        execute: function() {
            /**
             * Represent a function in the user graph. This is a block of logic the user can insert in his graph.
             * Function can be defined in two ways : by inputing the code directly of the body (CPPFunction) or by creating a subgraph (GraphFunction)
             * Function take different parameters. All by reference for now. so if the user want to "retrun" a value, he must add a parameter and modify it.
             */
            CFunction = (function (_super) {
                __extends(CFunction, _super);
                /**
                 * Construct a function.
                 * cid is optionnal, as only static functions should have a cid. (worth make a separate type for those?)
                 */
                function CFunction(name, returnType, parameters, clang, cid) {
                    if (cid === void 0) { cid = cid_1.CID_NONE; }
                    _super.call(this, name, cid, clang);
                    this.returnType = returnType;
                    this.parameters = parameters;
                }
                /**
                 * Just for future use. Right now always void.
                 * @return {string} [description]
                 */
                CFunction.prototype.reflectReturnType = function () { return this.returnType.reflectIdentifier(); };
                /**
                 * generate the c++ string for declaring the function parameters.
                 * @return {string} [c++ string of the function parameters]
                 */
                CFunction.prototype.reflectParameters = function () {
                    var result;
                    for (var _i = 0, _a = this.parameters; _i < _a.length; _i++) {
                        var parameter = _a[_i];
                        //TODO shouldn't take basic types per reference.
                        result = ", " + result + parameter.getType().reflectIdentifier() + "&" + parameter.name;
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
            }(ctype_1.CType));
            exports_1("CFunction", CFunction);
        }
    }
});
//# sourceMappingURL=cfunction.js.map