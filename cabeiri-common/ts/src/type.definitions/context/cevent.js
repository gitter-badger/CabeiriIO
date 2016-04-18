System.register([], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var EventType, CEvent, EVENT_NAMES;
    return {
        setters:[],
        execute: function() {
            (function (EventType) {
                EventType[EventType["UserEvent"] = 0] = "UserEvent";
                EventType[EventType["PulseEvent"] = 1] = "PulseEvent";
                EventType[EventType["EventTypeCount"] = 2] = "EventTypeCount";
            })(EventType || (EventType = {}));
            exports_1("EventType", EventType);
            /**
             * Represents some extra information for each event type. should be more than just a string eventually
             */
            CEvent = (function () {
                function CEvent() {
                }
                return CEvent;
            }());
            exports_1("CEvent", CEvent);
            exports_1("EVENT_NAMES", EVENT_NAMES = ["User", "Pulse"]);
        }
    }
});
//# sourceMappingURL=cevent.js.map