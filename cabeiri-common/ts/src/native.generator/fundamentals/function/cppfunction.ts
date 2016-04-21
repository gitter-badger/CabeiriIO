import{CFunction}       from "./cfunction" ;
import{CType}           from "../type/ctype" ;
import{CID, CID_NONE}   from "../cid" ;
import{CDeclaration}    from "../cdeclaration" ;

/**
 * A function for which the user gives directly the cpp.
 */
export class CPPFunction extends CFunction
{
    /**
     * c++ includes this function requires to compile.
     */
    public includes : Array<string>;
    
    /**
     * the cpp code of the function.
     * @type {string}
     */
    public body : string;

    constructor (name : string, returnType : CType, parameters : Array<CDeclaration>, cid : CID = CID_NONE)
    {
        super(name, returnType, parameters, cid);
    }
    
    public getIncludes() : Array<string>
    {
        return this.includes;
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
        return this.body;
    }
}
