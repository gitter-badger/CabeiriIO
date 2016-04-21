/**
 * Allows to identify uniquely a module, a function, an instance.
 */
export class CID 
{
    //for now, using a number...
    constructor (public id : number) {}
    public getID() : string
    {
        return this.id + "";
    }
    
    public static GetNewCID() : CID
    {
        return CID_NONE; // :(
    }
}
/**
 * Kind of a null pointer :)
 */   
export const CID_NONE : CID = new CID(-1);

