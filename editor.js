import initEditorEvent, { destroyEvent } from './event/init_event.js';
import * as rangApi from './operation/range_api.js';
import { toDom, toNode } from './editor_node/transform.js';
import { getComponent } from './editor_node/component.js';
import './component/paragraph.js';

export function initEmptyDom(dom){
	return new Editor(dom);
}

export default function Editor(editorDom){
	editorDom.contentEditable = true;
	editorDom.style['white-space'] = 'pre-wrap';
	this.editorDom = editorDom;
	initEditorEvent.call(this, this.editorDom);

	this.addComponent('paragraph');
}

Editor.prototype.addComponent = function(component){
	getComponent(component).init(this.editorDom);
}

Editor.prototype.format = function(format){

}

Editor.prototype.destroy = function(){
	destroyEvent(this.editorDom);
}