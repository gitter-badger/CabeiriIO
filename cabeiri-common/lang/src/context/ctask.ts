import{CFunction}       from "../fundamentals/function/cfunction";
import{CModule}         from "../fundamentals/type/cmodule";
import{CabeiriLog}      from "../logging/logging";
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
     * flow control is for code structure like "if" or "for" statement, allowing to execute subsequent task from within the task's function
     * The keys of this array should be populate.
     */
    private flowControl : Map<string, Array<CTask>>;
    
    /**
     * Maps the task's function parameters to variables in the context.
     * key : string : function parameter name
     */
    private parametersAssignment : Map<string, CDeclaration>;
    
    /**
     * Weither or not we should put the output the function code directly, or output a call to the function.
     * Incompatible with a target being not null.
     * Right now, if we have any flow control, we automatically inline, even though this is a bit limitating.
     */
    private inline : boolean = false;
    
    /**
     * CTask constructor
     * @param name : name of the task.
     * @param cfunctionID : id of function to be executed. We just keep an ID, so that if the function is removed from its original module, we can detect it.
     * @param target : object (within the task context) on which to call the function (optional for static functions??)
     */
    constructor (public name:string, public cfunctionID : CID, protected clang : CabeiriLang, public target : CDeclaration = null)
    {
        this.refresh();
        this.next = new Array<CTask>();
    }
    
    /**
     * Validate the given assignement for a function parameter of the task.
     * @param parameterName : Name of the parameter of the function the will be assigned
     * @param variableToUse : variable which we assign to the parameter.
     * @param fctParameters : the function parameters.
     * @param outMsgs : any issue will be reported in this array.
     * @return {boolean}
     */
    public validateAssignment(parameterName : string, variableToUse : CDeclaration, fctParameters : Array<CDeclaration>, outMsgs : Array<string>) : boolean
    {
        if (fctParameters.length == 0)
        {
            outMsgs.push("Could not find any matching function parameter for assignment.");
            return false;
        }
        else if (fctParameters.length > 1)
        {
            outMsgs.push("Found too many function parameters for assignment.");
            return false;
        }
        else if (!variableToUse.getType().canAssignTo(fctParameters[0].getType()))
        {
            outMsgs.push("Trying to assign a variable which type doesn't math the function parameter's type.");
            return false;
        }
        
        return true;
    }
    
    /**
     * Validate if all current assignements are valid.
     * @param fctParameters : the function parameters.
     * @param outMsgs : any issue will be reported in this array.
     */
    public validateAssignments(fctParameters : Array<CDeclaration>, outMsgs : Array<string>) : boolean
    {
        var success : boolean = false;
        this.parametersAssignment.forEach((variableToUse: CDeclaration, parameter : string) =>
        {
            success = success && this.validateAssignment(parameter, variableToUse, fctParameters, outMsgs);
        });
        if (this.parametersAssignment.size != fctParameters.length)
        {
            outMsgs.push("Task parameters assignment do not match the number of parameters of the function.");
            success = false;
        }
        
        return success;
    }
    
    /**
     * Bind a variable to a parameter of the function.
     */
    public setParameterAssignment(parameterName : string, variableToUse : CDeclaration) 
    {
        var fctParameters : Array<CDeclaration> = this.getCFunction().getParameters().filter((dcl : CDeclaration) => {return dcl.name == parameterName;});
        var msgs : Array<string> = new Array<string>();
        if (this.validateAssignment(parameterName, variableToUse, fctParameters, msgs))
        {
            this.parametersAssignment.set(parameterName, variableToUse);
        } 
        else
        {
            //invalid to get errors at this point.
            for (var msg of msg)
            {
                CabeiriLog.warning(msg);
            }   
        }
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
            if (outFlowNames.indexOf(flowName) != -1)
            {
                this.flowControl.delete(flowName);
            }
        }
        
        //Find new out flow and add them to the flowControl map.
        for (var flowName of outFlowNames)
        {
            //Found a new flow output. Add it to the map.
            if (!this.flowControl.has(flowName))
            {
                this.flowControl[flowName] = new Array<CTask>();
            }
        }
        
        //If we have "out flow" meaning we are structural code like a "if" or a "for" loop. then we need to inline this function code. 
        this.inline = this.flowControl.size != 0;
        
        //find deprecated parameter assignment and remove them
        var fctParameters : Array<CDeclaration> = this.getCFunction().getParameters();
        for (var declaration of fctParameters)
        {
            //Found a flow output that isn't in the function anymore, removes it.
            if (this.parametersAssignment.has(declaration.name))
            {
                this.parametersAssignment.delete(declaration.name);
            }
        }
    }
    
    /**
     * Utility function to navigate through the task graph.
     * @param functor : will be called with every task of the graph.
     */
    public navigateTaskGraph = (functor : (task : CTask) => void) =>
    {
        //we ensured that "this" refers to the task here.
        functor(this);
        
        //tasks within custom out flow control
        this.flowControl.forEach((tasks : CTask[], outFlowName : string, flowControl : Map<String, CTask[]>) =>
        {
            for(var task of tasks)
            {
                task.navigateTaskGraph(functor);
            }
        });

        //next tasks
        for(var task of this.next)
        {
            task.navigateTaskGraph(functor);
        }
    }
    
    /**
     * Regular expression to find flow control tags in native code.
     * tags looks like the following
     * //[CABEIRI_OUT:"output"]
     * //[CABEIRI_OUT:"step_0"]
     * Tags for out flow appear in c++ comments, so they won't conflict with any c++ syntax. 
     */
    public static regexp = /\/\/\s*[CABEIRI_OUT\s*:\s*\"[A-Za-z]+\w*\"\s*\]/;
    
    /**
     * Find the out flow control tags in the associated function code.
     */
    private findOutFlowNames() : Array<string>
    {
        var outFlowNames : Array<string>;
        
        var body : string = this.getCFunction().reflectBody();
        outFlowNames = CTask.regexp.exec(body);
        
        return outFlowNames; 
    }
    
    /**
     * Retrieves the function this task needs to execute.
     */
    public getCFunction() : CFunction
    { 
        //Try to find the function on the given target module.
        if (this.target != null)
        {
            var ctype : CType = this.target.getType();
            if (!(ctype instanceof(CModule)))
            {
                CabeiriLog.error("Task function's target is not a module. This is invalid.");
                return null;
            }
            else
            {
                var cmodule : CModule = <CModule>(ctype);
                return cmodule.getFunction(this.cfunctionID);
            }
        }
        else
        {
            //static function. it is not on a module
            var ctype : CType = this.clang.getCType(this.cfunctionID);
            if (!(ctype instanceof(CFunction)))
            {
                CabeiriLog.error("Task function's id isn't referencing a valid function.");
                return null;
            }
            return <CFunction> ctype;
        }
    }
    
    /**
     * Output the native code to perform a call to the function.
     */
    public reflectFunctionCall(cfunction : CFunction, parameters : Array<CDeclaration>) : string
    {
        var result : string;
        if (this.target != null)
        {
            result += this.target.name + "."
        }
        
        result += cfunction.reflectIdentifier() + "(";
        for (var param of parameters)
        {
            //TODO allow accessing nested variables.
            result += this.parametersAssignment[param.name].name + ", ";
        }
        // remove last ", "
        result = result.substr(0, result.length - 2);
        result += ");\n";
        
        return result;
    }
    
    /**
     * Output the native code to perform a call to the function.
     */
    public reflectFunctionInline(cfunction : CFunction, parameters : Array<CDeclaration>) : string
    {
        //Add a scope so we can declare some extra variable without conflicts...
        var result : string = "{\n";
        
        //We are inlining, so any parameter must become a correctly named variable in our scope.
        for (var param of parameters)
        {
            //TODO allow accessing nested variables.
            result += param.getType() + "& " + param.name + " = " + this.parametersAssignment[param.name].name + ";\n";             
        }
        
        //inline the function body.
        result += cfunction.reflectBody();    
          
        //Replace in the function body, the out flow tags by the actual code of the corresponding tasks.
        this.flowControl.forEach((tasks : CTask[], flowTag: string) => 
        {
            var outFlowBody : string = "";
            for (var task of tasks)
            {
                outFlowBody += task.reflectBody();
            }
            result.replace(flowTag, outFlowBody);
        });
        
        //close the scope.
        result += "}\n";
        
        return result;
    }
    
    /**
     * Recursive function that add the function calls c++ code (of the task) to the body.
     * Recurse on the subsequent tasks.  
     * @return {string} returns the c++ code.
     */
    public reflectBody() : string
    {
        var cfunction : CFunction = this.getCFunction();
        var parameters : Array<CDeclaration> = cfunction.getParameters();
        var validateMsgs : Array<string> = new Array<string>();
        var result : string = "";
        
        if (!this.validateAssignments(parameters, validateMsgs))
        {
            //Error at this point is wrong.
            for (var validateMsg of validateMsgs)
            {
                CabeiriLog.warning(validateMsg);                
            }
        }
        else if (this.inline)
        {
            result += this.reflectFunctionInline(cfunction, parameters);
        }
        else
        {    
            result += this.reflectFunctionCall(cfunction, parameters);
        }

        return result;
    }
}
