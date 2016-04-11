import{CClass} from "../type.definitions/cclass" ;
import{GraphElement} from "./graph.element";

export class CObject extends GraphElement
{
    constructor (name:string, public cclass : CClass)
    {
        super(name);
    }
}
