System.register(["../../ctype"], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var __extends = (this && this.__extends) || function (d, b) {
        for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
    var ctype_1;
    var CLiteral, CString, cvoid, cint, cchar, cbyte, cfloat, cdouble, cstring;
    /**
     * Create all literals instances.
     * must be called once CLang is setup.
     */
    function setup(clang) {
        exports_1("cvoid", cvoid = clang.registerCType("void", CLiteral));
        exports_1("cint", cint = clang.registerCType("int", CLiteral));
        exports_1("cchar", cchar = clang.registerCType("char", CLiteral));
        exports_1("cbyte", cbyte = clang.registerCType("byte", CLiteral));
        exports_1("cfloat", cfloat = clang.registerCType("float", CLiteral));
        exports_1("cdouble", cdouble = clang.registerCType("double", CLiteral));
        exports_1("cstring", cstring = clang.registerCType("char*", CString));
    }
    exports_1("setup", setup);
    return {
        setters:[
            function (ctype_1_1) {
                ctype_1 = ctype_1_1;
            }],
        execute: function() {
            /**
             * A lightweight implementation of CType for c++ literals
             * This class will export nothing to c++ headers or body. it only has the identifier that is set (void, int, char, byte, etc.)
             */
            CLiteral = (function (_super) {
                __extends(CLiteral, _super);
                function CLiteral(name, cid, clang) {
                    _super.call(this, name, cid, clang);
                }
                /**
                 * Return header cpp definition. meaning the class headers, function headers.
                 * @return {string} [description]
                 */
                CLiteral.prototype.reflectHeader = function () { return ""; };
                /**
                 * Return full cpp definition. meaning the class body, function body.
                 * @return {string} [description]
                 */
                CLiteral.prototype.reflectBody = function () { return ""; };
                /**
                 * Gets the main cpp identifier. (function name, class name, type for literals...)
                 */
                CLiteral.prototype.reflectIdentifier = function () { return name; };
                ;
                return CLiteral;
            }(ctype_1.CType));
            exports_1("CLiteral", CLiteral);
            /**
             * Would be nice to offer out of the box handling for strings. leaving this here as a reminder
             */
            CString = (function (_super) {
                __extends(CString, _super);
                function CString(name, cid, clang) {
                    _super.call(this, name, cid, clang);
                }
                return CString;
            }(CLiteral));
            exports_1("CString", CString);
        }
    }
});
//# sourceMappingURL=cliteral.js.map