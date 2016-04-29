import{CFunction}       from "./cfunction" ;
import{CType}           from "../../ctype" ;
import{CID, CID_NONE}   from "../../cid/cid" ;
import{CDeclaration}    from "../cdeclaration" ;
import{CabeiriLang}     from "../../cabeiri.lang" ;

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

    constructor (name : string, returnType : CType, parameters : Array<CDeclaration>, clang : CabeiriLang, cid : CID = CID_NONE)
    {
        super(name, returnType, parameters, clang, cid);
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
