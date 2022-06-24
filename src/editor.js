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
		this.setRange();
	}
	this.range = {};
	
	initEditorEvent(this);
	this.customEventMap = new Map();

	if(obj && obj.blocks.length > 0){
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

Editor.prototype.setRange = function setRange(){
	let range = this.rangeApi.getRange();
	if( this.editable && this.editorDom.contains(range.commonAncestorContainer) && range ){
		this.range.collapsed = range.collapsed;
		this.range.startContainer = range.startContainer;
		this.range.startOffset = range.startOffset;
		this.range.endContainer = range.endContainer;
		this.range.endOffset = range.endOffset;
	}
}

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

Editor.prototype.toObjString = function(){
	return JSON.stringify(this.toObj());
}

Editor.prototype.render = function(obj){
	this.nodeApi.emptyAllChild(this.editorDom);
	// console.log('obj.blocks:', obj.blocks);
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

Editor.prototype.addComponentEvent = function(componentType, eventType, event){
	let component = componentApi.getComponent(componentType)
	component.eventInterface[eventType] = event;
	return this;
}

// 在 container 内插入元素
Editor.prototype.insertElement = function insertElement(node, start, offset){
	if( start.nodeType === Node.TEXT_NODE ){
		if( offset % start.length === 0 ){
			let singleNode = this.nodeApi.getSingleNodeInContainer(start),
					index = this.nodeApi.getNodeIndexOf(singleNode);
			if( offset === 0 ){
				singleNode.parentNode.insertBefore(node, singleNode);
				if( node.childNodes.length > 0 ){
					this.rangeApi.endNodeNewRange(node);
				}else{
					this.rangeApi.setNewCollapsedRange(singleNode.parentNode, index + 1);
				}
			}else if( offset === start.length ){
				this.nodeApi.insertAfter(node, singleNode);
				if( node.childNodes.length > 0 ){
					this.rangeApi.endNodeNewRange(node);
				}else{
					this.rangeApi.setNewCollapsedRange(singleNode.parentNode, index + 2);
				}
			}
		}else{
			console.info('待完善');
		}
	}else if( start.nodeType === Node.ELEMENT_NODE ){
		if( offset === 0 ){
			start.appendChild(node);
			if( node.childNodes.length > 0 ){
				this.rangeApi.endNodeNewRange(node);
			}else{
				this.rangeApi.setNewCollapsedRange(start, 1);
			}
		}else{
			this.nodeApi.insertAfter(node, start.childNodes[offset - 1]);
			if( node.childNodes.length > 0 ){
				this.rangeApi.endNodeNewRange(node);
			}else{
				this.rangeApi.setNewCollapsedRange(start, offset + 1);
			}
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

Editor.prototype.transformBlock = function transformBlock(obj){
	let range = this.getRange();
	if( !range ){
		throw new Error('range 不存在');
	}
	let 
		{ startContainer, startOffset, endContainer, endOffset } = range,
		oldBlock = nodeApi.getBlock(range.startContainer),
		newBlock = this.getBlockDom(obj);
	console.log('obj:', obj);
	console.log('newBlock:', newBlock);
	console.log('oldBlock:', oldBlock);

	this.nodeApi.appendChildren(newBlock, oldBlock.childNodes);
	this.nodeApi.insertAfter(newBlock, oldBlock);
	this.nodeApi.removeNode(oldBlock);
	// this.rangeApi.setNewRange(startContainer, startOffset, endContainer, endOffset);
}
