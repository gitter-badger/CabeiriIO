/**
 * Allows to identify uniquely a module, a function, an instance.
 */
export class CID 
{
    
    //for now, using a number...
    constructor (public id : string) {}
    public getID() : string
    {
        return this.id + "";
    }
    
    /**
     * Generates a new unique CID.
     */
    public static GetNewCID() : CID
    {
        return new CID(CID.generateUUID());
    }
    
    /**
     * Generates unique id using date and random. 
     * very low probability of having collision, still we should pay attention to that when uploading id on server.
     */
    private static generateUUID() : string 
    {
        var date : number = new Date().getTime();
        if(window.performance && typeof window.performance.now === "function")
        {
            date += performance.now(); //use high-precision timer if available
        }
        var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) 
        {
            var random = (date + Math.random()*16)%16 | 0;
            date = Math.floor(date/16);
            return (c=='x' ? random : (random&0x3|0x8)).toString(16);
        });
        return uuid;
    }
}
/**
 * Kind of a null pointer :)
 */   
export const CID_NONE : CID = new CID("ID_NONE");

