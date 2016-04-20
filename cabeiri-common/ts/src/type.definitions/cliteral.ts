import{CType} from "./ctype";

/**
 * A lightweight implementation of CType for c++ literals
 */
class CLiteral implements CType
{
    constructor (private name : string) {}
    /**
     * Return header cpp definition. meaning the class headers, function headers.
     * @return {string} [description]
     */
    reflectHeader () : string {return "";}
    /**
     * Return full cpp definition. meaning the class body, function body.
     * @return {string} [description]
     */
    reflectBody () : string { return "";}
    /**
     * Gets the main cpp identifier. ("int", "void", type...)
     */
    reflectIdentifier() : string {return name};
}

/**
 * Follows all literals definition 
 */


export class CVoid extends CLiteral
{
    constructor() 
    {
        super("void");
    }    
}

export class CInt extends CLiteral
{
    constructor() 
    {
        super("int");
    }    
}

export class CChar extends CLiteral
{
    constructor() 
    {
        super("char");
    }    
}

export class CByte extends CLiteral
{
    constructor() 
    {
        super("byte");
    }    
}

/**
 * Would be nice to offer out of the box handling for strings. leaving this here as a reminder
 */
export class CString extends CLiteral
{
    constructor() 
    {
        super("char*");
    }    
}