import{CFunction}       from "./cfunction" ;
import{Context}         from "../../context/context" ;
import{CTask}           from "../../context/ctask" ;
import{CType}           from "../../ctype" ;
import{CID, CID_NONE}   from "../../cid/cid" ;
import{CDeclaration}    from "../cdeclaration" ;
import{CabeiriLang}     from "../../cabeiri.lang" ;
import{CEvent, CEVENTS_BASIC, CEventType}   
                        from "../../context/cevent";


/**
 * A function for which the user create a context and sub tasks.
 */
export class TaskFunction extends CFunction
{ 
    /**
     * Context which contains the tasks this function needs to execute and the local variables.
     * Tasks within a task function can expect to use task function parameters. 
     * They can also expect to use some variables declared on the module if the task fonction lives on a module.
     */
    private context : Context;   

    constructor (name : string, returnType : CType, parameters : Array<CDeclaration>, clang : CabeiriLang, cid : CID = CID_NONE)
    {
        super(name, returnType, parameters, clang, cid);
        this.context.addEvents(new Array<CEventType>(CEventType.PulseEvent));
    }
    
    /**
     * Clear the task this function should execute. Hence, making it an empty function
     */
    public clearTasks = () =>
    {
        this.context.removeAllTasks(CEventType.PulseEvent);
    }
    
    /**
     * Add a root task to this function (task connected to pulse)
     * It do not have any garanteed order of execution.
     */
    public addRootTasks = (tasks : CTask[]) =>
    {
        this.context.addTasks(CEventType.PulseEvent, tasks);
    }
    
    /**
     * Remove a single function root task.
     * @param taskToRemove : the task name to be removed.
     */
    public removeTasks = (tasksToRemove : string[]) =>
    {
        this.context.removeTasks(CEventType.PulseEvent, tasksToRemove);
    }
    
    /**
     * Clear function locals.
     */
    public clearLocals = () =>
    {
        this.context.clearLocals();
    }
    
    /**
     * Remove local variables.
     */
    public removeLocals = (localsToRemove : string[]) =>
    {
        this.context.removeLocals(localsToRemove);
    }
    
    /**
     * Add some local variables to the function. 
     * It adds them to the context of the function.
     * These variables are resetted everytime the function is executed.
     */
    public addLocals = (locals : CDeclaration[]) =>
    {
        //curious here. do we modify the actual array, or a copy of it? TBT
        this.context.addLocals(locals);
    }
    
    public getIncludes() : Array<string>
    {
        var includes : Array<string>;
        //Garanteed, a task function's context, always contains a pulse event, and only a pulse event.
        for (var contextTask of this.context.getTasks(CEventType.PulseEvent))
        {
            contextTask.navigateTaskGraph((task : CTask) =>
            {
                includes.concat(task.getCFunction().getIncludes()); 
            });
        }
                
        return includes;
    }

    ///////////////
    /// Reflect implementation
    ///

    /**
    * Return full cpp definition. meaning the function body.
    * @return {string} [description]
    */
    public reflectBody () : string
    {
        var result : string = "";
        
        //locals (context variables) are declared in the body of the function, so they are reset every time the function runs.
        result += this.context.reflectLocalsDeclaration();
        result += this.context.reflectEvent(CEventType.PulseEvent);
        return result;
    }
}
