import{CFunction} from "./cfunction" ;
import{CObject} from "../../graph.elements/cobject";

/**
 * A function for which the user gives directly the cpp.
 */
export class CPPFunction extends CFunction
{
    /**
     * the cpp code of the function.
     * @type {string}
     */
    public body : string;

    constructor (name : string)
    {
        super(name);
    }

    ///////////////
    /// Reflect implementation
    ///

    /**
    * Return full cpp definition. meaning the function body.
    * @return {string} [description]
    */
    public reflectBody () : string
    {
        return this.body;
    }
}
