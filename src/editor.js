import * as rangApi from './base_api/range.js';
import * as nodeApi from './base_api/node.js';
import * as componentApi from './component/init_component.js';
import initEditorEvent from './event/init_event.js';

export default function Editor(dom, obj){
	// console.time('editorInit');
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
	initEditorEvent(this);
	// console.timeEnd('editorInit');
}


Editor.prototype.setEditable = function(editable){
	this.editorDom.contentEditable = this.editable = editable;
	return this;
}

Editor.prototype.rangApi = rangApi;
Editor.prototype.nodeApi = nodeApi;

Editor.prototype.getRange = function(){
	let range = rangApi.getRange();
	if( range ){
		return range;
	}else{
		return this.range;
	}
}

Editor.prototype.render = function(obj){
	this.nodeApi.emptyAllChild(this.editorDom);
	obj.blocks.forEach((block)=>{
		this.addBlock(block);
	});
	return this;
}

Editor.prototype.toObj = function(){
	let obj = {
		blocks: []
	}
	this.editorDom.childNodes.forEach((blockDom)=>{
		let blockObj = this.getComponentObj(blockDom);
		if( blockObj ){
			obj.blocks.push( blockObj );
		}
	});
	return obj;
}

Editor.prototype.addBlock = function(type, obj){
	let block = componentApi.getBlockDom(this, type, obj);
	if( block ){
		this.editorDom.appendChild(block);
	}else{
		console.error('block 读取解析失败');
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
	if( start.nodeType === Node.TEXT_NODE ){
		if( offset % start.length === 0 ){
			let singleNode = this.nodeApi.getSingleNodeInContainer(start);
			if( offset === 0 ){
				singleNode.parentNode.insertBefore(node, singleNode)
			}else if( offset === start.length ){
				this.nodeApi.insertAfter(node, singleNode);
			}
		}else{
			console.info('待完善');
		}
	}else if( start.nodeType === Node.ELEMENT_NODE ){
		console.info('待完善');
	}

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