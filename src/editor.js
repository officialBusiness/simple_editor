import initEditorEvent, { destroyEvent } from './event/init_event.js';
import * as rangApi from './operation/range_api.js';
import { toDom, toNode } from './editor_node/transform.js';
import { getComponent } from './editor_node/component.js';
import './component/paragraph.js';
import './component/mathjax.js';
import './component/header.js';
import './component/image.js';
import './component/format.js';

export function initEmptyDom(dom){
	return new Editor(dom);
}

export default function Editor(options){
	this.editorDom = options.container;
	this.editorDom.style['white-space'] = 'pre-wrap';
	this.editorDom.contentEditable = options.editable;
	initEditorEvent.call(this, this.editorDom);

	if(options.json){
		this.render(options.json);
	}else{
		this.addComponent('paragraph');
	}
	return this;
}

Editor.prototype.render = function(json){	
	this.editorDom.innerHTML = '';
	let blocks = json.blocks;
	blocks.forEach((block)=>{
		if( getComponent(block.type) ){
			this.editorDom.appendChild(
				getComponent(block.type).toDom(block)
			);
		}
	});
	return this;
}

Editor.prototype.toJson = function(format){
	let json = {
		blocks: []
	}
	this.editorDom.childNodes.forEach((blockDom)=>{
		json.blocks.push( getComponent(blockDom.className).toJson(blockDom) );
	});
	return json;
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