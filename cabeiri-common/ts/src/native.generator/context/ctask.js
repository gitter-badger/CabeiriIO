System.register([], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var CTask;
    return {
        setters:[],
        execute: function() {
            /**
             * To execute functions in a graph, user adds in tasks.
             */
            CTask = (function () {
                /**
                 * CTask constructor
                 * @param name : name of the task.
                 * @param cfunctionID : id of function to be executed. We just keep an ID, so that if the function is removed from its original module, we can detect it.
                 * @param target : object (within the task context) on which to call the function (optional for static functions??)
                 */
                function CTask(name, cfunctionID, target) {
                    var _this = this;
                    if (target === void 0) { target = null; }
                    this.name = name;
                    this.cfunctionID = cfunctionID;
                    this.target = target;
                    /**
                     * Will update the task using the function.
                     * If the function flow control outputs changed, this will be reflected in the flow control map.
                     */
                    this.refresh = function () {
                        var outFlowNames = _this.findOutFlowNames();
                        //find deprecated out flow and remove them from the flowControl map.
                        for (var flowNameIt = _this.flowControl.keys.length - 1; flowNameIt >= 0; --flowNameIt) {
                            var flowName = _this.flowControl.keys[flowNameIt];
                            //Found a flow output that isn't in the function anymore, removes it.
                            if (!(flowName in outFlowNames)) {
                                _this.flowControl.delete(flowName);
                            }
                        }
                        //Find new out flow and add them to the flowControl map.
                        for (var flowName in outFlowNames) {
                            //Found a new flow output. Add it to the map.
                            if (!(flowName in _this.flowControl.keys)) {
                                _this.flowControl[flowName] = new Array();
                            }
                        }
                    };
                    this.refresh();
                    this.next = new Array();
                }
                /**
                 * Find the out flow control tags in the associated function code.
                 * tags looks like the following
                 * //[CABEIRI_OUT:"output"]
                 * //[CABEIRI_OUT:"step_0"]
                 * Tags for out flow appear in c++ comments, so they won't conflict with any c++ syntax.
                 */
                CTask.prototype.findOutFlowNames = function () {
                    var outFlowNames;
                    var regexp = /\/\/\s*[CABEIRI_OUT\s*:\s*\"[A-Za-z]+\w*\"\s*\]/;
                    var body = this.getCFunction().reflectBody();
                    outFlowNames = regexp.exec(body);
                    return outFlowNames;
                };
                /**
                 * Retrieves the function this task needs to execute.
                 */
                CTask.prototype.getCFunction = function () {
                    //TODO there is no garantee that the function still exists (the static one, or in the module).
                    //Yet, our local reference, is still valid. 
                    //Try to find the function on the given target module.
                    //var module : CModule = clang.;
                    //  if (this.target != null)
                    {
                    }
                    //return this.cfunction;
                    return null;
                };
                /**
                 * Recursive function that add the function calls c++ code (of the task) to the body.
                 * Recurse on the subsequent tasks.
                 * @return {string} returns the c++ code.
                 */
                CTask.prototype.reflectBody = function () {
                    var body = this.getCFunction().reflectBody();
                    return "";
                };
                return CTask;
            }());
            exports_1("CTask", CTask);
        }
    }
});
//# sourceMappingURL=ctask.js.map