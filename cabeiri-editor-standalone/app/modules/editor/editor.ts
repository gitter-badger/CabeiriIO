import {Component}    from 'angular2/core';
import {GraphEditor}  from 'cabeiri-common/graph';
import {GraphCompiler}  from 'cabeiri-common/graph';

@Component({
    selector: 'cb-editor',
    templateUrl: 'app/editor/editor.html',
    providers: [GraphCompiler]
})
export class Editor
{
    constructor(public graphCompiler:GraphCompiler) {}
}
