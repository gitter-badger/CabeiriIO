System.register(["../fundamentals/cid", "./cevent", "../fundamentals/type/cliteral", "../fundamentals/function/cppfunction"], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var cid_1, cevent_1, cliteral, cppfunction_1;
    var Context;
    return {
        setters:[
            function (cid_1_1) {
                cid_1 = cid_1_1;
            },
            function (cevent_1_1) {
                cevent_1 = cevent_1_1;
            },
            function (cliteral_1) {
                cliteral = cliteral_1;
            },
            function (cppfunction_1_1) {
                cppfunction_1 = cppfunction_1_1;
            }],
        execute: function() {
            /**
             * Represents a module usage in a context. more precisely, it knows :
             *  - which tasks to run in which order
             *  - Where to find the parameters for each task (function call).
             *  - Which events are available a to which function they bind.
             */
            Context = (function () {
                function Context(name, clang) {
                    this.name = name;
                    this.clang = clang;
                }
                /**
                 * For each event, the context generate a function. this function will be called by the cabeiri system when appropriate depending on the event type.
                 * @return {Array<CFunction>} Functions for every defined event by the user.
                 */
                Context.prototype.GenerateEventFunctions = function () {
                    var functions;
                    for (var eventType in this.events) {
                        var eventInfo = cevent_1.CEVENTS_BASIC[eventType];
                        //Create the actual function object. 
                        var eventFunction = new cppfunction_1.CPPFunction(eventInfo.name, cid_1.CID_NONE, cliteral.cvoid, eventInfo.GetParameters());
                        eventFunction.body = "";
                        var task = this.events[eventType];
                    }
                    return functions;
                };
                //--------------------------------------------
                /// Reflect implementation
                ///
                /**
                 * Returns header definition.
                 * @return {string}
                 */
                Context.prototype.reflectHeader = function () {
                    //For each entry point of the graph, create a function in the class.
                    //var function
                    return this.cclass.reflectHeader();
                };
                /**
                * Return all function definitions.
                * @return {string} [description]
                */
                Context.prototype.reflectBody = function () {
                    return "";
                };
                /**
                 * Gets the main cpp identifier. A.K.A the class name, the function name, etc.
                 * @return {string} [description]
                 */
                Context.prototype.reflectIdentifier = function () {
                    return name;
                };
                return Context;
            }());
            exports_1("Context", Context);
        }
    }
});
//# sourceMappingURL=context.js.map