import{CInterface}      from "./cinterface";
import{CID}             from "./cid/cid";
import{CabeiriLang}     from "./cabeiri.lang";


/**
 * Base for literals and modules. Any declaration is done using a CType.
 */
export abstract class CType implements CInterface
{
    /**
     * Create a new CType
     * @param name : Name of the type, like the module name, function name, literal name. Used as the c++ identifier.
     * @param cid : unique id of the type.
     * @param clang : instance to the cabeiri lang instance.
     */
    constructor (public name:string, private cid : CID, protected clang : CabeiriLang)
    {}
    
    public getCID() : CID
    {
        return this.cid;
    }
    
    /**
     * Return header cpp definition. meaning the class headers, function headers.
     * @return {string} [description]
     */
    public abstract reflectHeader () : string;
    /**
     * Return full cpp definition. meaning the class body, function body.
     * @return {string} [description]
     */
    public abstract reflectBody () : string;
    /**
     * Gets the main cpp identifier. A.K.A the class name, the function name, etc.
     * @return {string} [description]
     */
    public abstract reflectIdentifier() : string;
    
    /**
     * Implemented the replacer function to avoid exporting the Cabeiri Lang reference.
     */
    public replacer(key,value)
    {
        if (key=="clang") 
        {
            return "none";
        } 
        else 
        {
            return value;
        }
    }
    
    /**
     * Tells weither or not a native instance of this ctype can be assigned to a native instance of another ctype.
     * Returns true if the type are the same. Could eventually account for inheritance.
     * @param other : type of the instance the should be assigned. 
     */
    public canAssignTo(other : CType) : boolean
    {
        //what of implicit conversion? for modules, it ain't support yet. but it'd be nice to test for basic types.
        return this.getCID() == other.getCID();
    }
}
