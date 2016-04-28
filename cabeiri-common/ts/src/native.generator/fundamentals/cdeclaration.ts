import{CType}       from "../ctype";
import{CID}         from "../cid/cid";
import{CabeiriLang} from "../cabeiri.lang";

/**
 * Just a small class to define parameters for functions, or variable declaration in classes
 * Doesn't support the const concept. nor the reference. Ideally I prefer to hide this complexity.
 * will probably have to revisit this decision later on :)
 */
export class CDeclaration
{
    constructor(private ctypeID : CID, public name : string, private clang : CabeiriLang) {}
    
    /**
     * Retrieve the ctype object instance representing the type of this declaration.
     */
    public getType() : CType
    {
        return this.clang.getCType(this.ctypeID);    
    }
    
    public getTypeID() : CID
    {
        return this.ctypeID;
    }
}
