import{CDeclaration}    from "../cdeclaration";
import{CType}           from "../../ctype";
import{CabeiriLang}     from "../../cabeiri.lang";
import{CID, CID_NONE}   from "../../cid/cid" ;


/**
 * Represent a function in the user graph. This is a block of logic the user can insert in his graph.
 * Function can be defined in two ways : by inputing the code directly of the body (CPPFunction) or by creating a subgraph (GraphFunction)
 * Function take different parameters. All by reference for now. so if the user want to "retrun" a value, he must add a parameter and modify it.
 */
export abstract class CFunction extends CType
{
    /**
     * Construct a function.
     * cid is optionnal, as only static functions should have a cid. (worth make a separate type for those?)
     */
    constructor (name : string, public returnType : CType, protected parameters : Array<CDeclaration>, clang : CabeiriLang, cid : CID = CID_NONE) 
    {
        super(name, cid, clang);
    }
    
    /**
     * returns a shallow copy of the parameters array.
     */
    public getParameters() : Array<CDeclaration>
    {
        return this.parameters.slice();
    }

    /**
     * Just for future use. Right now always void.
     * @return {string} [description]
     */
    public reflectReturnType() :string {return this.returnType.reflectIdentifier();}

    /**
     * generate the c++ string for declaring the function parameters.
     * @return {string} [c++ string of the function parameters]
     */
    public static reflectParameters(parameters: Array<CDeclaration>) :string
    {
        var result : string;
        for (var parameter of parameters)
        {
            //TODO shouldn't take basic types per reference.
            result = ", " + result + parameter.getType().reflectIdentifier() + "&" + parameter.name;
        }
        //remove first ", "
        return result.substr(2, result.length);
    }
    
    public static reflectFunctionHeader(identifier: string, returnType : CType, parameters : Array<CDeclaration>)
    {
        return returnType.reflectIdentifier + " " + identifier + "(" + CFunction.reflectParameters(parameters) + ")";        
    }
    
    public abstract getIncludes() : Array<string>;

    //------------------------------------------------------------------------
    /// Reflect implementation
    ///

    /**
    * Return full cpp definition. meaning the function body.
    * @return {string} [description]
    */
    public abstract reflectBody () : string;

    /**
     * Return header cpp definition. meaning the class headers, function headers.
     * @return {string} [description]
     */
    public reflectHeader () : string
    {
        return CFunction.reflectFunctionHeader(this.reflectIdentifier(), this.returnType, this.parameters);
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
