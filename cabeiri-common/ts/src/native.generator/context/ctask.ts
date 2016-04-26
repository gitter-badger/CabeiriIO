import{CFunction}   from "../fundamentals/function/cfunction";
import{CModule}     from "../fundamentals/type/cmodule";
import{CDeclaration}     from "../fundamentals/cdeclaration";
import{CID}         from "../fundamentals/cid";

/**
 * To execute functions in a graph, user adds in tasks. 
 */
export class CTask
{
    /**
     * Every task has a "next" out flow control. allowing the user to define which tasks to execute once this one is completed.
     */
    private next : Array<CTask>;
    /**
     * Gives the next tasks in the graph to be executed from within the task function execution.
     * The keys of this array should be populate
     */
    private flowControl : Map<string, Array<CTask>>;
    
    /**
     * CTask constructor
     * @param name : name of the task.
     * @param cfunction : function to be executed.
     * @param target : object (within the task context) on which to call the function (optional for static functions??)
     */
    constructor (public name:string, public cfunction : CFunction, public target : CDeclaration)
    {
        this.refresh();
        this.next = new Array<CTask>();
    }
    
    /**
     * Will update the task using the function. 
     * If the function flow control outputs changed, this will be reflected in the flow control map.
     */
    public refresh = () => //make sure "this" refers to the object, not the function.
    {
        var outFlowNames : Array<string> = this.findOutFlowNames();
        
        //find deprecated out flow and remove them from the flowControl map.
        for (var flowNameIt = this.flowControl.keys.length - 1; flowNameIt >= 0; --flowNameIt)
        {
            var flowName : string = this.flowControl.keys[flowNameIt];
            //Found a flow output that isn't in the function anymore, removes it.
            if (!(flowName in outFlowNames))
            {
                this.flowControl.delete(flowName);
            }
        }
        
        //Find new out flow and add them to the flowControl map.
        for (var flowName in outFlowNames)
        {
            //Found a new flow output. Add it to the map.
            if (!(flowName in this.flowControl.keys))
            {
                this.flowControl[flowName] = new Array<CTask>();
            }
        }
    }
    
    /**
     * Find the out flow control tags in the associated function code.
     * tags looks like the following
     * //[CABEIRI_OUT:"output"]
     * //[CABEIRI_OUT:"step_0"]
     * Tags appear in c++ comments, so they won't conflict with any c++ syntax. 
     */
    private findOutFlowNames() : Array<string>
    {
        var outFlowNames : Array<string>;
        
        var regexp = /\/\/\s*[CABEIRI_OUT\s*:\s*\"[A-Za-z]+\w*\"\s*\]/;
        var body : string = this.getCFunction().reflectBody();
        outFlowNames = regexp.exec(body);
        
        return outFlowNames; 
    }
    
    public getCFunction() : CFunction
    {
        return this.cfunction;
    }
    
    /**
     * Recursive function that add the function calls c++ code (of the task) to the body.
     * Recurse on the subsequent tasks.  
     * @return {string} returns the c++ code.
     */
    public reflectBody() : string
    {
        //TODO 
        return "";
    }
}
