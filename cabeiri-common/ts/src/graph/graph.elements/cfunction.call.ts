import{CFunction} from "../type.definitions/function/cfunction";
import{GraphElement} from "./graph.element";

export class CFunctionCall extends GraphElement
{
    constructor (name:string, public cfunction : CFunction)
    {
        super(name);
    }
}
