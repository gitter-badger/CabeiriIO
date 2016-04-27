import{CFunction}       from "./cfunction" ;
import{CType}           from "../../ctype" ;
import{CID, CID_NONE}   from "../../cid/cid" ;
import{CDeclaration}    from "../cdeclaration" ;
import{CabeiriLang}     from "../../cabeiri.lang" ;

/**
 * A function for which the user create a graph (like in a context)
 */
export class TaskFunction extends CFunction
{ 
    /**
     * Root task this function needs to execute.
     */
    public task : CTask;   

    constructor (name : string, returnType : CType, parameters : Array<CDeclaration>, clang : CabeiriLang, cid : CID = CID_NONE)
    {
        super(name, returnType, parameters, clang, cid);
    }
    
    public getIncludes() : Array<string>
    {
        var includes : Array<string>;
        
        this.task.navigateTaskGraph((task : CTask) =>
        {
            includes.concat(task.cfunction.getIncludes()); 
        });
        
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
        return this.task.reflectBody();
    }
}
