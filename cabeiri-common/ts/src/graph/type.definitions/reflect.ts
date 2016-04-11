export interface Reflect
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
