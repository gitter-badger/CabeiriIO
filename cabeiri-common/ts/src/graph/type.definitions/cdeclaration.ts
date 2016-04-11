import{CClass} from "./cclass" ;

/**
 * Just a small class to define parameters for functions
 * Doesn't support the const concept. nor the reference. Ideally I prefer to hide this complexity.
 * will probably have to revisit this decision later on :)
 */
export class CDeclaration
{
    constructor(public type : CClass, public name : string) {}
}
