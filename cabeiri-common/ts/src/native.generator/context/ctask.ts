import{CFunction}       from "../fundamentals/function/cfunction";
import{CModule}         from "../fundamentals/type/cmodule";
import{CType}           from "../ctype";
import{CDeclaration}    from "../fundamentals/cdeclaration";
import{CID}             from "../cid/cid";
import{CabeiriLang}     from "../cabeiri.lang";


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
     * @param cfunctionID : id of function to be executed. We just keep an ID, so that if the function is removed from its original module, we can detect it.
     * @param target : object (within the task context) on which to call the function (optional for static functions??)
     */
    constructor (public name:string, public cfunctionID : CID, public target : CDeclaration = null)
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
     * Tags for out flow appear in c++ comments, so they won't conflict with any c++ syntax. 
     */
    private findOutFlowNames() : Array<string>
    {
        var outFlowNames : Array<string>;
        
        var regexp = /\/\/\s*[CABEIRI_OUT\s*:\s*\"[A-Za-z]+\w*\"\s*\]/;
        var body : string = this.getCFunction().reflectBody();
        outFlowNames = regexp.exec(body);
        
        return outFlowNames; 
    }
    
    /**
     * Retrieves the function this task needs to execute.
     */
    public getCFunction() : CFunction
    {
        //TODO there is no garantee that the function still exists (the static one, or in the module).
        //Yet, our local reference, is still valid. 
        //Try to find the function on the given target module.
        //var module : CModule = clang.;
      //  if (this.target != null)
        {
        //    var module : CType = this.target.getType();
        }
        //return this.cfunction;
        return null;
    }
    
    /**
     * Recursive function that add the function calls c++ code (of the task) to the body.
     * Recurse on the subsequent tasks.  
     * @return {string} returns the c++ code.
     */
    public reflectBody() : string
    {
        var body : string = this.getCFunction().reflectBody();
        return "";
    }
}
