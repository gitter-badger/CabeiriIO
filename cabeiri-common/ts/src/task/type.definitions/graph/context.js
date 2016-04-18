System.register([], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var Context;
    return {
        setters:[],
        execute: function() {
            /**
             * Represents a module usage in a context. more precisely, it knows :
             *  - which tasks to run in which order
             *  - Where to find the parameters for each task (function call).
             *  - Which events are available a to which function they bind.
             */
            Context = (function () {
                function Context() {
                }
                Context.prototype.GenerateEventFunctions = function () {
                    var functions;
                    for (var eventType in this.events) {
                        var functionName = EVENT_NAMES[eventType];
                        var eventFunction = { name: functionName, id: 0, parameters: [], };
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