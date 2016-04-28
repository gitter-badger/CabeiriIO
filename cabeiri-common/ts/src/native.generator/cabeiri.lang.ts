import{CID}                                     from "./cid/cid";
import{Context}                                 from "./context/context";
import{RootContext}                             from "./context/root.context";
import{CEvent, CEventType}                      from "./context/cevent";
import{CType}                                   from "./ctype";
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
    /**
     * Every modules available in the app is listed here. 
     * Each variable declaration will find its module here.
     * The exception to this rule are the modules created for representing a context. they live in their CContext object. 
     * key is the id.
     */
    private ctypes : Map<CID, CType>;
    
    /**
     * The root contexts of the application. entry point for the user to define its project behavior. 
     * Equivalent of the main in c/c++
     * key is the id.
     */
    private rootContexts: Array<RootContext>;
    
    /**
     * various event that can be raised within the application.
     */
    private cevents: Map<CID, CEvent>;
    
    constructor() {}
    
    /**
     * Probably better to keep this not in the constructor.
     * So we can initialize at the moment we want.
     */
    public init() 
    {
        //Setup literals
        cliteral.setup(this);
        //setup basic events (like pulse).
        CEvent.setup(this);
    }
    
    /**
     * Initialize a root context. 
     * Should eventually, be able to read that from a file/server
     */
    public createRootContext()
    {
        this.rootContexts.concat(new RootContext("default_root_context", CID.GetNewCID(), this));
    }
    
    public registerCEvent(cevent : CEvent) : CID
    {
        var cid : CID = CID.GetNewCID();
        this.cevents.set(cid, cevent);
        cevent.cid = cid;
        return cid;
    }
    
    public getCEvent(cid : CID) : CEvent
    {
        return this.cevents.get(cid);
    }
    
    /**
     * Creates a new instance of the given ctype with the given name. a new cid will be given.
     * @param name The name of the type (function name, module name, etc.)
     * @param ctype The typescript class to use (ie : CModule, CLiteral, CFunction, etc.)
     */
    public registerCType<T extends CType>( name : string, ctype: {new(name : string, cid : CID, clang : CabeiriLang):T;}) : T
    {
        var cid : CID = CID.GetNewCID();
        var newCType : T = new ctype(name, cid, this);
        this.ctypes.set(cid, newCType);
        return newCType;
    }
    
    public getCType(typeID : CID) : CType
    {
        return this.ctypes.get(typeID);
    }
}
//Start from here : the compiler should take care of turning this project in c++ via the various reflect functions :)