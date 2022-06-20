import * as rangeApi from './base_api/range.js';
import * as nodeApi from './base_api/node.js';
import * as componentApi from './component/init_component.js';

import initEditorEvent from './event/init_event.js';
import { customEventType, bindCustomEvent, dispatchCustomEvent } from './event/custom_event.js';

export default function Editor(dom, obj){
	// console.time('editorInit');
	this.editorDom = dom;
	this.editorDom.style['white-space'] = 'pre-wrap';
	this.editorDom.contentEditable = this.editable = true;
	this.editorDom.setAttribute('editor', true);

	this.editorDom.onblur = ()=>{
		let range = rangeApi.getRange();
		if( this.editable && range ){
			this.range.collapsed = range.collapsed;
			this.range.startContainer = range.startContainer;
			this.range.startOffset = range.startOffset;
			this.range.endContainer = range.endContainer;
			this.range.endOffset = range.endOffset;
		}
	}
	this.range = {};
	
	initEditorEvent(this);
	this.customEventMap = new Map();

	if(obj){
		this.render(obj);
	}else{
		let blockDom = this.getBlockDom('paragraph');
		if( blockDom ){
			this.editorDom.appendChild(blockDom);
		}else{
			console.error('block 读取解析失败:', block);
		}
	}
	this.rangeApi.setNewCollapsedRange(
		this.nodeApi.getStartNode(this.editorDom), 0
	);
	// console.timeEnd('editorInit');
}


Editor.prototype.setEditable = function(editable){
	this.editorDom.contentEditable = this.editable = editable;
	return this;
}

Editor.prototype.rangeApi = rangeApi;
Editor.prototype.nodeApi = nodeApi;

Editor.prototype.customEventType = customEventType;
Editor.prototype.bindCustomEvent = bindCustomEvent;
Editor.prototype.dispatchCustomEvent = dispatchCustomEvent;

Editor.prototype.getNowRange = function(){
	let range = rangeApi.getRange();
	if( range && this.editorDom.contains(range.commonAncestorContainer) ){
		return range;
	}else{
		return null;
	}
}

Editor.prototype.getRange = function(){
	let range = rangeApi.getRange();
	if( range && this.editorDom.contains(range.commonAncestorContainer) ){
		return range;
	}else if(this.range){
		return this.range;
	}
}

Editor.prototype.toObj = function(){
	let obj = {
		blocks: []
	}
	this.editorDom.childNodes.forEach((blockDom)=>{
		let blockObj = this.getComponentObj(blockDom);
		if( blockObj ){
			obj.blocks.push( blockObj );
		}else{
			console.error('block 转化失败:', blockDom);
		}
	});
	return obj;
}

Editor.prototype.render = function(obj){
	this.nodeApi.emptyAllChild(this.editorDom);
	obj.blocks.forEach((block)=>{
		let blockDom = this.getBlockDom(block);
		if( blockDom ){
			this.editorDom.appendChild(blockDom);
		}else{
			console.error('block 读取解析失败:', block);
		}
		return this;
	});
	return this;
}

Editor.prototype.getBlockDom = function(type, obj){
	return componentApi.getBlockDom(this, type, obj);
}

Editor.prototype.getComponentDom = function(type, obj){
	return componentApi.getComponentDom(this, type, obj);
}

Editor.prototype.getComponentObj = function(type, dom){
	return componentApi.getComponentObj(this, type, dom);
}

Editor.prototype.addComponentEvent = function(component, eventType, event){

}

// 在 container 内插入元素
Editor.prototype.insertElement = function insertElement(node, start, offset){
	if( start.nodeType === Node.TEXT_NODE ){
		if( offset % start.length === 0 ){
			let singleNode = this.nodeApi.getSingleNodeInContainer(start),
					index = this.nodeApi.getNodeIndexOf(singleNode);
			if( offset === 0 ){
				singleNode.parentNode.insertBefore(node, singleNode);
				this.rangeApi.setNewCollapsedRange(singleNode.parentNode, index + 1);
			}else if( offset === start.length ){
				this.nodeApi.insertAfter(node, singleNode);
				this.rangeApi.setNewCollapsedRange(singleNode.parentNode, index + 2);
			}
		}else{
			console.info('待完善');
		}
	}else if( start.nodeType === Node.ELEMENT_NODE ){
		if( offset === 0 ){
			start.appendChild(node);
			this.rangeApi.setNewCollapsedRange(start, 1);
		}else{
			this.nodeApi.insertAfter(node, start.childNodes[offset - 1]);
			this.rangeApi.setNewCollapsedRange(start, offset + 1);
		}
	}

	return this;
}
// 在 container 内插入文字
Editor.prototype.insertText = function insertText(string, start, offset){
	let rangeApi = this.rangeApi,
			nodeApi = this.nodeApi;
	if( start.nodeType === Node.TEXT_NODE ){
		start.insertData(offset, string);
		rangeApi.setCollapsedRange(start, offset + string.length);
	}else if( start.nodeType === Node.ELEMENT_NODE ){
		let text = nodeApi.createTextNode(string);
		if( offset === 0 ){
			start.insertBefore(text, start.childNodes[0]);
		}else{
			nodeApi.insertAfter(text, start.childNodes[offset - 1]);
		}
		rangeApi.setCollapsedRange(text, text.length);
	}
	return this;
}

Editor.prototype.transformBlock = function transformBlock(type){
	let range = this.getRange();
	if( !range ){
		throw new Error('range 不存在');
	}
	let 
		{ startContainer, startOffset, endContainer, endOffset } = range,
		oldBlock = nodeApi.getBlock(range.startContainer),
		newBlock = this.getBlockDom(type, {type});

	this.nodeApi.appendChildren(newBlock, oldBlock.childNodes);
	this.nodeApi.insertAfter(newBlock, oldBlock);
	this.nodeApi.removeNode(oldBlock);
	// this.rangeApi.setNewRange(startContainer, startOffset, endContainer, endOffset);
}
