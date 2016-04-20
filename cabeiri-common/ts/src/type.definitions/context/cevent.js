System.register([], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var CEventType, CEvent, CEVENTS_BASIC;
    return {
        setters:[],
        execute: function() {
            (function (CEventType) {
                CEventType[CEventType["UserEvent"] = 0] = "UserEvent";
                CEventType[CEventType["PulseEvent"] = 1] = "PulseEvent";
            })(CEventType || (CEventType = {}));
            exports_1("CEventType", CEventType);
            /**
             * Represents some extra information for each event type. should be more than just a string eventually
             */
            CEvent = (function () {
                function CEvent(name, parameters, eventType) {
                    this.parameters = parameters;
                    this.name = name;
                    this.eventType = eventType;
                }
                CEvent.prototype.GetParameters = function () {
                    //watch out for the user events.
                    return this.parameters;
                };
                return CEvent;
            }());
            exports_1("CEvent", CEvent);
            exports_1("CEVENTS_BASIC", CEVENTS_BASIC = [
                new CEvent("event_user", new Array(), CEventType.UserEvent),
                new CEvent("event_pulse", new Array(), CEventType.UserEvent)
            ]);
        }
    }
});
//# sourceMappingURL=cevent.js.map