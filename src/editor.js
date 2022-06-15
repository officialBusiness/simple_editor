import * as rangApi from './base_api/range.js';
import * as nodeApi from './base_api/node.js';
import * as componentApi from './component/init_component.js';


export default function Editor(dom, obj){
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

	if(obj){
		this.render(obj);
	}else{
		this.addBlock('paragraph');
	}
}


Editor.prototype.setEditable = function(editable){
	this.editorDom.contentEditable = this.editable = editable;
	return this;
}

Editor.prototype.rangApi = rangApi;
Editor.prototype.nodeApi = nodeApi;

// Editor.prototype.rangApi = rangApi;
// Editor.prototype.nodeApi = nodeApi;

Editor.prototype.render = function(obj){
	this.nodeApi.emptyAllChild(this.editorDom);
	obj.blocks.forEach((block)=>{
		this.addBlock(block);
	});
	return this;
}

Editor.prototype.toObj = function(){
	// return 
}

Editor.prototype.addBlock = function(type, obj){
	let block = componentApi.getBlockDom(this, type, obj);
	if( block ){
		this.editorDom.appendChild(block);
	}
	return this;
}

Editor.prototype.getComponentDom = function(type, obj){
	return componentApi.getComponentDom(this, type, obj);
}

Editor.prototype.getComponentObj = function(type, dom){
	return componentApi.getComponentObj(this, type, dom);
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