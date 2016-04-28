import {CDeclaration} from "../fundamentals/cdeclaration";
import {CID, CID_NONE} from "../cid/cid";
import {CabeiriLang}  from "../cabeiri.lang";

export enum CEventType
{
    UserEvent,
    PulseEvent
}

/**
 * Represents some extra information for each event type. should be more than just a string eventually
 */
export class CEvent 
{
    /**
     * Create the default events that the app support. such as "Pulse"
     */
    public static setup(clang : CabeiriLang)
    {
        CEvent.createEvent("Pulse", CEventType.PulseEvent, new Array<CDeclaration>(), clang);
        
    }
    
    /**
     * the CIDs of all the basic event types.
     * Meaning any events but user events. used to ensure uniqueness of those events.
     */
    private static ceventBasic : Map<CEventType, CID>;
    
    public static getBasicEvent(ceventType : CEventType) : CEvent
    {
        if (ceventType != CEventType.UserEvent)
        {
            return CEvent.ceventBasic.get(ceventType);
        }
        else return CID_NONE;
    }
    
    /**
     * Add a new event. 
     * @param name : name of the event.
     * @param eventType : the event type.
     * @param parameters: the parameters we get grom the event.
     */
    public static createEvent(name : string, eventType : CEventType, parameters : Array<CDeclaration>, clang : CabeiriLang) : CID
    {
        if (CEvent.ceventBasic.has(eventType))
        {
            throw new Error("Created duplicate events for event type : " +  eventType);
        }
        
        var cevent : CEvent = new CEvent(name, parameters, eventType);
        var cid : CID = clang.registerCEvent(cevent);
        if (eventType != CEventType.UserEvent)
        {
            CEvent.ceventBasic.set(eventType, cid);            
        }
        
        return cid;
    }
    
    /**
     * Name of the event.
     * hmm... hardcoded names huh. should probably just be a localization key.
     */
    public name : string;
    
    /**
     * Indicates what values are given to the event handler.
     * For user events, parameters should be defined somewhere else. TBD
     */
    protected parameters : Array<CDeclaration>;
    public eventType : CEventType;
    public cid : CID;
    
    constructor( name : string, parameters : Array<CDeclaration>, eventType : CEventType)
    {
        this.parameters = parameters;
        this.name = name;
        this.eventType = eventType;
    }
    
    public GetParameters() : Array<CDeclaration>
    {
        //watch out for the user events.
        return this.parameters;
    }  
}
