System.register(["./fundamentals/cid", "./context/context", "./fundamentals/type/cliteral"], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var cid_1, context_2, cliteral;
    var CabeiriLang;
    return {
        setters:[
            function (cid_1_1) {
                cid_1 = cid_1_1;
            },
            function (context_2_1) {
                context_2 = context_2_1;
            },
            function (cliteral_1) {
                cliteral = cliteral_1;
            }],
        execute: function() {
            /**
             * This is the root of the native code representation. The "language" :)
             * It contains all the module definitions, the function definitions, all the contexts.
             * This is where you will seek for an original class/function/etc when you have its id. It is also the entity that can attribute new ids.
             */
            CabeiriLang = (function () {
                function CabeiriLang() {
                }
                /**
                 * Probably better to keep this not in the constructor.
                 */
                CabeiriLang.prototype.init = function () {
                    //Setup literals
                    cliteral.setup(this);
                };
                /**
                 * Initialize a root context.
                 * Should eventually, be able to read that from a file/server
                 */
                CabeiriLang.prototype.createRootContext = function () {
                    this.rootContext = new context_2.Context("root context", this);
                };
                /**
                 * Creates a new instance of the given ctype with the given name. a new cid will be given.
                 */
                CabeiriLang.prototype.registerCType = function (name, ctype) {
                    var cid = cid_1.CID.GetNewCID();
                    var newCType = new ctype(name, cid);
                    this.ctypes.set(cid, newCType);
                    return newCType;
                };
                CabeiriLang.prototype.getCType = function (typeID) {
                    return this.ctypes.get(typeID);
                };
                CabeiriLang.prototype.getStaticFunction = function (functionID) {
                    return this.staticCFunctions.get(functionID);
                };
                CabeiriLang.prototype.getRootContext = function () {
                    return this.rootContext;
                };
                return CabeiriLang;
            }());
            exports_1("CabeiriLang", CabeiriLang);
        }
    }
});
//Start from here : the compiler should take care of turning this project in c++ via the various reflect functions :) 
//# sourceMappingURL=cabeiri.lang.js.map