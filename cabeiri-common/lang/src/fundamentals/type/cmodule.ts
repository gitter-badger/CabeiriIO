import{CType}               from "../../ctype";
import{CID}                 from "../../cid/cid";
import{CFunction}           from "../function/cfunction";
import{CDeclaration}        from "../cdeclaration";
import{CabeiriLang}         from "../../cabeiri.lang";


/**
 * Every object of a graph has a CClass, describing its behavior, its content.
 * @type {[type]}
 */
export class CModule extends CType
{
    /**
     * The functions have all the semantics for this class.
     * @type {Array<CFunction>}
     */
    private functions: Map<CID, CFunction>;
    /**
     * All the nested object classes composing this object.
     * @type {Array<CClass>}
     */
    public variableDeclarations: Array<CDeclaration>;

    constructor (public name:string, cid : CID, clang : CabeiriLang)
    {
        super(name, cid, clang);
    }
    
    /**
     * Returns the function from this module.
     * @param cid : CID of the function.
     */
    public getFunction(cid : CID) : CFunction
    {
        return this.functions.get(cid);
    }
  
    /**
     * The includes that should be added above the c++ file body for the functions to compile.
     */   
    public GenerateFunctionIncludes() : Array<string>
    {
       var allIncludes : Array<string>;
       this.functions.forEach ((fct: CFunction, cid : CID) =>
       {
            allIncludes.concat(fct.getIncludes());
       });
       
       return allIncludes;
    } 

    //-------------------------------------------------------
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
            result += "\t" + varDec.getType().reflectIdentifier() + " " + varDec.name +";\n";
        }
        result += "\n\t//FUNCTION DECLARATIONS\n\n";

        this.functions.forEach ((fct: CFunction, cid : CID) =>
        {
            result += "\t" + fct.reflectHeader() +";\n";
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

        this.functions.forEach ((fct: CFunction, cid : CID) =>
        {
            result += fct.reflectReturnType() + " " + this.reflectIdentifier() + "::" + fct.reflectIdentifier() + "(" + CFunction.reflectParameters(fct.getParameters())+ ")" + "\n";
            result += "{\n"
            result += fct.reflectBody();
            result += "}\n\n"
        });
        
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
