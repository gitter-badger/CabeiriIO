import{CTask}     from "./ctask";
import{CType}     from "../ctype";
import{CModule}   from "../cmodule";
import{CFunction} from "../function/cfunction";



/**
 * Represents a module usage in a context. more precisely, it knows : 
 *  - which tasks to run in which order
 *  - Where to find the parameters for each task (function call).
 *  - Which events are available a to which function they bind.   
 */
export class Context implements CType
{
    /**
     * A context can be represented as its own module
     * For each event, the context will create a function. Each variable of the context is also present in the class
     */
    private cclass : CModule;
    /**
     * Entry points of that graph to execute various tasks
     */
    public events : Map<EventType, CTask>;

    constructor (){}
    
    private GenerateEventFunctions() : Array<CFunction>
    {
        var functions : Array<CFunction>;
        for (var eventType in this.events)
        {
            var functionName : string = EVENT_NAMES[eventType];
            var eventFunction : CFunction = {name : functionName, id :0, parameters : [], };
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
