import{CFunction} from "../type.definitions/function/cfunction";

export class GraphElement
{
    /**
     * Unique identifier to properly refer to this object when generating c++ code.
     * @type {number}
     */
    private id : number;
    constructor (public name:string/*, some kind of graph manager to get the id.*/)
    {
        this.id = 0; /*todo*/
    }
}
