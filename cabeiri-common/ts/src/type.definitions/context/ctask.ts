import{CFunction} from "../type.definitions/function/cfunction";

/**
 * To execute functions in a graph, user adds in tasks. 
 */
export class CTask
{
    constructor (public name:string, public id : number, public cfunction : CFunction)
    {
    }
}
