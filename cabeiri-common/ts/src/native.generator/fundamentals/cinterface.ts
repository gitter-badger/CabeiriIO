/**
 * Anything that translates into a c++ type should implement this interface.
 * exemple : classes (CModule), functions (CFunction), literials (CLiteral)
 */
export interface CInterface
{
    /**
     * Return header cpp definition. meaning the class headers, function headers.
     * @return {string} [description]
     */
    reflectHeader () : string;
    /**
     * Return full cpp definition. meaning the class body, function body.
     * @return {string} [description]
     */
    reflectBody () : string;
    /**
     * Gets the main cpp identifier. A.K.A the class name, the function name, etc.
     * @return {string} [description]
     */
    reflectIdentifier() : string;
}