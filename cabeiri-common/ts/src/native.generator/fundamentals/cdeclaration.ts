import{CType}     from "./type/ctype" ;
import{CID}         from "./cid" ;

/**
 * Just a small class to define parameters for functions, or variable declaration in classes
 * Doesn't support the const concept. nor the reference. Ideally I prefer to hide this complexity.
 * will probably have to revisit this decision later on :)
 */
export class CDeclaration
{
    constructor(private type : CType, public name : string) {}
    
    public getType() : CType
    {
        return this.type;    
    }
}
