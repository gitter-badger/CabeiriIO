System.register(["./cevent", "../ctype", "../fundamentals/type/cliteral", "../fundamentals/function/cppfunction"], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var __extends = (this && this.__extends) || function (d, b) {
        for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
    var cevent_1, ctype_1, cliteral, cppfunction_1;
    var Context;
    return {
        setters:[
            function (cevent_1_1) {
                cevent_1 = cevent_1_1;
            },
            function (ctype_1_1) {
                ctype_1 = ctype_1_1;
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
            Context = (function (_super) {
                __extends(Context, _super);
                function Context(name, cid, clang) {
                    _super.call(this, name, cid, clang);
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
                        var eventFunction = new cppfunction_1.CPPFunction(eventInfo.name, cliteral.cvoid, eventInfo.GetParameters(), this.clang);
                        var task = this.events[eventType];
                        eventFunction.body = task.reflectBody();
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
            }(ctype_1.CType));
            exports_1("Context", Context);
        }
    }
});
//# sourceMappingURL=context.js.map