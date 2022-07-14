import * as rangeApi from './base_api/range.js';
import * as nodeApi from './base_api/node.js';
import * as componentApi from './component/init_component.js';
import EditorEvent, { supportOperationType } from './event/event.js';

export default function Editor(dom, contentObj){

	this.editorDom = dom;
	this.editorDom.style['white-space'] = 'pre-wrap';
	this.editorDom.contentEditable = this.editable = true;
	this.editorDom.setAttribute('editor', true);

	// 初始化事件
	this.event = new EditorEvent(this);
	this.operation = {}
	componentApi.initComponent(this);

	// 初始化组件生产工厂
	this.defualtBlockObj = { type: 'paragraph' };

	if(contentObj){
		this.render(contentObj);
	}else{
		let initDom = this.getComponentDom(this.defualtBlockObj);
		if( initDom ){
			this.editorDom.appendChild(initDom);
		}else{
			console.error(this.defualtFactory, '读取解析失败');
		}
	}

	this.range = {};
}

Editor.prototype.setEditable = function(editable){
	this.editorDom.contentEditable = this.editable = editable;
	return this;
}

Editor.prototype.rememberRange = function(){
	let range = this.rangeApi.getRange();
	if( range && this.editorDom.contains(range.commonAncestorContainer) ){
		this.range.collapsed = range.collapsed;
		this.range.commonAncestorContainer = range.commonAncestorContainer;
		this.range.endContainer = range.endContainer;
		this.range.endOffset = range.endOffset;
		this.range.startContainer = range.startContainer;
		this.range.startOffset = range.startOffset;
	}
}

Editor.prototype.rangeApi = rangeApi;
Editor.prototype.nodeApi = nodeApi;
Editor.prototype.nodeLabel = nodeApi.nodeLabel;

Editor.prototype.supportOperationType = supportOperationType;
Editor.prototype.supportOperation = componentApi.supportOperation;

Editor.prototype.dealOperaion = function(container, operationType, params){
	container = this.nodeApi.getContainer(container);			
	let event = this.operation[ container.getAttribute('event') ];
	if( event && event[operationType] ){
		event[operationType].apply(this, params);
	}else{
		console.error(container.className, 'dealOperaion找不到相关操作,操作待完善:', operationType);
	}
}

Editor.prototype.getComponentDom = function(obj){
	return componentApi.getComponentDom(this, obj);
}

Editor.prototype.getComponentObj = function(dom){
	return componentApi.getComponentObj(this, dom);
}

Editor.prototype.render = function(obj){
	this.nodeApi.emptyAllChild(this.editorDom);
	obj.blocks.forEach((block)=>{
		let blockDom = this.getComponentDom(block);
		if( blockDom ){
			this.editorDom.appendChild(blockDom);
		}else{
			console.error('组件 dom 读取解析失败:', block);
		}
		return this;
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
		}else{
			console.error('block 转化失败:', blockDom);
		}
	});
	return obj;
}

Editor.prototype.addEvent = function(eventType, event){
	this.event.addEvent(eventType, event);
	return this;
}


