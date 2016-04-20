import {CDeclaration} from "../cdeclaration";

export enum CEventType
{
    UserEvent, /*parameters for this guy? hmmmmm*/ 
    PulseEvent
}

/**
 * Represents some extra information for each event type. should be more than just a string eventually
 */
export class CEvent 
{
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
export const CEVENTS_BASIC : Array<CEvent> = 
[
    new CEvent("event_user", new Array<CDeclaration>(), CEventType.UserEvent), 
    new CEvent("event_pulse", new Array<CDeclaration>(), CEventType.UserEvent)
];