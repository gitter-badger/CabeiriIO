//Implementation is generated. it basically

/**
 * Entry point for executing user code, which is event based.
 */
class EventManager
{
public:
    EventManager();
    void ExecuteEvents();

private:
    float lastPulseTime;

    /**
     * everytime the main loop is executed, we execute all "pulse" events.
     */
    void Pulse();
    /**
     * All events to be executed when a certain global value changes. example : when an endstop output value changes.
     */
    void ExecuteOnValueChangedEvents();
    /**
     * User Code to be executed When firmware receives a communication from server.
     */
    void ExecuteOnMsgReceivedEvents();
};
