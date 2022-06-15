import * as rangeApi from './base_api/range.js';
import * as nodeApi from './base_api/node.js';
import * as componentApi from './component/init_component.js';
import initEditorEvent, { customEvent, customEventType } from './event/init_event.js';

import insertElement from './operation/insertElement.js';
import insertText from './operation/insertText.js';
import deleteOne from './operation/deleteOne.js';
import deleteRange from './operation/deleteRange.js';
// import insertText from './operation/insertText.js';


export default function Editor(dom, obj){
	// console.time('editorInit');
	this.editorDom = dom;
	this.editorDom.style['white-space'] = 'pre-wrap';
	this.editorDom.contentEditable = this.editable = true;

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
	initEditorEvent(this);
	this.rangeApi.startNodeNewRange(this.editorDom);
	// console.timeEnd('editorInit');
}


Editor.prototype.setEditable = function(editable){
	this.editorDom.contentEditable = this.editable = editable;
	return this;
}

Editor.prototype.rangeApi = rangeApi;
Editor.prototype.nodeApi = nodeApi;

Editor.prototype.customEvent = customEvent;
Editor.prototype.customEventType = customEventType;

Editor.prototype.getRange = function(){
	let range = rangeApi.getRange();
	if( range && this.editorDom.contains(range.commonAncestorContainer) ){
		return range;
	}else{
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

// 在 container 内插入元素
Editor.prototype.insertElement = insertElement;
// 在 container 内插入文字
Editor.prototype.insertText = insertText;
// 在 container 内光标单个删除
Editor.prototype.deleteOne = deleteOne;
// 在 container 内光标范围删除
Editor.prototype.deleteRange = deleteRange;
