import * as rangApi from './base_api/range.js';
import * as nodeApi from './base_api/node.js';
import * as componentApi from './base_api/component.js';


export default function Editor(dom, json){
	this.editorDom = dom;
	this.editorDom.style['white-space'] = 'pre-wrap';
	this.editorDom.contentEditable = this.editable = true;

	this.editorDom.onblur = ()=>{
		let range = rangApi.getRange();
		if( this.editable && range ){
			this.range.collapsed = range.collapsed;
			this.range.startContainer = range.startContainer;
			this.range.startOffset = range.startOffset;
			this.range.endContainer = range.endContainer;
			this.range.endOffset = range.endOffset;
		}
	}
	this.range = {};

	if(json){
		this.render(json);
	}else{
		this.addBlock('paragraph');
	}

}

Editor.prototype.rangApi = rangApi;
Editor.prototype.nodeApi = nodeApi;
Editor.prototype.componentApi = componentApi;

// Editor.prototype.rangApi = rangApi;
// Editor.prototype.nodeApi = nodeApi;


Editor.prototype.render = function(obj){
	// this.nodeApi.
	return this;
}

Editor.prototype.addBlock = function(name){
	let blockDom = this.componentApi.componentDom(name);
	this.editorDom.appendChild(blockDom);
	return this;
}

Editor.prototype.insertElement = function(node, start, offset){

	return this;
}

Editor.prototype.insertText = function(text, start, offset){
	let rangApi = this.rangApi,
			nodeApi = this.nodeApi;
	if( start.nodeType === Node.TEXT_NODE ){
		start.insertData(offset, text);
		rangApi.setCollapsedRange(start, offset + text.length);
	}else if( start.nodeType === Node.ELEMENT_NODE ){
		let text = nodeApi.createTextNode(text);
		if( offset === 0 ){
			start.insertBefore(text, start.childNodes[0]);
		}else{
			nodeApi.insertAfter(text, start.childNodes[offset - 1]);
		}
		rangApi.setCollapsedRange(text, text.length);
	}
	return this;
}