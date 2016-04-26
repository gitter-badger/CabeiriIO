import{CabeiriLang}       from "../../cabeiri.lang";
import{CType}             from "./ctype";
import{CID, CID_NONE}     from "../cid";

/**
 * A lightweight implementation of CType for c++ literals
 * This class will export nothing to c++ headers or body. it only has the identifier that is set (void, int, char, byte, etc.)
 */
export class CLiteral extends CType
{
    constructor (name : string, cid :CID) 
    {
        super(name, cid);
    }
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
     * Gets the main cpp identifier. (function name, class name, type for literals...)
     */
    reflectIdentifier() : string {return name};
}

/**
 * Would be nice to offer out of the box handling for strings. leaving this here as a reminder
 */
export class CString extends CLiteral
{
    constructor(name : string, cid : CID) 
    {
        super(name, cid);
    }    
}

/**
 * Follows all literals definition 
 */

export var cvoid : CLiteral;
export var cint : CLiteral;
export var cchar : CLiteral;
export var cbyte : CLiteral;
export var cfloat : CLiteral;
export var cdouble : CLiteral;
export var cstring : CLiteral;

/**
 * Create all literals instances.
 * must be called once CLang is setup.
 */
export function setup(clang : CabeiriLang) 
{
    cvoid = clang.registerCType("void", CLiteral);
    cint = clang.registerCType("int", CLiteral);
    cchar = clang.registerCType("char", CLiteral);
    cbyte = clang.registerCType("byte", CLiteral);
    cfloat = clang.registerCType("float", CLiteral);
    cdouble = clang.registerCType("double", CLiteral);
    cstring = clang.registerCType("char*", CString);
}

