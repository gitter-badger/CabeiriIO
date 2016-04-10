System.register(['angular2/core', 'cabeiri-common/graph'], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __metadata = (this && this.__metadata) || function (k, v) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
    };
    var core_1, graph_1, graph_2;
    var Editor;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (graph_1_1) {
                graph_1 = graph_1_1;
                graph_2 = graph_1_1;
            }],
        execute: function() {
            Editor = (function () {
                function Editor(graphCompiler) {
                    this.graphCompiler = graphCompiler;
                }
                Editor = __decorate([
                    core_1.Component({
                        selector: 'cb-editor',
                        templateUrl: 'app/editor/editor.html',
                        providers: [graph_2.GraphCompiler],
                        directives: [graph_1.GraphEditor]
                    }), 
                    __metadata('design:paramtypes', [graph_2.GraphCompiler])
                ], Editor);
                return Editor;
            }());
            exports_1("Editor", Editor);
        }
    }
});
//# sourceMappingURL=editor.js.map