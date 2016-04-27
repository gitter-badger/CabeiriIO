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
                /**
                 * Generates a new unique CID.
                 */
                CID.GetNewCID = function () {
                    return new CID(CID.generateUUID());
                };
                /**
                 * Generates unique id using date and random.
                 * very low probability of having collision across different clients,
                 * still we should pay attention to that when uploading ids on server.
                 */
                CID.generateUUID = function () {
                    var date = new Date().getTime();
                    if (window.performance && typeof window.performance.now === "function") {
                        date += performance.now(); //use high-precision timer if available
                    }
                    var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
                        var random = (date + Math.random() * 16) % 16 | 0;
                        date = Math.floor(date / 16);
                        return (c == 'x' ? random : (random & 0x3 | 0x8)).toString(16);
                    });
                    return uuid;
                };
                return CID;
            }());
            exports_1("CID", CID);
            /**
             * Kind of a null pointer :)
             */
            exports_1("CID_NONE", CID_NONE = new CID("ID_NONE"));
        }
    }
});
//# sourceMappingURL=cid.js.map