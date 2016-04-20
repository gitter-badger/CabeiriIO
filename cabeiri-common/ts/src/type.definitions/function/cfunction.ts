import{CDeclaration} from "../cdeclaration";
import{CModule}      from "../cmodule";
import{CType}      from "../ctype";

/**
 * Represent a function in the user graph. This is a block of logic the user can insert in his graph.
 * Function can be defined in two ways : by inputing the code directly of the body (CPPFunction) or by creating a subgraph (GraphFunction)
 * Function take different parameters. All by reference for now. so if the user want to "retrun" a value, he must add a parameter and modify it.
 *
 *
 */
export abstract class CFunction implements CType
{
    constructor (public name : string, public id:number, public returnType : CModule, public parameters : Array<CDeclaration>) {}

    /**
     * Just for future use. Right now always void.
     * @return {string} [description]
     */
    public reflectReturnType() :string {return this.returnType.reflectIdentifier();}

    /**
     * Just for future use.
     * @return {string} [description]
     */
    public reflectParameters() :string
    {
        var result : string;
        for (var parameter of this.parameters)
        {
            //TODO shouldn't take basic types per reference.
            result = ", " + result + parameter.type.reflectIdentifier() + "&" + parameter.name;
        }
        //remove first ", "
        return result.substr(2, result.length);
    }

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
        return this.reflectReturnType() + " " + this.reflectIdentifier() + "(" + this.reflectParameters() + ")";
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
