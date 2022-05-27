import initEditorEvent, { destroyEvent } from './event/init_event.js';
import * as rangApi from './operation/range_api.js';
import { toDom, toNode } from './editor_node/transform.js';
import { getComponent } from './editor_node/component.js';
import './component/paragraph.js';
import './component/mathjax.js';

export function initEmptyDom(dom){
	return new Editor(dom);
}

export default function Editor(editorDom, json){
	editorDom.style['white-space'] = 'pre-wrap';
	this.editorDom = editorDom;
	initEditorEvent.call(this, this.editorDom);

	if(!json){
		this.addComponent('paragraph');
	}else{
		let blocks = json.blocks;
		blocks.forEach((block)=>{
			if( getComponent(block.type) ){
				editorDom.appendChild(
					getComponent(block.type).toDom(block)
				);
			}
		});
	}
	return this;
}

Editor.prototype.setEditable = function(editable){
	this.editorDom.contentEditable = editable;
	return this;
}

Editor.prototype.addComponent = function(component){
	getComponent(component).init(this.editorDom)
}

Editor.prototype.format = function(format){

}

Editor.prototype.destroy = function(){
	destroyEvent(this.editorDom);
}