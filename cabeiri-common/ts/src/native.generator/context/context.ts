import{CTask}                               from "./ctask";
import{CID, CID_NONE}                       from "../fundamentals/cid";
import{CEvent, CEVENTS_BASIC, CEventType}   from "./cevent";
import{CType}                               from "../fundamentals/type/ctype";
import * as cliteral                        from "../fundamentals/type/cliteral";
import{CInterface}                          from "../fundamentals/cinterface";
import{CModule}                             from "../fundamentals/type/cmodule";
import{CDeclaration}                        from "../fundamentals/cdeclaration";
import{CPPFunction}                         from "../fundamentals/function/cppfunction";
import{CFunction}                           from "../fundamentals/function/cfunction";
import{CabeiriLang}                         from "../cabeiri.lang";

/**
 * Represents a module usage in a context. more precisely, it knows : 
 *  - which tasks to run in which order
 *  - Where to find the parameters for each task (function call).
 *  - Which events are available a to which function they bind.   
 */
export class Context implements CInterface
{
    /**
     * A context can be represented as its own module
     * For each event, the context will create a function. Each variable of the context is also present in the class
     */
    private cclass : CModule;
    /**
     * Entry points of that graph to execute various tasks
     */
    public events : Map<CEventType, CTask>;

    constructor (public name : string, private clang : CabeiriLang){}
    
    /**
     * For each event, the context generate a function. this function will be called by the cabeiri system when appropriate depending on the event type.
     * @return {Array<CFunction>} Functions for every defined event by the user.
     */
    private GenerateEventFunctions() : Array<CFunction>
    {
        var functions : Array<CFunction>;
        for (var eventType in this.events)
        {
            var eventInfo : CEvent =CEVENTS_BASIC[eventType];
            //Create the actual function object. 
            var eventFunction : CPPFunction = new CPPFunction(eventInfo.name, cliteral.cvoid, eventInfo.GetParameters());
            eventFunction.body = "";
            var task : CTask = this.events[eventType];
            
            //ok start from here next time. go over the task tree of the event and call stuff in order.
            //I was wondering. this tree thing is very cute (task), but how do I implement things like a if, or a for in the thing?
        }
        return functions;        
    }
    
    //--------------------------------------------
    /// Reflect implementation
    ///

    /**
     * Returns header definition.
     * @return {string}
     */
    reflectHeader () : string
    {
        //For each entry point of the graph, create a function in the class.
        //var function
        return this.cclass.reflectHeader();
    }

    /**
    * Return all function definitions.
    * @return {string} [description]
    */
    public reflectBody () : string
    {
        return "";
    }

    /**
     * Gets the main cpp identifier. A.K.A the class name, the function name, etc.
     * @return {string} [description]
     */
    reflectIdentifier() : string
    {
        return name;
    }
}
