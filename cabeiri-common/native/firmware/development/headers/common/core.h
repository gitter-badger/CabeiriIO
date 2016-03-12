#include "configs.h"
//should build without RTTI
class Core
{

    Core();

    void CabeiriLoop();

private:
    EventManager eventManager;
};
