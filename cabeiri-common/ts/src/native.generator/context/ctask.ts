import{CFunction} from "../fundamentals/function/cfunction";
import{CID} from "../fundamentals/cid";

/**
 * To execute functions in a graph, user adds in tasks. 
 */
export class CTask
{
    constructor (public name:string, public functionId : CID, public objectId : CID)
    {
    }
}
