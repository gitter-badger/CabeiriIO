import{CInterface}  from "../cinterface";
import{CID}         from "../cid";

/**
 * Base for literals and modules. Any declaration is done using a CType.
 */
export abstract class CType implements CInterface
{
    constructor (public name:string, private cid : CID)
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
}
