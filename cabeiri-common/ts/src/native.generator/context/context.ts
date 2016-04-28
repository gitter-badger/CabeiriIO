import{CTask}                               from "./ctask";
import{CID, CID_NONE}                       from "../cid/cid";
import{CEvent, CEVENTS_BASIC, CEventType}   from "./cevent";
import{CType}                               from "../ctype";
import * as cliteral                        from "../fundamentals/type/cliteral";
import{CModule}                             from "../fundamentals/type/cmodule";
import{CDeclaration}                        from "../fundamentals/cdeclaration";
import{TaskFunction}                        from "../fundamentals/function/taskfunction";
import{CFunction}                           from "../fundamentals/function/cfunction";
import{CabeiriLang}                         from "../cabeiri.lang";

/**
 * Represents a local context for native code execution. more precisely : 
 *  - it has a list of local variables
 *  - it has tasks to run on events
 *  - tasks can use the locals. 
 */
export class Context
{
    /**
     * Entry points of that graph to execute various tasks.
     * Each task, is linked to subsequent tasks that must be executed at a later point.
     * This removes any possibility for orphan task (not linked to an event) to exist. 
     * They make no sense for native code generation.
     * I expect the editor will somehow save those orphan tasks in a sequence object. 
     */
    protected events : Map<CEventType, Array<CTask>>;
    
    /**
     * All variables that are local to this context.
     * On the native side : they live and die with the context instance. 
     */
    protected locals : Array<CDeclaration>;

    constructor (name : string, cid : CID, clang : CabeiriLang)
    {}
    
    /**
     * Add tasks to the given event.
     * @param eventType : the event type to which to add. must already be in the context.
     * @param taskToRemove : the task name to be added.
     * @return {boolean} returns true if event type was found   
     */
    public addTasks = (eventType : CEventType, tasks : CTask[]) : boolean =>
    {
        if (!this.events.has(eventType))
        {
            return false;
        }
        
        var newRootTaskSet : Array<CTask> = this.events.get(eventType).concat(tasks);
        this.events.set(CEventType.PulseEvent, newRootTaskSet);
        
        return true;     
    }
    
    /**
     * Remove tasks from the given event.
     * @param eventType : the event type from which to remove. must already be in the context.
     * @param taskToRemove : the task name to be removed.
     * @return {boolean} returns true if the event type was found.
     */
    public removeTasks = (eventType : CEventType, tasksToRemove : string[]) : boolean =>
    {
        if (!this.events.has(eventType))
        {
            return false;
        }
        
        var newRootTaskSet : Array<CTask> = 
            this.events.get(eventType).filter(
                (task : CTask) => {return tasksToRemove.indexOf(task.name) != -1;});
        this.events.set(CEventType.PulseEvent, newRootTaskSet);
        
        return true;
    }
    
    /**
     * Remove all tasks from the given event.
     * @param eventType : the event type from which to remove. must already be in the context.
     * @return {boolean} returns true if the event type was found.
     */
    public removeAllTasks = (eventType : CEventType) : boolean =>
    {
        if (!this.events.has(eventType))
        {
            return false;
        }
        
        this.events.set(CEventType.PulseEvent, new Array<CTask>());
        
        return true;
    }
    
    /**
     * Add events to the context. Will not reset existing events.
     * @param eventTypes : the event types to be added. 
     */
    public addEvents(eventTypes : CEventType[])
    {
        for (var eventType of eventTypes)
        {
            if (!this.events.has(eventType))
            {
                this.events.set(eventType, new Array<CTask>());
            }
        }
    }
   
    /**
     * Returns the root tasks for the given event type
     * @param eventType : the event type for which we want the tasks.
     * @return {Array<CTask>}
     */
    public getTasks(eventType : CEventType) : Array<CTask>
    {
        return this.events.get(eventType);
    }
    
    /**
     * Add local variables to the context. 
     * On the native side, these variables live with the context.
     * @param locals : local variables to add.
     */
    public addLocals = (locals : CDeclaration[]) =>
    {
        this.locals.concat(locals);
    }
    
    public getLocals() : CDeclaration[]
    {
        return this.locals.slice();
    }
    /**
     * Removes local variables from the context.
     * @param locals : local variables to remove.
     */
    public removeLocals = (locals : string[]) =>
    {
        var newLocals : Array<CDeclaration> = this.locals.filter((local : CDeclaration) => {return locals.indexOf(local.name) != -1;});
        this.locals = newLocals;
    }
    
    /**
     * Removes all local variables from the context.
     */
    public clearLocals = () =>
    {
        this.locals = new Array<CDeclaration>();
    }
    
    /**
     * Generates the native code for declaring all variables of the context.
     * These variables should be declared so they live as long as the context lives. 
     *  - within a global struct instance for a root context.
     *  - within a function body for a function context.
     */
    public reflectLocalsDeclaration() : string
    {
        var result : string = "";
        for (var local of this.locals)
        {
            result += local.getType().reflectIdentifier + " " + local.name + ";\n";
        }
        return result;
    }
    
    /**
     * Provide the native code body to run for an event. 
     * this code should be put in a function where the locals are available. 
     * @param 
     */
    public reflectEvent(eventType : CEventType) : string
    {
        var tasks : Array<CTask> = this.getTasks(eventType);
        var result : string = "";
        for (var task of tasks)
        {
            result += task.reflectBody();
        }
        
        return result;
    }
}
