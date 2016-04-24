import{CID}                                     from "./fundamentals/cid";
import{Context}                                 from "./context/context";
import{CEvent, CEVENTS_BASIC, CEventType}       from "./context/cevent";
import{CType}                                   from "./fundamentals/type/ctype";
import *  as cliteral                           from "./fundamentals/type/cliteral";
import{CModule}                                 from "./fundamentals/type/cmodule";
import{CPPFunction}                             from "./fundamentals/function/cppfunction";
import{CFunction}                               from "./fundamentals/function/cfunction";


/**
 * This is the root of the native code representation. The "language" :)
 * It contains all the module definitions, the function definitions, all the contexts.
 * This is where you will seek for an original class/function/etc when you have its id. It is also the entity that can attribute new ids.
 */
export class CabeiriLang
{
    constructor() {}
    
    /**
     * Probably better to keep this not in the constructor.
     */
    public init() 
    {
        //Setup literals
        cliteral.setup(this);
    }
    
    /**
     * Initialize a root context. 
     * Should eventually, be able to read that from a file/server
     */
    public createRootContext()
    {
        this.rootContext = new Context("root context", this);
    }
    
    /**
     * Creates a new instance of the given ctype with the given name. a new cid will be given.
     */
    public registerCType<T extends CType>( name : string, ctype: {new(name : string, cid : CID):T;}) : T
    {
        var cid : CID = CID.GetNewCID();
        var newCType : T = new ctype(name, cid);
        this.ctypes.set(cid, newCType);
        return newCType;
    }
    /**
     * Every modules available in the app is listed here. 
     * Each variable declaration will find its module here.
     * The exception to this rule are the modules created for representing a context. they live in their CContext object. 
     * key is the id.
     */
    public ctypes : Map<CID, CType>;
    /**
     * All the static functions available in the app. 
     */
    public staticCFunctions : Map<CID, CFunction>;
    /**
     * The root context of the application. entry point for the user to define its project behavior. 
     * Equivalent of the main in c/c++
     * key is the id.
     */
    public rootContext : Context;
    
    public getCType(typeID : CID) : CType
    {
        return this.ctypes.get(typeID);
    }
    
    public getStaticFunction(functionID : CID) : CFunction
    {
        return this.staticCFunctions.get(functionID);
    }
    
    public getRootContext() : Context
    {
        return this.rootContext;
    }
}
//Start from here : the compiler should take care of turning this project in c++ via the various reflect functions :)