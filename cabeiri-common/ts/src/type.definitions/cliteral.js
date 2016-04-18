System.register([], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var __extends = (this && this.__extends) || function (d, b) {
        for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
    var CLiteral, LITERALS, CVoid, CInt, CChar, CByte, CString;
    return {
        setters:[],
        execute: function() {
            /**
             * A lightweight implementation of CType for c++ literals
             */
            CLiteral = (function () {
                function CLiteral(name) {
                    this.name = name;
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
                 * Gets the main cpp identifier. ("int", "void", type...)
                 */
                CLiteral.prototype.reflectIdentifier = function () { return name; };
                ;
                return CLiteral;
            }());
            /**
             * Predefined types for literals.
             *
             */
            exports_1("LITERALS", LITERALS = [
                new CVoid(), new CChar(), new CByte(), new CString()
            ]);
            /**
             * Follows all literals definition
             */
            CVoid = (function (_super) {
                __extends(CVoid, _super);
                function CVoid() {
                    _super.call(this, "void");
                }
                return CVoid;
            }(CLiteral));
            exports_1("CVoid", CVoid);
            CInt = (function (_super) {
                __extends(CInt, _super);
                function CInt() {
                    _super.call(this, "int");
                }
                return CInt;
            }(CLiteral));
            exports_1("CInt", CInt);
            CChar = (function (_super) {
                __extends(CChar, _super);
                function CChar() {
                    _super.call(this, "char");
                }
                return CChar;
            }(CLiteral));
            exports_1("CChar", CChar);
            CByte = (function (_super) {
                __extends(CByte, _super);
                function CByte() {
                    _super.call(this, "byte");
                }
                return CByte;
            }(CLiteral));
            exports_1("CByte", CByte);
            /**
             * Would be nice to offer out of the box handling for strings. leaving this here as a reminder
             */
            CString = (function (_super) {
                __extends(CString, _super);
                function CString() {
                    _super.call(this, "char*");
                }
                return CString;
            }(CLiteral));
            exports_1("CString", CString);
        }
    }
});
//# sourceMappingURL=cliteral.js.map