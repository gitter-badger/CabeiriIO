System.register([], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var CID, CID_NONE;
    return {
        setters:[],
        execute: function() {
            /**
             * Allows to identify uniquely a module, a function, an instance.
             */
            CID = (function () {
                //for now, using a number...
                function CID(id) {
                    this.id = id;
                }
                CID.prototype.getID = function () {
                    return this.id + "";
                };
                CID.GetNewCID = function () {
                    return CID_NONE; // :(
                };
                return CID;
            }());
            exports_1("CID", CID);
            /**
             * Kind of a null pointer :)
             */
            exports_1("CID_NONE", CID_NONE = new CID(-1));
        }
    }
});
//# sourceMappingURL=cid.js.map