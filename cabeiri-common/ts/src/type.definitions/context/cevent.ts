export enum CEventType
{
    UserEvent,
    PulseEvent,
    EventTypeCount
}

/**
 * Represents some extra information for each event type. should be more than just a string eventually
 */
export class CEvent 
{
    public name : string;
    public eventType : CEventType;
}
export const EVENT_NAMES : Array<string> = ["User", "Pulse"];