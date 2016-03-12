#include <array>

class CObject
{
    CObject();
    operator();
};

/**
 * Object containing the root set of CObjects (permenant objects of the user graph.)
 */
class CObjectRootSet
{
    //We avoid using the heap at all cost
    //std::array<CObject*> is unacceptable :D


}
