//should build without RTTI

#include "native-instrucstions.h"
#include "user-code.h"

Core::Core(){}

void Core::CabeiriLoop()
{
    //TODO Receive Server data.
    //
    //

    //Happens last.
    EventManager.ExecuteEvents();
}
