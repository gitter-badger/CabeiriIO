import{CabeiriLang} from "./cabeiri.lang";

/**
 * Anything that translates into a c++ type should implement this interface.
 * exemple : classes (CModule), functions (CFunction), literials (CLiteral)
 */
export interface CInterface
{
    /**
     * Return header cpp definition. meaning the class headers, function headers.
     * @param clang : instance to the cabeiri lang instance.
     * @return {string} [description]
     */
    reflectHeader (clang: CabeiriLang) : string;
    /**
     * Return full cpp definition. meaning the class body, function body.
     * @param clang : instance to the cabeiri lang instance.
     * @return {string} [description]
     */
    reflectBody (clang: CabeiriLang) : string;
    /**
     * Gets the main cpp identifier. A.K.A the class name, the function name, etc.
     * @return {string} [description]
     */
    reflectIdentifier() : string;
}