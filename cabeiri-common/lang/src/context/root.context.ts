import{CTask}                               from "./ctask";
import{CID, CID_NONE}                       from "../cid/cid";
import{CabeiriLog}                          from "../logging/logging";
import{CEvent, CEventType}                  from "./cevent";
import{Context}                             from "./context";
import{CType}                               from "../ctype";
import * as cliteral                        from "../fundamentals/type/cliteral";
import{CModule}                             from "../fundamentals/type/cmodule";
import{CDeclaration}                        from "../fundamentals/cdeclaration";
import{TaskFunction}                        from "../fundamentals/function/taskfunction";
import{CFunction}                           from "../fundamentals/function/cfunction";
import{CabeiriLang}                         from "../cabeiri.lang";

/**
 * Represents a context that lives throughout the execution. 
 * hence we export a native class for this context so it can be instanciated.
 */
export class RootContext extends CType
{
    /**
     * The actual context of this RootContext.
     */
    public context : Context;
    
    constructor (name : string, cid : CID, clang : CabeiriLang)
    {
        super(name, cid, clang);
    }
    
    //-------------------------------------------------------
    /// Reflect implementation
    ///

    /**
     * Returns header definition.
     * @return {string}
     */
    public reflectHeader () : string
    {
        var result : string;
        result = "class " + this.reflectIdentifier() + "\n{\npublic:\n";
        result += "\t//CONTEXT LOCAL VARIABLE DECLARATIONS\n\n";

        for (var varDec of this.context.getLocals())
        {
            //TODO for now, everything is public
            result += "\t" + varDec.getType().reflectIdentifier() + " " + varDec.name +";\n";
        }
        result += "\n\t//CONTEXT EVENT FUNCTION DECLARATIONS\n\n";

        this.context.forEachEvents ((tasks : CTask[], eventCID : CID) =>
        {
            var cevent : CEvent = this.clang.getCEvent(eventCID);
            if (cevent == null)
            {
                CabeiriLog.warning("Could not find event corresponding to event CID in root context.")
            }
            else
            {            
                //Create a native function for each event.
                result += "\t" + CFunction.reflectFunctionHeader(cevent.name, cliteral.cvoid, cevent.GetParameters()) +";\n";
            }
        });

        result += "};\n\n"
        return result;
    }

    /**
    * Return all function definitions.
    * @return {string} [description]
    */
    public reflectBody () : string
    {
        var result : string;
        result += "\n\t//FUNCTION DEFINITIONS\n\n";

        this.context.forEachEvents ((tasks : CTask[], eventCID : CID) =>
        {
            var cevent : CEvent = this.clang.getCEvent(eventCID);
            if (cevent == null)
            {
                CabeiriLog.warning("Could not find event corresponding to event CID in root context.")
            }
            else
            {            
                //Implement a native function for each event.
                result += "\t" + CFunction.reflectFunctionHeader(cevent.name, cliteral.cvoid, cevent.GetParameters()) +";\n";
                
                result += cliteral.cvoid.reflectIdentifier() + " " 
                    + this.reflectIdentifier() + "::" 
                    + cevent.name + "(" + CFunction.reflectParameters(cevent.GetParameters())+ ")" + "\n";
                    
                result += "{\n"
                //Add all the task code to the function body.
                for (var task of tasks)
                {
                    result += task.reflectBody();
                }
                result += "}\n\n"
            }

        });

        return result;
    }

    /**
     * Gets the main cpp identifier. A.K.A the class name.
     * @return {string} [description]
     */
    public reflectIdentifier() : string
    {
        return name;
    }
}
