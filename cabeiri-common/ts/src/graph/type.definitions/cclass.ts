import{Graph} from "../graph" ;
import{Reflect} from "./reflect";
import{CFunction} from "./function/cfunction";
import{CDeclaration} from "./cdeclaration";

/**
 * Every object of a graph has a CClass, describing its behavior, its content.
 * @type {[type]}
 */
export class CClass implements Reflect
{
    /**
     * The functions have all the semantics for this class.
     * @type {Array<CFunction>}
     */
    public functions: Array<CFunction>;
    /**
     * All the nested object classes composing this object.
     * @type {Array<CClass>}
     */
    public variableDeclarations: Array<CDeclaration>;

    constructor (public name:string){}

    ///////////////
    /// Reflect implementation
    ///

    /**
     * Returns header definition.
     * @return {string}
     */
    reflectHeader () : string
    {
        var result : string;
        result = "class " + this.reflectIdentifier() + "\n{\npublic:\n";
        result += "\t//VARIABLE DECLARATIONS\n\n";

        for (var varDec of this.variableDeclarations)
        {
            //TODO for now, everything is public
            result += "\t" + varDec.type.reflectIdentifier() + " " + varDec.name +"\n;";
        }
        result += "\n\t//FUNCTION DEFINITIONS\n\n";

        for (var fct of this.functions)
        {
            result += "\t" + fct.reflectHeader() +"\n;";
        }

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

        for (var fct of this.functions)
        {
            result += fct.reflectReturnType() + " " + this.reflectIdentifier() + "::" + fct.reflectIdentifier() + "(" + fct.reflectParameters()+ ")" + "\n";
            result += "{\n"
            result += fct.reflectBody();
            result += "}\n\n"
        }

        return result;
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
